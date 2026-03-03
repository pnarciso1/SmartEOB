import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
import { prisma } from '@/lib/prisma';
import { generateTextEmbedding } from '@/lib/embeddings';
import { getPlanRuleAmount } from '@/lib/rag';
import { clusterClaimToEvent } from '@/lib/clustering';
import { performThreeWayReconciliation } from '@/lib/reconciliation';

// Initialize Vertex AI
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
const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-2.0-flash', 
  generationConfig: {
    responseMimeType: 'application/json',
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const tenantId = formData.get('tenantId') as string | null;
    const memberId = formData.get('memberId') as string | null;
    const employerGroupId = formData.get('employerGroupId') as string | null;

    if (!file || !tenantId || !memberId || !employerGroupId) {
      return NextResponse.json({ error: 'Missing required form data fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'application/pdf';

    const prompt = `
      You are an expert Healthcare Fintech Architect AI agent.
      Analyze the attached medical document (either a Provider Invoice or an Insurance EOB).
      Extract the following data points with high accuracy. 
      If there are multiple line items/services on the bill, extract an array of objects.
      Return ONLY a valid JSON object in this exact format:
      {
        "claims": [
          {
            "providerName": "String",
            "serviceDate": "YYYY-MM-DD",
            "cptCode": "String (extract primary if multiple, or 'UNKNOWN')",
            "providerBilled": Number,
            "insuranceAllowed": Number (use 0 if not present or denied),
            "documentType": "INVOICE" or "EOB",
            "clinicalContextSummary": "String (brief 1 sentence summary of the diagnoses/services for semantic clustering)"
          }
        ]
      }
    `;

    const request = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
      ],
    };

    const response = await generativeModel.generateContent(request);
    const content = response.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content returned from Vertex AI model');
    }

    const cleanJsonString = content.replace(/```json\n?|```/g, '').trim();
    let parsedJson = JSON.parse(cleanJsonString);
    
    // Handle cases where Gemini returns an array directly, or a single object without "claims" array
    let claimsData: any[] = [];
    if (Array.isArray(parsedJson)) {
      claimsData = parsedJson;
    } else if (parsedJson.claims && Array.isArray(parsedJson.claims)) {
      claimsData = parsedJson.claims;
    } else {
      claimsData = [parsedJson]; // Fallback to wrap a single object
    }

    const processedClaims = [];
    let primaryEventId: string | null = null;

    for (const extractedData of claimsData) {
      // Generate Semantic Embedding for Clustering
      const contextTextToEmbed = `${extractedData.providerName} - ${extractedData.cptCode} - ${extractedData.clinicalContextSummary}`;
      const contextVector = await generateTextEmbedding(contextTextToEmbed);

      // RAG: Retrieve Plan Rule Amount
      const planRuleAmount = await getPlanRuleAmount({
        employerGroupId,
        cptCode: extractedData.cptCode || 'UNKNOWN',
        providerName: extractedData.providerName || 'Unknown',
        providerBilled: extractedData.providerBilled || 0
      });

      // Execute Three-Way Reconciliation
      const reconResult = performThreeWayReconciliation({
        providerBilled: extractedData.providerBilled || 0,
        insuranceAllowed: extractedData.insuranceAllowed || 0,
        planRuleAmount
      });

      // Parse Date
      let parsedDate = new Date(extractedData.serviceDate);
      if (isNaN(parsedDate.getTime())) {
        console.warn('Invalid date returned by Gemini. Defaulting to current date.', extractedData.serviceDate);
        parsedDate = new Date();
      }

      // Event Clustering Logic (Group all line items from this document into the same event if possible)
      let eventId: string | null = primaryEventId;
      if (!eventId) {
        eventId = await clusterClaimToEvent({
          tenantId,
          memberId,
          serviceDate: parsedDate,
          contextVector,
          cptCode: extractedData.cptCode || 'UNKNOWN'
        });
        primaryEventId = eventId; // Save for subsequent line items in this loop
      }

      const vectorStr = `[${contextVector.join(',')}]`;

      const claim = await prisma.claim.create({
        data: {
          tenantId,
          eventId,
          providerName: extractedData.providerName || 'Unknown Provider',
          serviceDate: parsedDate,
          cptCode: extractedData.cptCode || 'UNKNOWN',
          providerBilled: extractedData.providerBilled || 0,
          insuranceAllowed: extractedData.insuranceAllowed || 0,
          planRuleAmount,
          memberOwes: reconResult.memberOwes,
          status: reconResult.status,
          varianceNote: reconResult.varianceNote,
          rawEobData: extractedData
        }
      });

      // Update with raw SQL to inject pgvector embedding
      await prisma.$executeRaw`
        UPDATE "Claim"
        SET "contextVector" = ${vectorStr}::vector
        WHERE id = ${claim.id}
      `;

      processedClaims.push({
        claimId: claim.id,
        eventId,
        reconResult,
        extractedData
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: processedClaims,
      message: 'Successfully processed end-to-end medical claim ingestion' 
    });

  } catch (error: any) {
    console.error('Error processing end-to-end claim document:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
