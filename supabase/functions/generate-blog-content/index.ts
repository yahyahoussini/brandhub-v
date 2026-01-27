import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      title, 
      primary_keyword, 
      service_category,
      service,
      region,
      location,
      post_type,
      target_audience,
      word_count,
      content_angle 
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Generate blog content using Lovable AI
    const systemPrompt = `Tu es un expert en rédaction de contenu SEO pour une agence de développement web et branding. 
Tu écris en français de manière professionnelle, engageante et optimisée pour le SEO.
Tu dois créer un article de blog complet avec une structure claire incluant:
- Une introduction captivante
- Des sections avec des sous-titres H2 et H3
- Du contenu riche et informatif
- Des exemples pratiques
- Une conclusion avec un appel à l'action

Le contenu doit être naturel, pas sur-optimisé, et apporter une vraie valeur au lecteur.`;

    const userPrompt = `Écris un article de blog complet de ${word_count} sur le sujet suivant:

Titre: ${title}
Mot-clé principal: ${primary_keyword}
Catégorie de service: ${service_category}
Service: ${service}
Région: ${region}
Localisation: ${location}
Type de post: ${post_type}
Audience cible: ${target_audience}
Angle de contenu: ${content_angle}

L'article doit être optimisé pour le SEO, inclure le mot-clé naturellement, et être structuré avec des titres et sous-titres. 
Utilise un ton professionnel mais accessible. Inclus des conseils pratiques et des exemples concrets.
Format le contenu en HTML avec des balises appropriées (h2, h3, p, ul, li, strong).`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    // Generate excerpt from first 150 characters of content
    const textContent = generatedContent.replace(/<[^>]*>/g, '');
    const excerpt = textContent.substring(0, 150) + '...';

    return new Response(
      JSON.stringify({ 
        content: generatedContent,
        excerpt: excerpt
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in generate-blog-content:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
