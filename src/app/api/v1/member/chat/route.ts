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
const aiModel = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function POST(req: NextRequest) {
  try {
    const { memberId, message } = await req.json();

    if (!memberId || !message) {
      return NextResponse.json({ error: 'Missing memberId or message' }, { status: 400 });
    }

    // 1. Fetch Employer Plan Rules (The RAG Knowledge Base)
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        employerGroup: true
      }
    });

    if (!member || !member.employerGroup.planRules) {
      return NextResponse.json({ error: 'Plan rules not found for member' }, { status: 404 });
    }

    const planRules = member.employerGroup.planRules;

    // 2. Draft the RAG prompt for the Chat Navigator
    const prompt = `
      You are an expert Pre-Service Cost Navigator AI for a Third Party Administrator (TPA).
      Your job is to answer the patient's questions about their healthcare coverage clearly, concisely, and empathetically.

      PATIENT QUESTION:
      "${message}"

      EMPLOYER PLAN RULES (Source of Truth):
      ${JSON.stringify(planRules, null, 2)}

      INSTRUCTIONS:
      1. Answer the question using ONLY the provided plan rules.
      2. If the plan rules do not mention the specific service they are asking about, politely state that you cannot confirm coverage for that specific service and they should contact HR.
      3. Keep the answer under 3 sentences if possible. Be direct about the cost (e.g. "Your copay is $50").
      4. Do not use markdown formatting like **bold** or bullet points, just plain conversational text.
    `;

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    const response = await aiModel.generateContent(request);
    const answer = response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new Error('No content returned from Vertex AI model');
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        reply: answer.trim()
      }
    });

  } catch (error: any) {
    console.error('Error generating chat response:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
