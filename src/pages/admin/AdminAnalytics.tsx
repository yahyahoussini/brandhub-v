import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, MessageSquare, Users, FileText, TrendingUp } from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  totalPosts: number;
  publishedPosts: number;
  totalInquiries: number;
  totalProjects: number;
  totalUsers: number;
  topPosts: Array<{
    id: string;
    title: string;
    views_count: number;
    category: string;
  }>;
  recentInquiries: Array<{
    id: string;
    name: string;
    service_interest: string;
    created_at: string;
  }>;
}

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    checkAdminAndLoadAnalytics();
  }, []);

  const checkAdminAndLoadAnalytics = async () => {
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

    await loadAnalytics();
    setLoading(false);
  };

  const loadAnalytics = async () => {
    try {
      // Get blog posts stats
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("id, title, views_count, category, is_published");

      const totalViews = posts?.reduce((sum, post) => sum + (post.views_count || 0), 0) || 0;
      const totalPosts = posts?.length || 0;
      const publishedPosts = posts?.filter(p => p.is_published).length || 0;

      const topPosts = posts
        ?.filter(p => p.is_published)
        .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
        .slice(0, 5) || [];

      // Get inquiries
      const { data: inquiries } = await supabase
        .from("contact_inquiries")
        .select("id, name, service_interest, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const { count: inquiriesCount } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true });

      // Get projects
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      // Get users
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      setAnalytics({
        totalViews,
        totalPosts,
        publishedPosts,
        totalInquiries: inquiriesCount || 0,
        totalProjects: projectsCount || 0,
        totalUsers: usersCount || 0,
        topPosts,
        recentInquiries: inquiries || []
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive"
      });
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
            <h1 className="text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vues Blog</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sur {analytics?.publishedPosts} articles publiés
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalPosts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics?.publishedPosts} publiés
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Demandes Contact</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalInquiries}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Demandes reçues
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projets</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalProjects}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Projets créés
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analytics?.totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Comptes créés
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Posts and Recent Inquiries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Articles Les Plus Vus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{post.title}</p>
                        <p className="text-sm text-muted-foreground">{post.category}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views_count}
                      </div>
                    </div>
                  ))}
                  {analytics?.topPosts.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun article publié
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demandes Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border-b pb-3 last:border-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {inquiry.service_interest || "Non spécifié"}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {analytics?.recentInquiries.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucune demande
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminAnalytics;