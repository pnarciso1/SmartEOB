import { GoogleAuth } from 'google-auth-library';

const project = process.env.VERTEX_PROJECT_ID || 'smarteob-multi-tenant';
const location = 'us-central1';

/**
 * Generates an embedding vector for the provided text using Vertex AI REST API.
 * The @google-cloud/vertexai Node.js SDK currently lacks native text-embedding methods.
 */
export async function generateTextEmbedding(text: string): Promise<number[]> {
  try {
    let authOptions: any = {
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    };

    // Use raw JSON if on Vercel
    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      authOptions.credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
      authOptions.projectId = process.env.VERTEX_PROJECT_ID || 'smarteob-multi-tenant';
    }

    const auth = new GoogleAuth(authOptions);
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const model = 'text-embedding-004';
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:predict`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ content: text, task_type: 'RETRIEVAL_DOCUMENT' }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Error from Vertex AI API');
    }

    const vector = data.predictions?.[0]?.embeddings?.values;
    if (!vector || vector.length === 0) {
      throw new Error('No embedding returned from Vertex AI');
    }
    
    return vector;
  } catch (error) {
    console.error('Error generating text embedding via Vertex AI:', error);
    throw new Error('Failed to generate text embedding');
  }
}
