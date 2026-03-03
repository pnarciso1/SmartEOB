const { GoogleAuth } = require('google-auth-library');

async function listModels() {
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    
    console.log('Using Project ID:', projectId);
    const location = 'us-central1';
    
    // Call the Vertex AI Publishers/Models endpoint
    // We try to GET the model gemini-1.5-pro-002 explicitly to see the exact REST error
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-1.5-pro-002:generateContent`;
    
    const res = await client.request({
      url,
      method: 'POST',
      data: {
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
      }
    });
    
    console.log('Model details:', JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error('Error fetching model:', error.response?.data || error.message);
  }
}

listModels();