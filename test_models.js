const { VertexAI } = require('@google-cloud/vertexai');

const project = 'smarteob-multi-tenant';
const location = 'us-central1';

async function testModel(modelName) {
  console.log(`\nTesting Model: ${modelName} ...`);
  try {
    const vertexAI = new VertexAI({ project, location });
    const generativeModel = vertexAI.getGenerativeModel({
      model: modelName,
      generationConfig: { maxOutputTokens: 10 }
    });

    const request = {
      contents: [{ role: 'user', parts: [{ text: 'Say the word "test"' }] }],
    };

    const response = await generativeModel.generateContent(request);
    const content = response.response.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(`✅ SUCCESS for ${modelName}! Output: "${content.trim()}"`);
    return true;
  } catch (error) {
    if (error.message.includes('404')) {
      console.log(`❌ FAILED (404 Not Found) for ${modelName}`);
    } else {
      console.log(`❌ FAILED (Other Error) for ${modelName}`);
      console.error(error.message);
    }
    return false;
  }
}

async function runDiagnostics() {
  console.log('--- Vertex AI Diagnostics ---');
  console.log('Project:', project);
  console.log('Location:', location);

  // Test standard production models
  const modelsToTest = [
    'gemini-1.5-pro-002',
    'gemini-2.0-flash',
    'gemini-2.0-flash-exp',
    'gemini-2.0-pro-exp-02-05',
    'gemini-2.5-pro',
    'gemini-2.5-flash'
  ];

  for (const model of modelsToTest) {
    await testModel(model);
  }
}

runDiagnostics();