import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TranscriptEntry {
  speaker: 'customer' | 'csr';
  text: string;
  timestamp: number;
}

interface ScoreRequest {
  scenarioId: string;
  personaId: string;
  transcript: TranscriptEntry[];
  duration: number;
  scenarioTitle: string;
  personaName: string;
  difficulty: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scenarioId, personaId, transcript, duration, scenarioTitle, personaName, difficulty } = await req.json() as ScoreRequest;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Scoring session for scenario: ${scenarioId}, persona: ${personaId}`);
    console.log(`Transcript entries: ${transcript.length}, Duration: ${duration}s`);

    // Format transcript for analysis
    const formattedTranscript = transcript.map(entry => 
      `[${Math.floor(entry.timestamp / 1000)}s] ${entry.speaker === 'customer' ? personaName : 'CSR'}: ${entry.text}`
    ).join('\n');

    const scoringPrompt = `You are an expert CSR training evaluator. Analyze this customer service training session and provide detailed scoring.

SCENARIO: ${scenarioTitle}
CUSTOMER PERSONA: ${personaName}
DIFFICULTY: ${difficulty}
DURATION: ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}

TRANSCRIPT:
${formattedTranscript}

Evaluate the CSR trainee's performance on these categories (score 1-5 each):

1. **Empathy** - Did they acknowledge emotions, show understanding, use empathetic language?
2. **Problem Solving** - Did they identify the issue quickly and propose effective solutions?
3. **Patience** - Did they remain calm, avoid interrupting, handle frustration well?
4. **Communication** - Was their speech clear, professional, and easy to understand?
5. **Resolution** - Did they resolve the issue or set clear next steps?
6. **Overall** - Holistic assessment of the interaction quality.

Respond with a JSON object in this exact format:
{
  "categories": {
    "empathy": { "score": <1-5>, "feedback": "<specific feedback>" },
    "problemSolving": { "score": <1-5>, "feedback": "<specific feedback>" },
    "patience": { "score": <1-5>, "feedback": "<specific feedback>" },
    "communication": { "score": <1-5>, "feedback": "<specific feedback>" },
    "resolution": { "score": <1-5>, "feedback": "<specific feedback>" },
    "overall": { "score": <1-5>, "feedback": "<specific feedback>" }
  },
  "keyStrengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "areasForImprovement": ["<area 1>", "<area 2>"],
  "summary": "<2-3 sentence overall assessment>",
  "recommendation": "<one of: excellent, good, needs-improvement, requires-training>"
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert CSR training evaluator. Always respond with valid JSON only, no markdown.' },
          { role: 'user', content: scoringPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    console.log('AI scoring response received');

    // Parse the JSON response
    let scoring;
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      scoring = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse scoring response');
    }

    // Calculate total score
    const categories = scoring.categories;
    const totalScore = Object.values(categories).reduce((sum: number, cat: any) => sum + cat.score, 0);
    const maxPossibleScore = 30;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    const result = {
      scenarioId,
      personaId,
      timestamp: new Date().toISOString(),
      duration,
      categories: scoring.categories,
      totalScore,
      maxPossibleScore,
      percentage,
      recommendation: scoring.recommendation,
      summary: scoring.summary,
      keyStrengths: scoring.keyStrengths,
      areasForImprovement: scoring.areasForImprovement,
      transcript,
    };

    console.log(`Scoring complete: ${percentage}% (${scoring.recommendation})`);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Score session error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
