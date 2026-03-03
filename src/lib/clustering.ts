import { prisma } from '@/lib/prisma';

export interface ClusterClaimInput {
  tenantId: string;
  memberId: string;
  serviceDate: Date;
  contextVector: number[]; // From Gemini Embedding
  cptCode: string;
}

/**
 * Event Clustering Logic
 * Attempts to cluster a new incoming claim into an existing MedicalEvent
 * using Semantic Vector Similarity (pgvector) and Temporal Proximity.
 */
export async function clusterClaimToEvent(input: ClusterClaimInput): Promise<string> {
  const { tenantId, memberId, serviceDate, contextVector } = input;
  
  // 1. TEMPORAL BOUNDARY
  // Define a 14-day window before and after the service date
  const twoWeeksPrior = new Date(serviceDate.getTime() - 14 * 24 * 60 * 60 * 1000);
  const twoWeeksAfter = new Date(serviceDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  // 2. VECTOR SIMILARITY SEARCH
  // We use pgvector's cosine distance operator (<=>) to find the closest claims 
  // that belong to the same member and tenant, within the time window.
  // Lower distance means higher semantic similarity.
  
  // Format the array to a pgvector string format: '[0.1, 0.2, ...]'
  const vectorStr = `[${contextVector.join(',')}]`;

  // Note: Since Prisma's raw query doesn't natively map Unsupported types perfectly yet, 
  // we do a raw SQL query.
  const closestClaims: Array<{ eventId: string; distance: number }> = await prisma.$queryRaw`
    SELECT c."eventId", c."contextVector" <=> ${vectorStr}::vector as distance
    FROM "Claim" c
    JOIN "MedicalEvent" e ON c."eventId" = e.id
    WHERE c."tenantId" = ${tenantId}
      AND e."memberId" = ${memberId}
      AND c."serviceDate" >= ${twoWeeksPrior}
      AND c."serviceDate" <= ${twoWeeksAfter}
    ORDER BY distance ASC
    LIMIT 1;
  `;

  // 3. DECISION LOGIC
  const SIMILARITY_THRESHOLD = 0.25; // Define threshold for grouping

  if (closestClaims.length > 0 && closestClaims[0].distance < SIMILARITY_THRESHOLD) {
    // Highly similar claim found nearby in time! Cluster it to the same event.
    return closestClaims[0].eventId;
  }

  // 4. FALLBACK: Create a New Medical Event
  // If no similar claims are found, this is a new disparate medical journey.
  const newEvent = await prisma.medicalEvent.create({
    data: {
      tenantId,
      memberId,
      name: `Medical Event - ${serviceDate.toLocaleDateString()}`,
      status: 'OPEN',
      totalSaved: 0
    }
  });

  return newEvent.id;
}
