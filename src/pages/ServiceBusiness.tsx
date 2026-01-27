import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import GlassCard from "@/components/ui/glass-card";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BarChart3, Database, FileSearch, Scale, TrendingUp, Users, Target, Package, Microscope, Lightbulb, Rocket } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
}

const ServiceBusiness = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "business")
      .eq("is_active", true);

    if (data) setServices(data);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      BarChart3, Database, FileSearch, Scale, TrendingUp, Users
    };
    return icons[iconName || "BarChart3"] || BarChart3;
  };

  const fallbackServices = [
    {
      icon: BarChart3,
      title: "Analyse de Données",
      description: "Business intelligence et tableaux de bord analytiques"
    },
    {
      icon: Database,
      title: "Gestion de Données",
      description: "Architecture et administration de bases de données"
    },
    {
      icon: FileSearch,
      title: "Études de Marché",
      description: "Recherche et analyse de marché approfondie"
    },
    {
      icon: Scale,
      title: "Consultation Légale",
      description: "Conseil juridique pour votre entreprise"
    },
    {
      icon: TrendingUp,
      title: "Business Plans",
      description: "Plans d'affaires et stratégies de croissance"
    },
    {
      icon: Users,
      title: "Conseil Stratégique",
      description: "Accompagnement dans vos décisions stratégiques"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const processSteps = [
    {
      number: "01",
      title: "Analyse des Besoins",
      description: "Identification précise de vos défis business et objectifs stratégiques.",
      icon: Target
    },
    {
      number: "02",
      title: "Collecte de Données",
      description: "Rassemblement des données pertinentes internes et externes pour une analyse complète.",
      icon: Package
    },
    {
      number: "03",
      title: "Analyse Approfondie",
      description: "Traitement et analyse des données avec des outils avancés de business intelligence.",
      icon: Microscope
    },
    {
      number: "04",
      title: "Recommandations Stratégiques",
      description: "Élaboration de stratégies actionnables basées sur des insights data-driven.",
      icon: Lightbulb
    },
    {
      number: "05",
      title: "Mise en Œuvre & Suivi",
      description: "Accompagnement dans l'implémentation et suivi des KPIs pour mesurer l'impact.",
      icon: Rocket
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Services Business Intelligence & Analyse de Données | BrandHub.ma</title>
        <meta name="description" content="BrandHub offre des services experts en Business Intelligence, analyse de données, études de marché et conseil stratégique au Maroc et en Afrique. Prenez des décisions éclairées basées sur les données." />
        <meta name="keywords" content="business intelligence maroc, analyse de données maroc, études de marché afrique, conseil stratégique maroc, data analytics casablanca, gestion de données maroc, business plans maroc, consultation légale business maroc, insights stratégiques afrique" />
        
        <meta property="og:title" content="Services Business Intelligence & Analyse de Données | BrandHub.ma" />
        <meta property="og:description" content="Exploitez la puissance des données avec nos services de Business Intelligence, analyse stratégique et conseil business. Solutions data-driven pour votre croissance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/business" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services Business Intelligence & Analyse de Données | BrandHub.ma" />
        <meta name="twitter:description" content="Exploitez la puissance des données avec nos services de Business Intelligence, analyse stratégique et conseil business." />
        
        <link rel="canonical" href="https://brandhub.ma/services/business" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Business Intelligence & Data Analytics",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East"],
            "description": "Services professionnels en Business Intelligence, analyse de données, études de marché et conseil stratégique pour optimiser vos décisions business.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      <WavyBackground
        containerClassName="pt-32 pb-20"
        colors={["#11118b", "#8b5cf6", "#6366f1", "#a855f7", "#7c3aed"]}
        waveWidth={80}
        backgroundFill="hsl(var(--background))"
        blur={8}
        speed="slow"
        waveOpacity={0.3}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Business & Data</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Insights Stratégiques
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Pour Décisions Éclairées
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Exploitez la puissance des données et du conseil stratégique 
              pour optimiser votre activité et accélérer votre croissance.
            </p>
          </div>
        </div>
      </WavyBackground>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {displayServices.map((service, index) => {
              const IconComponent = service.id 
                ? getIconComponent(service.icon)
                : service.icon;
              
              return (
                <div
                  key={service.id || index} 
                  className="animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/services/business/${service.id}`)}
                >
                  <GlassCard
                    variant="light"
                    title={service.title}
                    description={service.description || ""}
                    icon={IconComponent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSection steps={processSteps} accentColor="green" />

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceBusiness;
