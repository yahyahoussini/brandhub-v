import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Database, Mail, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const navigate = useNavigate();

  const settingsCategories = [
    {
      title: "Clés API",
      description: "Gérer toutes vos clés API et intégrations",
      icon: Shield,
      action: () => navigate("/admin/api-keys"),
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Base de Données",
      description: "Configuration et gestion de la base de données",
      icon: Database,
      action: () => window.open("https://supabase.com/dashboard", "_blank"),
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Email & Notifications",
      description: "Configurer les emails et notifications système",
      icon: Mail,
      action: () => {},
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Analytics & SEO",
      description: "Paramètres d'analytics et référencement",
      icon: TrendingUp,
      action: () => navigate("/admin/seo"),
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration globale de votre plateforme BrandHub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category, index) => (
          <Card key={index} className="hover-lift cursor-pointer" onClick={category.action}>
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Configurer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 w-5 h-5" />
            Informations Système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base de données:</span>
            <span className="font-medium">Supabase PostgreSQL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hébergement:</span>
            <span className="font-medium">Lovable Cloud</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dernière mise à jour:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}