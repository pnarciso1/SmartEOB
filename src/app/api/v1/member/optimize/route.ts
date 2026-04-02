export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
import { prisma } from '@/lib/prisma';
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get('memberId');

  if (!memberId) {
    return NextResponse.json({ error: 'Missing memberId' }, { status: 400 });
  }

  try {
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      select: { externalId: true, firstName: true, lastName: true },
    });

    if (!member?.externalId) {
      return NextResponse.json({
        success: true,
        data: { insights: [], message: 'Connect your health data to see personalized insights.' },
      });
    }

    const cached = await redis.get(fhirCacheKey(member.externalId));
    if (!cached) {
      return NextResponse.json({
        success: true,
        data: { insights: [], message: 'Your health data sync is pending. Insights will appear after your next login to the Howlite portal.' },
      });
    }

    const fhir = JSON.parse(cached);
    const { coverage, conditions, medications, goals, encounters } = fhir;

    const prompt = `
You are SmartEOB Health Optimizer. Analyze this member's health record and identify 3-5 specific, actionable opportunities to optimize their healthcare and reduce costs.

MEMBER: ${member.firstName} ${member.lastName}

COVERAGE: ${JSON.stringify(coverage, null, 2)}
CONDITIONS: ${JSON.stringify(conditions, null, 2)}
MEDICATIONS: ${JSON.stringify(medications, null, 2)}
CARE GOALS: ${JSON.stringify(goals, null, 2)}
RECENT ENCOUNTERS: ${JSON.stringify(encounters, null, 2)}

Return ONLY valid JSON, no markdown:
{
  "insights": [
    {
      "id": "unique-id",
      "category": "COST_SAVINGS" | "CARE_GAP" | "BENEFIT_UNUSED" | "MEDICATION" | "PREVENTIVE",
      "title": "<short title>",
      "description": "<1-2 sentence actionable insight>",
      "potentialSavings": "<dollar amount or null>",
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "actionLabel": "<button text>",
      "actionDetail": "<what happens when they click>"
    }
  ]
}
Focus on: unused preventive benefits, medication cost savings (generics/formulary), unmet care plan goals, coverage gaps, coordination of benefits opportunities.
`;

    const response = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const rawText = response.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!rawText) throw new Error('No response from AI model');

    const jsonText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const { insights } = JSON.parse(jsonText);

    return NextResponse.json({ success: true, data: { insights } });
  } catch (error: any) {
    console.error('[member/optimize] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
