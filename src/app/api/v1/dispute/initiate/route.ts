export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { redis, fhirCacheKey } from '@/lib/redis';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const secret = process.env.DISPUTE_TOKEN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    return NextResponse.json({ error: 'Invalid or expired dispute token' }, { status: 401 });
  }

  const { hsaUserId, claimId, discrepancyAmount } = decoded;
  const cacheKey = fhirCacheKey(hsaUserId);

  // Load Howlite tenant + employer
  const tenant = await prisma.tenant.findUnique({ where: { slug: 'howlite' } });
  if (!tenant) {
    return NextResponse.json({ error: 'Howlite tenant not configured' }, { status: 500 });
  }

  const employer = await prisma.employerGroup.findFirst({ where: { tenantId: tenant.id } });
  if (!employer) {
    return NextResponse.json({ error: 'Howlite employer group not configured' }, { status: 500 });
  }

  // Try to get member name from cached FHIR patient resource
  let firstName = 'Member';
  let lastName = hsaUserId.slice(-6).toUpperCase();

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const fhir = JSON.parse(cached);
      const patientEntry = fhir.patient?.entry?.[0]?.resource;
      if (patientEntry?.name?.[0]) {
        firstName = patientEntry.name[0].given?.[0] || firstName;
        lastName = patientEntry.name[0].family || lastName;
      }
    }
  } catch {
    // Non-fatal — use default name
  }

  // Upsert Member by externalId (hsaUserId)
  let member = await prisma.member.findFirst({ where: { externalId: hsaUserId } });
  if (!member) {
    member = await prisma.member.create({
      data: {
        employerGroupId: employer.id,
        externalId: hsaUserId,
        firstName,
        lastName,
      },
    });
  } else if (member.firstName === 'Member') {
    // Update name if we now have a better one from FHIR
    member = await prisma.member.update({
      where: { id: member.id },
      data: { firstName, lastName },
    });
  }

  // Create MedicalEvent for this dispute
  const event = await prisma.medicalEvent.create({
    data: {
      tenantId: tenant.id,
      memberId: member.id,
      name: `Claim Dispute — ${claimId}`,
      status: 'DISPUTED',
    },
  });

  // Create Claim record with discrepancy details
  await prisma.claim.create({
    data: {
      tenantId: tenant.id,
      eventId: event.id,
      providerName: 'Pending review',
      serviceDate: new Date(),
      cptCode: claimId,
      providerBilled: discrepancyAmount || 0,
      insuranceAllowed: 0,
      planRuleAmount: 0,
      memberOwes: 0,
      status: 'DISPUTED',
      varianceNote: `Dispute initiated via Howlite Healthcare portal for claim ${claimId}. Discrepancy amount: $${discrepancyAmount || 0}.`,
    },
  });

  // Redirect to member portal disputes tab
  // Clerk middleware will redirect to /sign-in if not authenticated, then return here
  const portalUrl = `/member/howlite/${member.id}?tab=disputes`;
  return NextResponse.redirect(new URL(portalUrl, req.url));
}
