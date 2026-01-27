import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function QuickBlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generateAllPosts = async () => {
    setIsGenerating(true);
    setResult(null);
    toast.info("Démarrage de la génération automatique...");

    try {
      const { data, error } = await supabase.functions.invoke('generate-all-blogs');

      if (error) throw error;

      setResult(data);
      
      if (data.success) {
        toast.success(`✅ ${data.successCount} articles générés avec succès!`);
      } else {
        toast.error("Erreur lors de la génération");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erreur lors de l'appel à la fonction");
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24 pb-12">
        <div className="container max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Générateur Automatique de Blog
              </CardTitle>
              <CardDescription className="text-lg">
                Génération instantanée de 5 articles SEO avec l'IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {!result && !isGenerating && (
                <>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      Ce qui va se passer:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✓ Génération automatique de 5 articles complets</li>
                      <li>✓ Chaque article fait 2000-2500 mots</li>
                      <li>✓ Optimisation SEO avec mots-clés</li>
                      <li>✓ Structure HTML avec titres et sous-titres</li>
                      <li>✓ Contenu unique pour chaque article</li>
                      <li>✓ Sauvegarde automatique en brouillon</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={generateAllPosts}
                    size="lg"
                    className="w-full"
                    disabled={isGenerating}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Générer 5 Articles Maintenant
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Durée estimée: 10-15 secondes • Utilise Gemini 2.5 Flash (gratuit jusqu'au 6 Oct)
                  </p>
                </>
              )}

              {isGenerating && (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Génération en cours...</h3>
                  <p className="text-muted-foreground">
                    L'IA crée vos articles optimisés SEO. Cela prendra environ 10-15 secondes.
                  </p>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  {result.success ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Génération Réussie!</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-bold text-green-600">{result.successCount}</span> articles créés
                        </p>
                        {result.errorCount > 0 && (
                          <p className="text-muted-foreground">
                            <span className="font-bold text-red-600">{result.errorCount}</span> erreurs
                          </p>
                        )}
                      </div>
                      <Button 
                        onClick={() => window.location.href = '/admin/blog'}
                        className="mt-4"
                      >
                        Voir les Articles
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                      <h3 className="text-xl font-semibold mb-2">Erreur</h3>
                      <p className="text-sm text-muted-foreground">{result.error}</p>
                      <Button 
                        onClick={generateAllPosts}
                        variant="outline"
                        className="mt-4"
                      >
                        Réessayer
                      </Button>
                    </div>
                  )}

                  {result.errors && result.errors.length > 0 && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-muted-foreground">
                        Voir les erreurs détaillées
                      </summary>
                      <div className="mt-2 p-3 bg-muted rounded space-y-1">
                        {result.errors.map((error: string, i: number) => (
                          <div key={i} className="font-mono">{error}</div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
