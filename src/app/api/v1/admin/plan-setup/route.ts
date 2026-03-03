export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantSlug = searchParams.get('tenantSlug');

    if (!tenantSlug) {
      return NextResponse.json({ error: 'Missing tenantSlug' }, { status: 400 });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const employers = await prisma.employerGroup.findMany({
      where: { tenantId: tenant.id },
      include: {
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            externalId: true,
          },
          orderBy: { firstName: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    const data = employers.map((emp) => ({
      id: emp.id,
      name: emp.name,
      planDocUrl: emp.planDocUrl,
      planRules: emp.planRules,
      memberCount: emp.members.length,
      members: emp.members,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching plan setup data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
