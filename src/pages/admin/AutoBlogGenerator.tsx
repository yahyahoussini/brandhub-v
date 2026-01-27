import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";

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

export default function AutoBlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPost, setCurrentPost] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    try {
      const response = await fetch('/brandhub_100_blog_posts_seo.csv');
      const text = await response.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        toast.error("CSV vide");
        setIsLoading(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const posts: BlogPostData[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= headers.length) {
          const post: any = {};
          headers.forEach((header, index) => {
            post[header] = values[index]?.trim() || '';
          });
          posts.push(post as BlogPostData);
        }
      }
      
      setBlogPosts(posts);
      toast.success(`${posts.length} articles prêts à générer`);
    } catch (error) {
      console.error('Error loading CSV:', error);
      toast.error("Erreur de chargement du CSV");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const generateSinglePost = async (post: BlogPostData) => {
    try {
      setCurrentPost(post.title);

      // Generate content using AI edge function
      const { data: contentData, error: contentError } = await supabase.functions.invoke(
        'generate-blog-content',
        {
          body: {
            title: post.title,
            primary_keyword: post.primary_keyword,
            service_category: post.service_category,
            service: post.service,
            region: post.region,
            location: post.location,
            post_type: post.post_type,
            target_audience: post.target_audience,
            word_count: post.word_count,
            content_angle: post.content_angle
          }
        }
      );

      if (contentError) {
        console.error('AI generation error:', contentError);
        throw new Error(contentError.message);
      }

      if (!contentData || !contentData.content) {
        throw new Error('No content generated');
      }

      // Insert into database
      const slug = generateSlug(post.title);
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: post.title,
          slug: slug,
          content: contentData.content,
          excerpt: contentData.excerpt,
          category: post.service_category,
          tags: [post.primary_keyword, post.location, post.service],
          is_published: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw insertError;
      }

      setSuccessCount(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Error generating post:', post.title, error);
      setErrorCount(prev => prev + 1);
      toast.error(`Erreur: ${post.title.substring(0, 30)}...`);
      return false;
    }
  };

  const startGeneration = async () => {
    if (blogPosts.length === 0) {
      toast.error("Aucun article à générer");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setSuccessCount(0);
    setErrorCount(0);
    
    toast.success("Démarrage de la génération...");

    const total = blogPosts.length;
    
    for (let i = 0; i < total; i++) {
      await generateSinglePost(blogPosts[i]);
      setProgress(((i + 1) / total) * 100);

      // Delay to avoid rate limiting (1.5s between requests)
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsGenerating(false);
    toast.success(`✅ Terminé! ${successCount} réussis, ${errorCount} erreurs`);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Générateur Automatique - 100 Articles
              </CardTitle>
              <CardDescription className="text-lg">
                Génération intelligente de {blogPosts.length} articles SEO avec l'IA
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary">{blogPosts.length}</div>
                    <div className="text-sm text-muted-foreground">Articles</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-green-500">{successCount}</div>
                    <div className="text-sm text-muted-foreground">Réussis</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-red-500">{errorCount}</div>
                    <div className="text-sm text-muted-foreground">Erreurs</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress */}
              {isGenerating && (
                <div className="space-y-3">
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progression: {Math.round(progress)}%</span>
                    <span className="font-medium">{successCount + errorCount} / {blogPosts.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {currentPost}
                  </p>
                </div>
              )}

              {/* Info */}
              {!isGenerating && (
                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-blue-700 dark:text-blue-300">
                          Ce qui va se passer:
                        </p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>✓ Génération de {blogPosts.length} articles complets (2000-2500 mots chacun)</li>
                          <li>✓ Durée estimée: ~2.5 minutes ({blogPosts.length} × 1.5s)</li>
                          <li>✓ Utilise Gemini 2.5 Flash (gratuit jusqu'au 6 Oct)</li>
                          <li>✓ Articles sauvegardés en brouillon</li>
                          <li>✓ Optimisation SEO automatique</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Button */}
              <Button 
                onClick={startGeneration}
                size="lg"
                className="w-full"
                disabled={isGenerating || blogPosts.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Générer {blogPosts.length} Articles Maintenant
                  </>
                )}
              </Button>

              {/* Results */}
              {!isGenerating && (successCount > 0 || errorCount > 0) && (
                <Card className={successCount > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}>
                  <CardContent className="pt-6 text-center">
                    {successCount > 0 ? (
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    ) : (
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                    )}
                    <h3 className="text-xl font-semibold mb-2">
                      {successCount > 0 ? "Génération Terminée!" : "Erreur de Génération"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {successCount} articles créés • {errorCount} erreurs
                    </p>
                    <Button onClick={() => window.location.href = '/admin/blog'}>
                      Voir les Articles
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
