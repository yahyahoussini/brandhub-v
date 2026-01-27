import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, characterCount, geminiApiKey, imagePrompt } = await req.json();

    if (!subject || !characterCount || !geminiApiKey) {
      throw new Error('Missing required parameters');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating blog post with Gemini API:', { subject, characterCount });

    console.log('Calling Gemini API...');
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + geminiApiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Create a professional blog post about "${subject}". 

Requirements:
- Write approximately ${characterCount} characters
- Write in French
- Use HTML formatting with proper tags (h2, h3, p, ul, li, strong, em)
- Include SEO-optimized content
- Structure: introduction, main sections with subheadings, conclusion
- Make it engaging and informative
- Use professional tone

You must return a JSON object with this exact structure (no markdown, just pure JSON):
{
  "content": "the full HTML blog post content here",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "metaDescription": "a compelling 150-160 character meta description",
  "seoScore": 85,
  "improvements": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: Math.ceil(characterCount / 2) + 2000, // Extra tokens for thinking and formatting
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Erreur API Gemini (${response.status}): Vérifiez votre clé API dans Gestion des API Keys`);
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const finishReason = data.candidates?.[0]?.finishReason;

    if (!rawContent) {
      console.error('No content in response:', JSON.stringify(data));
      if (finishReason === 'MAX_TOKENS') {
        throw new Error('Le contenu demandé est trop long. Essayez avec un nombre de caractères plus petit.');
      }
      throw new Error('Aucun contenu généré par Gemini. Réessayez avec un sujet différent.');
    }

    // Parse JSON response
    let parsedResponse;
    try {
      const cleanedContent = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // Fallback to treating entire response as content
      parsedResponse = {
        content: rawContent,
        seoKeywords: [],
        metaDescription: rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160),
        seoScore: 70,
        improvements: []
      };
    }

    const generatedContent = parsedResponse.content || rawContent;

    // Create excerpt (first 150 characters)
    const textContent = generatedContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const excerpt = textContent.substring(0, 150) + '...';

    // Generate slug from subject
    const slug = subject
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Generate image if prompt provided
    let imageUrl = null;
    if (imagePrompt) {
      console.log('Generating image with Lovable AI:', imagePrompt);
      
      const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image-preview',
          messages: [{
            role: 'user',
            content: imagePrompt
          }],
          modalities: ['image', 'text']
        }),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        console.error('Image generation error:', imageResponse.status, errorText);
        // Continue without image rather than failing
      } else {
        const imageData = await imageResponse.json();
        imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        console.log('Image generated successfully:', imageUrl ? 'Yes' : 'No');
      }
    }

    // Insert into database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: subject,
        slug: slug + '-' + Date.now(),
        content: generatedContent,
        excerpt: excerpt,
        category: 'Digital Marketing',
        tags: ['AI Generated', 'Blog'],
        is_published: true,
        published_at: new Date().toISOString(),
        image_url: imageUrl
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Erreur d'enregistrement: ${insertError.message}`);
    }

    console.log('Blog post created successfully:', insertedPost.id);

    return new Response(JSON.stringify({ 
      success: true,
      post: insertedPost,
      content: generatedContent,
      excerpt: excerpt,
      seoKeywords: parsedResponse.seoKeywords || [],
      metaDescription: parsedResponse.metaDescription || excerpt,
      seoScore: parsedResponse.seoScore || 70,
      improvements: parsedResponse.improvements || []
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-simple-blog function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Une erreur est survenue',
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
