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
    const { hsaUserId, message, conversationHistory = [] } = await req.json();

    if (!hsaUserId || !message) {
      return NextResponse.json({ error: 'Missing hsaUserId or message' }, { status: 400 });
    }

    const cached = await redis.get(fhirCacheKey(hsaUserId));
    if (!cached) {
      return NextResponse.json(
        { error: 'No FHIR context found for this member. Please call /sync first.' },
        { status: 404 }
      );
    }

    const fhir = JSON.parse(cached);
    const { coverage, patient, conditions, medications, allergies, goals } = fhir;

    const systemContext = `
You are SmartEOB Health Navigator, an AI assistant helping healthcare members understand their coverage, benefits, and health plan.

You have access to this member's complete health record. Use it to give accurate, personalized answers.
Never say "I don't have access to your records" — you do.
Never recommend calling insurance or providers for questions you can answer from the data.
Be empathetic, clear, and concise. Avoid medical jargon unless the member uses it first.

MEMBER INFORMATION:
${JSON.stringify(patient, null, 2)}

INSURANCE COVERAGE:
${JSON.stringify(coverage, null, 2)}

ACTIVE CONDITIONS:
${JSON.stringify(conditions, null, 2)}

CURRENT MEDICATIONS:
${JSON.stringify(medications, null, 2)}

ALLERGIES:
${JSON.stringify(allergies, null, 2)}

CARE PLAN GOALS:
${JSON.stringify(goals, null, 2)}
`;

    const contents = [
      { role: 'user', parts: [{ text: systemContext }] },
      { role: 'model', parts: [{ text: 'Understood. I have reviewed this member\'s complete health record and am ready to assist.' }] },
      ...conversationHistory,
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await aiModel.generateContent({ contents });
    const reply = response.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!reply) throw new Error('No response from AI model');

    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: reply }] },
    ];

    return NextResponse.json({
      success: true,
      data: {
        reply,
        conversationHistory: updatedHistory,
      },
    });
  } catch (error: any) {
    console.error('[client/chat] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
