
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
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
    const { category = 'politics' } = await req.json();
    
    // Fetch news from NewsAPI
    const newsResponse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
    );
    const newsData = await newsResponse.json();

    // Generate AI summaries for each article
    const articlesWithSummaries = await Promise.all(
      newsData.articles.slice(0, 10).map(async (article: any) => {
        const prompt = `Summarize this news article in 2-3 sentences: ${article.title}. ${article.description || ''}`;
        
        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a news summarizer providing concise, objective summaries.' },
              { role: 'user', content: prompt }
            ],
          }),
        });

        const aiData = await aiResponse.json();
        
        return {
          ...article,
          aiSummary: aiData.choices[0].message.content,
        };
      })
    );

    return new Response(JSON.stringify(articlesWithSummaries), {
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
