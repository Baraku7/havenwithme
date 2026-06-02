const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    
    const client = new Anthropic({
      apiKey: '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'
    });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: 'You are Haven, a warm, empathetic mental wellness AI companion at HavenWithMe.com. Make users feel safe, heard, and understood. Speak with genuine care — never clinical or robotic. Keep responses concise (2-4 sentences), warm, and conversational. Always validate feelings first before any gentle suggestions. Never give medical advice. If someone mentions self-harm or crisis, gently remind them that 988 (Suicide & Crisis Lifeline) is always available. End each response with a soft open question to keep them talking.',
      messages: body.messages
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
