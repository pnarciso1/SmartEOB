export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Note: We use the tenant slug for URL structure, but we need the internal DB ID.
    // For this POC, we'll look up the tenant by slug first.
    const tenantSlug = searchParams.get('tenantSlug');

    if (!tenantSlug) {
      return NextResponse.json({ error: 'Missing tenantSlug in query params' }, { status: 400 });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug }
    });

    if (!tenant) {
      // For demo purposes, if tenant_b isn't seeded yet, return empty mock structure
      // instead of a 404 error so the UI can still demonstrate the theme switch.
      if (tenantSlug === 'tpa_b') {
        return NextResponse.json({ 
          success: true, 
          data: {
            metrics: { openEvents: 0, actionRequired: 0, totalSaved: 0 },
            queue: []
          }
        });
      }
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const tenantId = tenant.id;

    // 1. Fetch Aggregate Metrics
    const allEvents = await prisma.medicalEvent.findMany({
      where: { tenantId, status: 'OPEN' }
    });
    
    const disputedClaims = await prisma.claim.findMany({
      where: { tenantId, status: 'DISPUTED' },
      include: {
        medicalEvent: {
          include: {
            member: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // In a real app, 'totalSaved' would be an aggregate of verified/won disputes.
    // Here we'll sum up the variance amount on resolved claims or just use the DB field.
    const totalSavedResult = await prisma.medicalEvent.aggregate({
      where: { tenantId },
      _sum: { totalSaved: true }
    });

    const totalSaved = totalSavedResult._sum.totalSaved || 0;

    // Fetch first employer group for the simulator (avoids hardcoded UUIDs on the client)
    const firstEmployer = await prisma.employerGroup.findFirst({
      where: { tenantId },
      select: { id: true }
    });

    // 2. Format Discrepancy Queue
    const queue = disputedClaims.map(claim => {
      const varianceAmount = Number(claim.providerBilled) - Number(claim.insuranceAllowed) - Number(claim.planRuleAmount);
      return {
        id: claim.id,
        memberId: claim.medicalEvent.member.id,
        memberName: `${claim.medicalEvent.member.firstName} ${claim.medicalEvent.member.lastName}`,
        providerName: claim.providerName,
        serviceDate: claim.serviceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        varianceAmount: varianceAmount > 0 ? varianceAmount : 0,
        varianceNote: claim.varianceNote,
        status: claim.status,
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        tenantId,
        employerGroupId: firstEmployer?.id ?? null,
        metrics: {
          openEvents: allEvents.length,
          actionRequired: disputedClaims.length,
          totalSaved: Number(totalSaved)
        },
        queue
      }
    });

  } catch (error: any) {
    console.error('Error fetching admin dashboard data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
