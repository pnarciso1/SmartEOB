export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
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
    const {
      hsaUserId,
      appointmentType,
      appointmentDate,
      providerName,
    } = await req.json();

    if (!hsaUserId) {
      return NextResponse.json({ error: 'Missing hsaUserId' }, { status: 400 });
    }

    const cached = await redis.get(fhirCacheKey(hsaUserId));
    if (!cached) {
      return NextResponse.json(
        { error: 'No FHIR context found for this member. Please call /sync first.' },
        { status: 404 }
      );
    }

    const fhir = JSON.parse(cached);
    const { coverage, patient, conditions, medications, allergies, encounters, goals, procedures } = fhir;

    const prompt = `
You are SmartEOB Care Coordinator, an AI that prepares members for upcoming medical appointments.

MEMBER HEALTH RECORD:
Patient: ${JSON.stringify(patient, null, 2)}
Coverage: ${JSON.stringify(coverage, null, 2)}
Conditions: ${JSON.stringify(conditions, null, 2)}
Medications: ${JSON.stringify(medications, null, 2)}
Allergies: ${JSON.stringify(allergies, null, 2)}
Recent Encounters: ${JSON.stringify(encounters, null, 2)}
Care Plan Goals: ${JSON.stringify(goals, null, 2)}
Past Procedures: ${JSON.stringify(procedures, null, 2)}

UPCOMING APPOINTMENT:
- Type: ${appointmentType || 'General visit'}
- Date: ${appointmentDate || 'Upcoming'}
- Provider: ${providerName || 'Not specified'}

TASK:
Generate a comprehensive appointment preparation package. Return ONLY valid JSON in this exact format, no markdown:
{
  "summary": "<1-2 sentence overview of what this appointment is about based on their health record>",
  "keyConditions": ["<condition 1>", "<condition 2>"],
  "medicationsToReview": ["<med 1 with dosage>", "<med 2 with dosage>"],
  "outstandingGoals": ["<unmet care plan goal 1>", "<unmet care plan goal 2>"],
  "questionsToAsk": [
    "<specific question based on their health record>",
    "<specific question based on their health record>",
    "<specific question based on their health record>"
  ],
  "estimatedCopay": "<estimated copay based on coverage data or 'Check your plan'>",
  "priorAuthRequired": true or false,
  "priorAuthNote": "<explanation if prior auth is needed, otherwise null>",
  "thingsTosBring": ["<item 1>", "<item 2>"],
  "recentLabsToDiscuss": ["<lab result 1 if relevant>"]
}
`;

    const response = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const rawText = response.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!rawText) throw new Error('No response from AI model');

    const jsonText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const prepPackage = JSON.parse(jsonText);

    return NextResponse.json({ success: true, data: { prepPackage } });
  } catch (error: any) {
    console.error('[care-prep] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
