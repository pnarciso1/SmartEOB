import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates the X-SmartEOB-Key header against registered client API keys.
 * Returns null if valid, or a 401/403 NextResponse if invalid.
 *
 * Add a new env var per client: SMARTEOB_API_KEY_<CLIENTNAME>=<key>
 * e.g. SMARTEOB_API_KEY_HOWLITE=hsk_live_...
 */
export function validateApiKey(req: NextRequest): NextResponse | null {
  const providedKey = req.headers.get('x-smarteob-key');

  if (!providedKey) {
    return NextResponse.json(
      { error: 'Missing X-SmartEOB-Key header' },
      { status: 401 }
    );
  }

  // Collect all registered client keys from env vars
  const validKeys = Object.entries(process.env)
    .filter(([key]) => key.startsWith('SMARTEOB_API_KEY_'))
    .map(([, value]) => value);

  if (validKeys.length === 0) {
    console.warn('[API Auth] No SMARTEOB_API_KEY_* env vars found — rejecting all requests');
    return NextResponse.json({ error: 'API keys not configured' }, { status: 500 });
  }

  if (!validKeys.includes(providedKey)) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });
  }

  return null;
}
