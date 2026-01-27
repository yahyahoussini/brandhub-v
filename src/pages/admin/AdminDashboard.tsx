import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  FolderKanban, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  DollarSign,
  Eye,
  Package
} from "lucide-react";

interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  totalInquiries: number;
  newInquiries: number;
  totalBlogViews: number;
  publishedPosts: number;
  totalServices: number;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalBlogViews: 0,
    publishedPosts: 0,
    totalServices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Get clients count
      const { count: clientsCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client");

      // Get projects stats
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      const { count: activeProjectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .in("status", ["in_progress", "pending"]);

      // Get inquiries stats
      const { count: inquiriesCount } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true });

      const { count: newInquiriesCount } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      // Get blog stats
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("views_count, is_published");

      const totalViews = posts?.reduce((sum, post) => sum + (post.views_count || 0), 0) || 0;
      const publishedCount = posts?.filter(p => p.is_published).length || 0;

      // Get services count
      const { count: servicesCount } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      setStats({
        totalClients: clientsCount || 0,
        totalProjects: projectsCount || 0,
        activeProjects: activeProjectsCount || 0,
        totalInquiries: inquiriesCount || 0,
        newInquiries: newInquiriesCount || 0,
        totalBlogViews: totalViews,
        publishedPosts: publishedCount,
        totalServices: servicesCount || 0
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Clients Totaux",
      value: stats.totalClients,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Projets Actifs",
      value: stats.activeProjects,
      subtitle: `sur ${stats.totalProjects} totaux`,
      icon: FolderKanban,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Nouvelles Demandes",
      value: stats.newInquiries,
      subtitle: `sur ${stats.totalInquiries} totales`,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Vues Blog",
      value: stats.totalBlogViews.toLocaleString(),
      subtitle: `${stats.publishedPosts} articles publiés`,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Services Actifs",
      value: stats.totalServices,
      icon: Package,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre activité BrandHub
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift cursor-pointer" onClick={() => window.location.href = "/admin/blog"}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="mr-2 w-5 h-5" />
              Créer un Article
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Publier du nouveau contenu sur le blog
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer" onClick={() => window.location.href = "/admin/projects"}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FolderKanban className="mr-2 w-5 h-5" />
              Gérer Projets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Suivre et mettre à jour les projets
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer" onClick={() => window.location.href = "/admin/inquiries"}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 w-5 h-5" />
              Voir Demandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {stats.newInquiries} nouvelles demandes
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift cursor-pointer" onClick={() => window.location.href = "/admin/analytics"}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="mr-2 w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Voir les statistiques détaillées
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}