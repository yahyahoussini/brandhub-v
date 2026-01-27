import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPostData {
  id: string;
  title: string;
  primary_keyword: string;
  service_category: string;
  service: string;
  region: string;
  location: string;
  post_type: string;
  target_audience: string;
  word_count: string;
  seo_difficulty: string;
  priority: string;
  content_angle: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse CSV data
    const csvData: BlogPostData[] = [
      {"id":"1","title":"Top 10 Branding & Design Morocco : Guide Expert 2025","primary_keyword":"branding agency Morocco","service_category":"Branding & Design","service":"Branding & Design","region":"Morocco/North Africa","location":"Morocco","post_type":"Guide Complet","target_audience":"pour PME marocaines","word_count":"2000-2500 mots","seo_difficulty":"Medium","priority":"High","content_angle":"Focus on Branding & Design in Morocco market with practical guide approach"},
      {"id":"2","title":"Digital Marketing Agency Casablanca : Top 10 pour startups africaines","primary_keyword":"digital marketing agency Casablanca","service_category":"Digital Marketing","service":"Marketing Digital","region":"Morocco/North Africa","location":"Casablanca","post_type":"Top 10","target_audience":"pour startups africaines","word_count":"2000-2500 mots","seo_difficulty":"Hard","priority":"High","content_angle":"Focus on Marketing Digital in Casablanca market with practical guide approach"},
      {"id":"3","title":"Comment Réussir votre Branding & Design Rabat : Comparatif","primary_keyword":"logo design Rabat","service_category":"Branding & Design","service":"Branding & Design","region":"Morocco/North Africa","location":"Rabat","post_type":"Comparatif","target_audience":"pour entreprises MENA","word_count":"2000-2500 mots","seo_difficulty":"Easy","priority":"High","content_angle":"Focus on Branding & Design in Rabat market with practical guide approach"},
      {"id":"4","title":"Développement Web Morocco : Tendances 2025 pour le marché européen","primary_keyword":"web development Morocco","service_category":"Web Development","service":"Développement Web","region":"Morocco/North Africa","location":"Morocco","post_type":"Tendances 2025","target_audience":"pour le marché européen","word_count":"2000-2500 mots","seo_difficulty":"Medium","priority":"High","content_angle":"Focus on Développement Web in Morocco market with practical guide approach"},
      {"id":"5","title":"Best Practices Contenu & Média : Dominer Rabat en 2025","primary_keyword":"e-commerce Maroc","service_category":"Content & Media","service":"Contenu & Média","region":"Morocco/North Africa","location":"Rabat","post_type":"Best Practices","target_audience":"en 2025","word_count":"2000-2500 mots","seo_difficulty":"Easy","priority":"High","content_angle":"Focus on Contenu & Média in Rabat market with practical guide approach"}
    ];

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    console.log(`Starting generation of ${csvData.length} blog posts...`);

    for (const post of csvData) {
      try {
        console.log(`Generating: ${post.title}`);

        // Generate content using AI
        const systemPrompt = `Tu es un expert en rédaction de contenu SEO pour une agence de développement web et branding. 
Tu écris en français de manière professionnelle, engageante et optimisée pour le SEO.
Tu dois créer un article de blog complet avec une structure claire incluant:
- Une introduction captivante (150-200 mots)
- Des sections avec des sous-titres H2 et H3
- Du contenu riche et informatif
- Des exemples pratiques et des conseils actionnables
- Une conclusion avec un appel à l'action fort

Le contenu doit être naturel, pas sur-optimisé, et apporter une vraie valeur au lecteur.`;

        const userPrompt = `Écris un article de blog complet de ${post.word_count} sur le sujet suivant:

Titre: ${post.title}
Mot-clé principal: ${post.primary_keyword}
Catégorie de service: ${post.service_category}
Service: ${post.service}
Région: ${post.region}
Localisation: ${post.location}
Type de post: ${post.post_type}
Audience cible: ${post.target_audience}
Angle de contenu: ${post.content_angle}

L'article doit être optimisé pour le SEO, inclure le mot-clé naturellement (3-5 fois), et être structuré avec des titres et sous-titres. 
Utilise un ton professionnel mais accessible. Inclus des conseils pratiques et des exemples concrets.
Format le contenu en HTML avec des balises appropriées (h2, h3, p, ul, li, strong, em).
Assure-toi que le contenu est unique et original.`;

        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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

        if (!aiResponse.ok) {
          throw new Error(`AI API error: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();
        const generatedContent = aiData.choices[0].message.content;

        // Generate excerpt
        const textContent = generatedContent.replace(/<[^>]*>/g, '');
        const excerpt = textContent.substring(0, 155) + '...';

        // Generate slug
        const slug = post.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        // Insert into database
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title: post.title,
            slug: slug,
            content: generatedContent,
            excerpt: excerpt,
            category: post.service_category,
            tags: [post.primary_keyword, post.location, post.service],
            is_published: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          throw insertError;
        }

        successCount++;
        console.log(`✓ Generated: ${post.title}`);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1500));

      } catch (error) {
        errorCount++;
        const errorMsg = `Error for "${post.title}": ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    const result = {
      success: true,
      total: csvData.length,
      successCount,
      errorCount,
      errors: errors.slice(0, 10), // Return first 10 errors only
      message: `Generated ${successCount} blog posts successfully. ${errorCount} errors.`
    };

    console.log('Generation complete:', result);

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Fatal error in generate-all-blogs:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
