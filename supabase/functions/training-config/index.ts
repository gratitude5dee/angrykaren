import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personaId, scenarioId } = await req.json();
    
    const ANAM_API_KEY = Deno.env.get('ANAM_API_KEY');
    if (!ANAM_API_KEY) {
      throw new Error('ANAM_API_KEY is not configured');
    }

    console.log(`Creating Anam session for persona: ${personaId}, scenario: ${scenarioId}`);

    // Define persona configurations based on persona characteristics
    // These should match personas in the database
    const personaConfig = {
      name: 'Training Customer',
      avatarId: '30fa96d0-26c4-4e55-94a0-517025942e18', // Default Cara avatar
      voiceId: '6bfbe25a-979d-40f3-a92b-5394170af54b', // Default voice
      llmId: 'ANAM_GPT_4O_MINI_V1',
      systemPrompt: `You are a customer calling customer service. You have a problem and need help resolving it.
Be realistic in your responses. Express frustration appropriately but allow the CSR to help you.
If the CSR shows empathy and provides solutions, gradually become more cooperative.
Stay in character throughout the conversation.`,
    };

    // Create Anam session token with persona config
    const anamResponse = await fetch('https://api.anam.ai/v1/auth/session-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ANAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personaConfig,
      }),
    });

    if (!anamResponse.ok) {
      const errorText = await anamResponse.text();
      console.error('Anam API error:', anamResponse.status, errorText);
      throw new Error(`Anam API error: ${anamResponse.status} - ${errorText}`);
    }

    const anamData = await anamResponse.json();
    console.log('Anam session created successfully');

    return new Response(
      JSON.stringify({
        anamSessionToken: anamData.sessionToken,
        personaId,
        scenarioId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Training config error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
