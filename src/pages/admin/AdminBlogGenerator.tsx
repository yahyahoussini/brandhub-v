import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlayCircle, StopCircle, CheckCircle, AlertCircle } from "lucide-react";

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

export default function AdminBlogGenerator() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPost, setCurrentPost] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    checkAdminAndLoadCSV();
  }, []);

  const checkAdminAndLoadCSV = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      toast.error("Accès non autorisé");
      navigate("/");
      return;
    }

    // Load CSV data
    await loadCSVData();
  };

  const loadCSVData = async () => {
    try {
      const response = await fetch('/brandhub_100_blog_posts_seo.csv');
      const text = await response.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const posts: BlogPostData[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',');
          const post: any = {};
          headers.forEach((header, index) => {
            post[header.trim()] = values[index]?.trim() || '';
          });
          posts.push(post);
        }
      }
      
      setBlogPosts(posts);
      toast.success(`${posts.length} articles chargés depuis le CSV`);
    } catch (error) {
      console.error('Error loading CSV:', error);
      toast.error("Erreur lors du chargement du CSV");
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

  const generateBlogPost = async (post: BlogPostData) => {
    try {
      setCurrentPost(post.title);

      // Generate content using AI
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

      if (contentError) throw contentError;

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
          is_published: false
        });

      if (insertError) throw insertError;

      setGeneratedCount(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Error generating post:', error);
      setErrorCount(prev => prev + 1);
      toast.error(`Erreur pour: ${post.title}`);
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
    setGeneratedCount(0);
    setErrorCount(0);

    const total = blogPosts.length;
    
    for (let i = 0; i < total; i++) {
      if (!isGenerating) break; // Allow stopping

      await generateBlogPost(blogPosts[i]);
      setProgress(((i + 1) / total) * 100);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsGenerating(false);
    toast.success(`Génération terminée! ${generatedCount} réussis, ${errorCount} erreurs`);
  };

  const stopGeneration = () => {
    setIsGenerating(false);
    toast.info("Génération arrêtée");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Générateur de Blog Posts</CardTitle>
              <CardDescription>
                Génération automatique de 100 articles de blog optimisés SEO avec l'IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{blogPosts.length}</div>
                      <div className="text-sm text-muted-foreground">Articles à générer</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500">{generatedCount}</div>
                      <div className="text-sm text-muted-foreground">Générés avec succès</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-500">{errorCount}</div>
                      <div className="text-sm text-muted-foreground">Erreurs</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress */}
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    En cours: {currentPost}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {!isGenerating ? (
                  <Button 
                    onClick={startGeneration}
                    className="flex-1"
                    size="lg"
                    disabled={blogPosts.length === 0}
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Démarrer la génération
                  </Button>
                ) : (
                  <Button 
                    onClick={stopGeneration}
                    variant="destructive"
                    className="flex-1"
                    size="lg"
                  >
                    <StopCircle className="mr-2 h-5 w-5" />
                    Arrêter
                  </Button>
                )}
              </div>

              {/* Info */}
              <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-blue-700 dark:text-blue-300">
                        Important à savoir:
                      </p>
                      <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                        <li>La génération de 100 articles prendra environ 3-4 minutes</li>
                        <li>Chaque article fait 2000-2500 mots optimisés SEO</li>
                        <li>Les articles sont créés en brouillon (non publiés)</li>
                        <li>Vous pourrez les éditer individuellement après génération</li>
                        <li>Cette opération consommera des crédits Lovable AI (gratuits pendant la période promotionnelle Gemini)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
