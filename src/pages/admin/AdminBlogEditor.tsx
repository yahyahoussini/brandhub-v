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
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  is_published: boolean;
  published_at: string | null;
  views_count: number;
  created_at: string;
}

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    checkAdminAndLoadPosts();
  }, []);

  const checkAdminAndLoadPosts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      toast({
        title: "Accès refusé",
        description: "Vous devez être administrateur pour accéder à cette page",
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
      .select("*")
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

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!editingPost) {
      setSlug(generateSlug(value));
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setIsPublished(false);
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category);
    setIsPublished(post.is_published);
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!title || !slug || !excerpt || !content || !category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const postData = {
      title,
      slug,
      excerpt,
      content,
      category,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      author_id: session.user.id
    };

    let error;
    if (editingPost) {
      ({ error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id));
    } else {
      ({ error } = await supabase
        .from("blog_posts")
        .insert([postData]));
    }

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: editingPost ? "Article mis à jour" : "Article créé"
      });
      resetForm();
      await loadPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Article supprimé"
      });
      await loadPosts();
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Gestion des Articles</h1>
              <p className="text-muted-foreground">Créez et gérez vos articles de blog</p>
            </div>
            
            {!isCreating && (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin/blog/generate')}
                >
                  Générateur AI (100 articles)
                </Button>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="mr-2 w-4 h-4" />
                  Nouvel Article
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Form */}
            {isCreating && (
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingPost ? "Modifier l'Article" : "Nouvel Article"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Titre de l'article"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="titre-article"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Programmation">Programmation</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Branding">Branding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Extrait</Label>
                      <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Court résumé de l'article"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Contenu</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Contenu complet de l'article (Markdown supporté)"
                        rows={12}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={isPublished}
                        onCheckedChange={setIsPublished}
                      />
                      <Label htmlFor="published">Publier l'article</Label>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={handleSave} className="flex-1">
                        {editingPost ? "Mettre à jour" : "Créer"}
                      </Button>
                      <Button variant="outline" onClick={resetForm}>
                        Annuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Posts List */}
            <div className={isCreating ? "lg:col-span-1" : "lg:col-span-3"}>
              <Card>
                <CardHeader>
                  <CardTitle>Articles Existants</CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun article pour le moment
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {posts.map((post) => (
                        <Card key={post.id} className="hover-lift">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-bold mb-1">{post.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {post.excerpt}
                                </p>
                                <div className="flex items-center space-x-2 text-xs">
                                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                                    {post.category}
                                  </span>
                                  <span className={`px-2 py-1 rounded ${
                                    post.is_published 
                                      ? "bg-green-500/10 text-green-600" 
                                      : "bg-yellow-500/10 text-yellow-600"
                                  }`}>
                                    {post.is_published ? "Publié" : "Brouillon"}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {post.views_count} vues
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEdit(post)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(post.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminBlogEditor;