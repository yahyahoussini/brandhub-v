import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FolderKanban, User, LogOut, Shield, BarChart3, Search, FileEdit } from "lucide-react";

interface Profile {
  id: string;
  full_name: string | null;
  email?: string;
  role?: string;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  service_category: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    // Get user profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileData) {
      setProfile({
        ...profileData,
        email: session.user.email
      });
    }

    // Get user projects
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", session.user.id)
      .order("created_at", { ascending: false });

    if (projectsData) {
      setProjects(projectsData);
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt!"
      });
      navigate("/");
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
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Tableau de Bord
              </h1>
              <p className="text-muted-foreground">
                Bienvenue, {profile?.full_name || "Utilisateur"}
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Déconnexion
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 w-5 h-5" />
                  Mon Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{profile?.full_name || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile?.email}</p>
                </div>
                {profile?.role === "admin" && (
                  <div>
                    <p className="text-sm text-muted-foreground">Rôle</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <p className="font-medium text-primary">Administrateur</p>
                    </div>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  Modifier le profil
                </Button>
              </CardContent>
            </Card>

            {/* Admin Menu */}
            {profile?.role === "admin" && (
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 w-5 h-5 text-primary" />
                    Administration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/blog")}
                  >
                    <FileEdit className="mr-2 w-4 h-4" />
                    Gestion Blog
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/analytics")}
                  >
                    <BarChart3 className="mr-2 w-4 h-4" />
                    Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/seo")}
                  >
                    <Search className="mr-2 w-4 h-4" />
                    Gestion SEO
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            <div className={profile?.role === "admin" ? "lg:col-span-1" : "lg:col-span-2"}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FolderKanban className="mr-2 w-5 h-5" />
                      Mes Projets
                    </CardTitle>
                    <Button onClick={() => navigate("/contact")}>
                      Nouveau Projet
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-12">
                      <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Vous n'avez pas encore de projet
                      </p>
                      <Button onClick={() => navigate("/contact")}>
                        Créer mon premier projet
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <Card key={project.id} className="hover-lift">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {project.description}
                                </p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                                    {project.service_category}
                                  </span>
                                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">
                                    {project.status}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Voir détails
                              </Button>
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

export default Dashboard;
