export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/api-key-middleware';
import { redis, fhirCacheKey, FHIR_CACHE_TTL_SECONDS } from '@/lib/redis';

export async function POST(req: NextRequest) {
  const authError = validateApiKey(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { hsaUserId, resources } = body;

    if (!hsaUserId) {
      return NextResponse.json({ error: 'Missing hsaUserId' }, { status: 400 });
    }

    if (!resources || typeof resources !== 'object') {
      return NextResponse.json({ error: 'Missing or invalid resources object' }, { status: 400 });
    }

    const expectedResources = [
      'eob', 'coverage', 'patient', 'conditions', 'medications',
      'allergies', 'encounters', 'procedures', 'immunizations',
      'diagnosticReports', 'goals',
    ];

    const missingResources = expectedResources.filter((r) => !(r in resources));
    if (missingResources.length > 0) {
      console.warn(`[sync] hsaUserId=${hsaUserId} missing resources: ${missingResources.join(', ')}`);
    }

    const syncedAt = new Date().toISOString();
    const cacheValue = JSON.stringify({ ...resources, syncedAt });

    await redis.set(fhirCacheKey(hsaUserId), cacheValue, 'EX', FHIR_CACHE_TTL_SECONDS);

    console.log(`[sync] Cached FHIR context for hsaUserId=${hsaUserId}, TTL=${FHIR_CACHE_TTL_SECONDS}s`);

    return NextResponse.json({ success: true, syncedAt });
  } catch (error: any) {
    console.error('[sync] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
