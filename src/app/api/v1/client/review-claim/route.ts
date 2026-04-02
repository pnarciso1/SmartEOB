export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
import jwt from 'jsonwebtoken';
import { validateApiKey } from '@/lib/api-key-middleware';
import { redis, fhirCacheKey } from '@/lib/redis';

const project = process.env.VERTEX_PROJECT_ID || 'smarteob-multi-tenant';
const location = 'us-central1';

let vertexOptions: any = { project, location };
if (process.env.GOOGLE_CREDENTIALS_JSON) {
  vertexOptions.googleAuthOptions = {
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON),
    projectId: project,
  };
}
const vertexAI = new VertexAI(vertexOptions);
const aiModel = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function POST(req: NextRequest) {
  const authError = validateApiKey(req);
  if (authError) return authError;

  try {
    const { hsaUserId, claimId } = await req.json();

    if (!hsaUserId || !claimId) {
      return NextResponse.json({ error: 'Missing hsaUserId or claimId' }, { status: 400 });
    }

    const cached = await redis.get(fhirCacheKey(hsaUserId));
    if (!cached) {
      return NextResponse.json(
        { error: 'No FHIR context found for this member. Please call /sync first.' },
        { status: 404 }
      );
    }

    const fhir = JSON.parse(cached);
    const { eob, coverage, conditions, procedures } = fhir;

    const prompt = `
You are SmartEOB, an AI healthcare billing auditor. Analyze the following FHIR claim data for billing discrepancies.

CLAIM ID TO REVIEW: ${claimId}

EXPLANATION OF BENEFIT (EOB) DATA:
${JSON.stringify(eob, null, 2)}

PATIENT COVERAGE:
${JSON.stringify(coverage, null, 2)}

KNOWN CONDITIONS (for medical necessity validation):
${JSON.stringify(conditions, null, 2)}

PROCEDURES ON RECORD:
${JSON.stringify(procedures, null, 2)}

ANALYSIS TASK:
1. Find the claim with ID "${claimId}" in the EOB data.
2. Check for discrepancies:
   - Does the billed CPT/procedure code match the procedures on record?
   - Does the diagnosis code align with known conditions?
   - Is the billed amount consistent with the coverage plan's allowed amounts?
   - Are there coordination of benefits issues (multiple payers)?
   - Any upcoding indicators (billed at higher complexity than documented)?
3. Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "verdict": "CLEAN" or "DISCREPANCY_FOUND",
  "claimId": "${claimId}",
  "providerName": "<provider name from EOB>",
  "serviceDate": "<service date>",
  "billedAmount": <number or null>,
  "allowedAmount": <number or null>,
  "discrepancy": {
    "difference": <number>,
    "reason": "<clear explanation of the discrepancy>",
    "severity": "LOW" or "MEDIUM" or "HIGH"
  },
  "recommendation": "<plain English explanation for the member>"
}
If verdict is CLEAN, set discrepancy to null and difference to 0.
`;

    const response = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const rawText = response.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!rawText) throw new Error('No response from AI model');

    // Strip markdown code fences if present
    const jsonText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const analysis = JSON.parse(jsonText);

    if (analysis.verdict === 'DISCREPANCY_FOUND') {
      const secret = process.env.DISPUTE_TOKEN_SECRET;
      if (!secret) throw new Error('DISPUTE_TOKEN_SECRET not configured');

      const token = jwt.sign(
        {
          hsaUserId,
          claimId,
          discrepancyAmount: analysis.discrepancy?.difference ?? 0,
          fhirCacheKey: fhirCacheKey(hsaUserId),
        },
        secret,
        { expiresIn: '48h' }
      );

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://smart-eob.vercel.app';
      analysis.disputeUrl = `${baseUrl}/dispute/initiate?token=${token}`;
    }

    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    console.error('[review-claim] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
