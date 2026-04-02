import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as { redis: Redis };

function createRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error('REDIS_URL environment variable is not set');

  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    tls: url.startsWith('rediss://') ? {} : undefined,
  });

  client.on('error', (err) => {
    console.error('[Redis] Connection error:', err.message);
  });

  return client;
}

export const redis = globalForRedis.redis || createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

// FHIR context TTL: 24 hours
export const FHIR_CACHE_TTL_SECONDS = 86400;

export function fhirCacheKey(hsaUserId: string) {
  return `fhir:${hsaUserId}`;
}
