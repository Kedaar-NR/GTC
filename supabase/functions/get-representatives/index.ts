
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();
    
    if (!GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not configured');
    }
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Fetching representatives for address:', address);
    
    // Fetch representatives from Google Civic API
    const civicResponse = await fetch(
      `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );
    
    if (!civicResponse.ok) {
      throw new Error(`Google Civic API error: ${await civicResponse.text()}`);
    }
    
    const civicData = await civicResponse.json();
    console.log('Got civic data:', JSON.stringify(civicData, null, 2));

    // For each representative, get an AI summary of their policies
    const representativesWithSummaries = await Promise.all(
      civicData.officials.map(async (official: any, index: number) => {
        const office = civicData.offices.find((office: any) => 
          office.officialIndices.includes(index)
        );

        // Generate AI summary using a more focused prompt
        const prompt = `Generate a brief, factual summary (2-3 sentences) about ${official.name}, who serves as ${office?.name || 'a public official'}. Include their party affiliation if known from their data.`;
        
        console.log('Generating AI summary for:', official.name);
        
        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a political analyst providing concise, factual summaries based only on the information provided.' },
              { role: 'user', content: prompt }
            ],
          }),
        });

        if (!aiResponse.ok) {
          console.error('OpenAI API error:', await aiResponse.text());
          throw new Error('Failed to generate AI summary');
        }

        const aiData = await aiResponse.json();
        
        return {
          ...official,
          office: office?.name || 'Unknown Office',
          division: office?.divisionId || 'Unknown Division',
          aiSummary: aiData.choices[0].message.content,
        };
      })
    );

    return new Response(JSON.stringify(representativesWithSummaries), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
