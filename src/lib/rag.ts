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
const ragModel = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export interface RagContextInput {
  employerGroupId: string;
  cptCode: string;
  providerName: string;
  providerBilled: number;
}

/**
 * Employer Plan RAG Service
 * Retrieves the Plan Rules for the Employer and asks the AI to evaluate
 * the exact planRuleAmount for the specific medical service / CPT Code.
 */
export async function getPlanRuleAmount(input: RagContextInput): Promise<number> {
  const { employerGroupId, cptCode, providerName, providerBilled } = input;

  // 1. Retrieval: Fetch Employer Plan Rules (The Knowledge Base)
  const employerGroup = await prisma.employerGroup.findUnique({
    where: { id: employerGroupId },
    select: { planRules: true, name: true }
  });

  if (!employerGroup || !employerGroup.planRules) {
    console.warn(`No plan rules found for employer group: ${employerGroupId}. Defaulting to 0.`);
    return 0;
  }

  const planRulesStr = JSON.stringify(employerGroup.planRules);

  // 2. Augmented Generation: Ask Gemini to act as a claims adjudicator
  const prompt = `
    You are an expert Medical Claims Adjudicator AI.
    
    Employer Plan Rules:
    ${planRulesStr}

    Incoming Claim Details:
    - Provider: ${providerName}
    - CPT Code: ${cptCode}
    - Billed Amount: $${providerBilled}

    Based strictly on the Employer Plan Rules above, determine the "planRuleAmount" (the maximum amount the employer plan allows or covers for this service before patient responsibility).
    
    If the service is covered at 100%, the planRuleAmount should be equal to the Billed Amount (or the allowed limit if specified).
    If there is a copay (e.g. $50), the planRuleAmount is Billed Amount - Copay.
    
    Return ONLY a valid JSON object in this exact format:
    { "planRuleAmount": number }
  `;

  try {
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    };

    const response = await ragModel.generateContent(request);
    const content = response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No RAG response returned from Gemini');
    }

    const cleanJson = content.replace(/```json\n?|```/g, '').trim();
    const result = JSON.parse(cleanJson);

    return result.planRuleAmount || 0;
  } catch (error) {
    console.error('Error during Employer Plan RAG evaluation:', error);
    // Fallback if RAG fails (in production, might want to return a specific flag)
    return 0;
  }
}
