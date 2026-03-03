import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
import { prisma } from '@/lib/prisma';

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
  try {
    const { claimId } = await req.json();

    if (!claimId) {
      return NextResponse.json({ error: 'Missing claimId' }, { status: 400 });
    }

    // Fetch the claim with its related event, member, and employer plan rules
    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
      include: {
        medicalEvent: {
          include: {
            member: {
              include: {
                employerGroup: true,
              },
            },
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    if (claim.status !== 'DISPUTED') {
      return NextResponse.json(
        { error: 'Appeal can only be drafted for DISPUTED claims' },
        { status: 400 }
      );
    }

    const member = claim.medicalEvent.member;
    const memberName = `${member.firstName} ${member.lastName}`;
    const planRules = member.employerGroup.planRules;
    const employerName = member.employerGroup.name;

    const prompt = `
      You are an expert Patient Advocate AI writing a formal insurance appeal letter on behalf of a healthcare member.
      
      Your letter must be professional, empathetic, and cite the specific financial discrepancy discovered by the AI system.
      
      CLAIM DETAILS:
      - Member: ${memberName}
      - Provider: ${claim.providerName}
      - Service Date: ${new Date(claim.serviceDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      - CPT Code: ${claim.cptCode}
      - Amount Provider Billed: $${Number(claim.providerBilled).toFixed(2)}
      - Amount Insurance Allowed: $${Number(claim.insuranceAllowed).toFixed(2)}
      - Amount Per Employer Plan Rules (the verified truth): $${Number(claim.planRuleAmount).toFixed(2)}
      - Amount Member Owes (per plan rules): $${Number(claim.memberOwes).toFixed(2)}
      - Discrepancy Note: ${claim.varianceNote || 'Billing discrepancy detected by AI reconciliation engine.'}
      
      EMPLOYER PLAN RULES (Source of Truth):
      ${JSON.stringify(planRules, null, 2)}
      
      TASK:
      Write a formal, single-page appeal letter addressed to the Insurance Company / Payer.
      
      The letter must:
      1. Be addressed "To Whom It May Concern," from the member (${memberName}).
      2. State the member's employer (${employerName}) and the claim service date.
      3. Clearly explain that an AI-powered audit identified a discrepancy between the billed amount and what the employer plan rules allow.
      4. Cite the specific dollar amounts from the claim details above.
      5. Formally request a re-adjudication and correction of the billing error.
      6. Close professionally with a request for written confirmation.
      
      Return ONLY the full text of the letter, no JSON, no markdown, no extra commentary. The letter should be ready to copy-paste and send.
    `;

    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    const response = await aiModel.generateContent(request);
    const draftedLetter = response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!draftedLetter) {
      throw new Error('No content returned from Vertex AI model');
    }

    return NextResponse.json({
      success: true,
      data: {
        draftedLetter: draftedLetter.trim(),
      },
    });
  } catch (error: any) {
    console.error('Error drafting appeal letter:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
