export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VertexAI } from '@google-cloud/vertexai';
const project = process.env.VERTEX_PROJECT_ID || 'smarteob-multi-tenant';
const location = 'us-central1'; 

let vertexOptions: any = { project, location };
if (process.env.GOOGLE_CREDENTIALS_JSON) {
  vertexOptions.googleAuthOptions = { 
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON),
    projectId: project
  };
}

const vertexAI = new VertexAI(vertexOptions);
const aiModel = vertexAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  }
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('memberId');

    if (!memberId) {
      return NextResponse.json({ error: 'Missing memberId in query params' }, { status: 400 });
    }

    // 1. Fetch the member's recent medical events and their employer plan
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        employerGroup: true,
        medicalEvents: {
          orderBy: { createdAt: 'desc' },
          take: 3, // Look at the 3 most recent events
          include: {
            claims: true
          }
        }
      }
    });

    if (!member || member.medicalEvents.length === 0) {
      return NextResponse.json({ success: true, data: null });
    }

    // Prepare context for Gemini
    const recentEvents = member.medicalEvents.map(event => ({
      eventName: event.name,
      services: event.claims.map(c => ({
        provider: c.providerName,
        cpt: c.cptCode,
        date: c.serviceDate
      }))
    }));

    const planRules = member.employerGroup.planRules;

    const prompt = `
      You are a proactive Healthcare Concierge AI. 
      Analyze the patient's recent medical history and their employer plan rules.
      Your goal is to suggest ONE highly relevant "Next Best Action" for their care coordination.
      
      For example:
      - If they recently went to the ER, suggest a follow-up with a Primary Care Physician or Specialist, and note the plan copay for that.
      - If they had surgery, suggest Physical Therapy if covered by the plan.
      - If they had an ambulance ride, suggest ensuring prior-auth is filed for any impending hospital stay.

      Patient's Recent Medical Events:
      ${JSON.stringify(recentEvents, null, 2)}

      Patient's Employer Plan Rules:
      ${JSON.stringify(planRules, null, 2)}

      Return ONLY a valid JSON object in this format:
      {
        "title": "String (Short title of the action, e.g., 'Schedule Orthopedic Follow-up')",
        "description": "String (1-2 sentences explaining why this is the next step and what it costs based on their plan)",
        "actionButtonText": "String (e.g., 'Find In-Network Provider', 'Draft Prior-Auth')"
      }
    `;

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    const response = await aiModel.generateContent(request);
    const content = response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content returned from Vertex AI model');
    }

    const cleanJson = content.replace(/```json\n?|```/g, '').trim();
    const actionData = JSON.parse(cleanJson);

    return NextResponse.json({ 
      success: true, 
      data: actionData
    });

  } catch (error: any) {
    console.error('Error generating Next Best Action:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
