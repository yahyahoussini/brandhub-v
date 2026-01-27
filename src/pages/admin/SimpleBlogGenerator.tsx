import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SimpleBlogGenerator() {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [characterCount, setCharacterCount] = useState(3000);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [seoData, setSeoData] = useState<any>(null);

  const handleGenerate = async () => {
    const geminiApiKey = localStorage.getItem("GEMINI_API_KEY");

    if (!geminiApiKey) {
      toast({
        title: "API Key manquante",
        description: "Veuillez configurer votre clé API Gemini dans la page Gestion des API Keys",
        variant: "destructive"
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Sujet requis",
        description: "Veuillez entrer un sujet pour votre article",
        variant: "destructive"
      });
      return;
    }

    if (characterCount < 500 || characterCount > 10000) {
      toast({
        title: "Nombre de caractères invalide",
        description: "Le nombre de caractères doit être entre 500 et 10000",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedPost(null);
    setSeoData(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-simple-blog', {
        body: { 
          subject,
          characterCount,
          geminiApiKey,
          imagePrompt: imagePrompt.trim() || null
        }
      });

      if (error) throw error;

      if (data.success && data.post) {
        setGeneratedPost(data.post);
        setSeoData({
          keywords: data.seoKeywords || [],
          metaDescription: data.metaDescription || '',
          score: data.seoScore || 0,
          improvements: data.improvements || []
        });
        toast({
          title: "Article généré avec succès!",
          description: "Votre article a été créé et publié avec analyse SEO"
        });
      } else {
        throw new Error(data.error || "Erreur lors de la génération");
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer l'article",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Sparkles className="w-8 h-8 text-primary" />
              Générateur de Blog Posts
            </CardTitle>
            <CardDescription>
              Créez des articles de blog professionnels en quelques secondes avec l'IA Gemini
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet de l'article</Label>
              <Textarea
                id="subject"
                placeholder="Ex: Les tendances du marketing digital en 2025"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                rows={3}
                disabled={isGenerating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="characterCount">
                Nombre de caractères (500 - 10000)
              </Label>
              <Input
                id="characterCount"
                type="number"
                min={500}
                max={10000}
                step={500}
                value={characterCount}
                onChange={(e) => setCharacterCount(parseInt(e.target.value))}
                disabled={isGenerating}
              />
              <p className="text-sm text-muted-foreground">
                Environ {Math.round(characterCount / 5)} mots
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagePrompt">
                Description de l'image (optionnel)
              </Label>
              <Textarea
                id="imagePrompt"
                placeholder="Ex: Une illustration moderne du marketing digital avec des graphiques et des icônes technologiques"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
                disabled={isGenerating}
              />
              <p className="text-sm text-muted-foreground">
                L'image sera générée par IA et ajoutée à l'article
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer l'article
                </>
              )}
            </Button>

            {generatedPost && (
              <div className="space-y-4">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Article généré avec succès!</CardTitle>
                    <CardDescription>{generatedPost.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>ID:</strong> {generatedPost.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Slug:</strong> {generatedPost.slug}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Extrait:</strong> {generatedPost.excerpt}
                    </p>
                    {generatedPost.image_url && (
                      <div className="pt-4">
                        <p className="text-sm font-medium mb-2">Image générée:</p>
                        <img 
                          src={generatedPost.image_url} 
                          alt={generatedPost.title}
                          className="w-full max-w-md rounded-lg border"
                        />
                      </div>
                    )}
                    <div className="pt-4 space-x-2">
                      <Button variant="outline" asChild>
                        <Link to={`/blog/${generatedPost.slug}`} target="_blank">
                          Voir l'article
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/admin/blog">
                          Gérer les articles
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {seoData && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Analyse SEO
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold">Score SEO</p>
                          <span className={`text-3xl font-bold ${
                            seoData.score >= 80 ? 'text-green-500' : 
                            seoData.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {seoData.score}/100
                          </span>
                        </div>
                      </div>

                      {seoData.keywords.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold mb-3">Mots-clés SEO</p>
                          <div className="flex flex-wrap gap-2">
                            {seoData.keywords.map((keyword: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {seoData.metaDescription && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Meta Description</p>
                          <p className="text-sm text-muted-foreground p-4 bg-muted rounded-lg border">
                            {seoData.metaDescription}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {seoData.metaDescription.length} caractères
                          </p>
                        </div>
                      )}

                      {seoData.improvements && seoData.improvements.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold mb-3">Suggestions d'amélioration</p>
                          <ul className="space-y-2">
                            {seoData.improvements.map((improvement: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2 p-2 rounded bg-muted/50">
                                <span className="text-primary mt-0.5 font-bold">•</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="pt-6">
                <p className="text-sm">
                  💡 <strong>Astuce:</strong> Assurez-vous d'avoir configuré votre clé API Gemini dans{" "}
                  <a href="/admin/api-keys" className="text-primary hover:underline">
                    Gestion des API Keys
                  </a>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
