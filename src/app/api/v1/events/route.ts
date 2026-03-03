export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantSlug = searchParams.get('tenantId'); // This is actually the slug based on our new URL structure
    const memberId = searchParams.get('memberId');

    if (!tenantSlug || !memberId) {
      return NextResponse.json({ error: 'Missing tenantId (slug) or memberId in query params' }, { status: 400 });
    }

    // Lookup Tenant ID from Slug
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug }
    });

    if (!tenant) {
      // For demo purposes, handle tpa_b gracefully if it's not seeded yet
      if (tenantSlug === 'tpa_b') {
        return NextResponse.json({ success: true, data: [] });
      }
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Securely fetch Medical Events and their associated Claims
    // isolated by the tenantId and memberId
    const events = await prisma.medicalEvent.findMany({
      where: {
        tenantId: tenant.id,
        memberId: memberId,
      },
      include: {
        claims: {
          orderBy: {
            serviceDate: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform into a frontend-friendly shape for ReconRow
    const transformedEvents = events.map(event => {
      return {
        id: event.id,
        name: event.name,
        status: event.status,
        totalSaved: event.totalSaved,
        claims: event.claims.map(claim => ({
          id: claim.id,
          providerName: claim.providerName,
          serviceDate: claim.serviceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          cptCode: claim.cptCode,
          status: claim.status,
        })),
        reconRows: event.claims.map(claim => ({
          id: `recon-${claim.id}`,
          service: `${claim.providerName} (${claim.cptCode})`,
          providerBilled: Number(claim.providerBilled),
          insuranceAllowed: Number(claim.insuranceAllowed),
          planRuleAmount: Number(claim.planRuleAmount),
          memberOwes: Number(claim.memberOwes),
          varianceNote: claim.varianceNote,
          status: claim.status,
        })),
      };
    });

    // Resolve employerGroupId so the member portal can submit uploads without hardcoded IDs
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      select: { employerGroupId: true },
    });

    return NextResponse.json({ 
      success: true, 
      data: transformedEvents,
      meta: {
        tenantId: tenant.id,
        employerGroupId: member?.employerGroupId ?? null,
      },
    });

  } catch (error: any) {
    console.error('Error fetching member medical events:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
