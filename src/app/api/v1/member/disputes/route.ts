export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get('memberId');

  if (!memberId) {
    return NextResponse.json({ error: 'Missing memberId' }, { status: 400 });
  }

  try {
    const events = await prisma.medicalEvent.findMany({
      where: { memberId, status: 'DISPUTED' },
      include: { claims: true },
      orderBy: { createdAt: 'desc' },
    });

    const disputes = events.map((event) => ({
      eventId: event.id,
      eventName: event.name,
      createdAt: event.createdAt,
      status: event.status,
      claims: event.claims.map((c) => ({
        claimId: c.id,
        providerName: c.providerName,
        serviceDate: c.serviceDate,
        cptCode: c.cptCode,
        providerBilled: Number(c.providerBilled),
        discrepancyNote: c.varianceNote,
        status: c.status,
      })),
    }));

    return NextResponse.json({ success: true, data: disputes });
  } catch (error: any) {
    console.error('[member/disputes] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
