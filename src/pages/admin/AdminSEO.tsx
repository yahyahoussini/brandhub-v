import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Tag, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[] | null;
  is_published: boolean;
}

const AdminSEO = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    checkAdminAndLoadPosts();
  }, []);

  const checkAdminAndLoadPosts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur",
        variant: "destructive"
      });
      navigate("/dashboard");
      return;
    }

    await loadPosts();
    setLoading(false);
  };

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, tags, is_published")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les articles",
        variant: "destructive"
      });
    } else {
      setPosts(data || []);
    }
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setTags(post.tags || []);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (tags.includes(newTag.trim())) {
      toast({
        title: "Erreur",
        description: "Ce tag existe déjà",
        variant: "destructive"
      });
      return;
    }
    setTags([...tags, newTag.trim()]);
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveSEO = async () => {
    if (!selectedPost) return;

    const { error } = await supabase
      .from("blog_posts")
      .update({ tags })
      .eq("id", selectedPost.id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "SEO mis à jour"
      });
      await loadPosts();
      setSelectedPost(null);
      setTags([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Gestion SEO</h1>
            <p className="text-muted-foreground">
              Optimisez le référencement de vos articles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 w-5 h-5" />
                    Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {posts.map((post) => (
                      <Button
                        key={post.id}
                        variant={selectedPost?.id === post.id ? "default" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => handleSelectPost(post)}
                      >
                        <div className="truncate">
                          <div className="font-medium truncate">{post.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {post.tags?.length || 0} tags
                          </div>
                        </div>
                      </Button>
                    ))}
                    {posts.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Aucun article
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SEO Editor */}
            <div className="lg:col-span-2">
              {selectedPost ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Optimisation SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Post Info */}
                    <div className="space-y-4 pb-6 border-b">
                      <div>
                        <Label>Titre</Label>
                        <p className="text-sm font-medium mt-1">{selectedPost.title}</p>
                      </div>
                      
                      <div>
                        <Label>URL (Slug)</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          /blog/{selectedPost.slug}
                        </p>
                      </div>

                      <div>
                        <Label>Meta Description</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedPost.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedPost.excerpt.length} caractères (idéal: 150-160)
                        </p>
                      </div>
                    </div>

                    {/* Tags Management */}
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center">
                          <Tag className="mr-2 w-4 h-4" />
                          Mots-clés SEO (Tags)
                        </Label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Ajoutez des mots-clés pertinents pour améliorer le référencement
                        </p>
                        
                        <div className="flex space-x-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                            placeholder="Ajouter un tag"
                          />
                          <Button onClick={handleAddTag}>
                            Ajouter
                          </Button>
                        </div>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* SEO Recommendations */}
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center">
                          <Search className="mr-2 w-4 h-4" />
                          Recommandations SEO
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                        <div className="flex items-start space-x-2">
                          <span className={selectedPost.title.length <= 60 ? "text-green-600" : "text-yellow-600"}>
                            {selectedPost.title.length <= 60 ? "✓" : "⚠"}
                          </span>
                          <span>
                            Titre: {selectedPost.title.length} caractères 
                            {selectedPost.title.length > 60 && " (max recommandé: 60)"}
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className={selectedPost.excerpt.length >= 150 && selectedPost.excerpt.length <= 160 ? "text-green-600" : "text-yellow-600"}>
                            {selectedPost.excerpt.length >= 150 && selectedPost.excerpt.length <= 160 ? "✓" : "⚠"}
                          </span>
                          <span>
                            Description: {selectedPost.excerpt.length} caractères 
                            (idéal: 150-160)
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className={tags.length >= 3 ? "text-green-600" : "text-yellow-600"}>
                            {tags.length >= 3 ? "✓" : "⚠"}
                          </span>
                          <span>
                            Tags: {tags.length} 
                            {tags.length < 3 && " (minimum recommandé: 3)"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex space-x-4">
                      <Button onClick={handleSaveSEO} className="flex-1">
                        Enregistrer les modifications
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedPost(null);
                          setTags([]);
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Sélectionnez un article pour gérer son SEO
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminSEO;