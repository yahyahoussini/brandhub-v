import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import GlassCard from "@/components/ui/glass-card";
import { Card, CardContent } from "@/components/ui/card";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Code, Smartphone, Monitor, Bot, Shield, ShoppingCart, Map, Cpu } from "lucide-react";

interface Service {
  id: string;
  category: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
}

const ServiceProgramming = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("category", "programming")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching services:", error);
    } else if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      Code, Smartphone, Monitor, Bot, Shield, ShoppingCart, Map, Cpu
    };
    return icons[iconName || "Code"] || Code;
  };

  // Fallback services if database is empty
  const fallbackServices = [
    {
      icon: Code,
      title: "Développement Web",
      description: "Sites WordPress, WooCommerce, Shopify et solutions web sur mesure"
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Développement iOS et Android natif et cross-platform"
    },
    {
      icon: Monitor,
      title: "Applications Desktop",
      description: "Logiciels Windows, Mac et Linux pour toutes vos besoins"
    },
    {
      icon: Bot,
      title: "IA & Automatisation",
      description: "Agents IA, chatbots et automatisation de processus"
    },
    {
      icon: Shield,
      title: "Cybersécurité",
      description: "Audit de sécurité, protection et conformité RGPD"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Boutiques en ligne performantes et optimisées"
    },
    {
      icon: Map,
      title: "Cartographie Web",
      description: "Geoportail, web-mapping et solutions SIG"
    },
    {
      icon: Cpu,
      title: "Solutions Hardware",
      description: "CAD, PCB design, 3D printing et prototypage"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Développement Web & Applications | BrandHub.ma</title>
        <meta name="description" content="Services de développement web et mobile professionnels au Maroc : sites WordPress, WooCommerce, Shopify, applications iOS/Android, IA, cybersécurité et solutions e-commerce. Agence tech innovante." />
        <meta name="keywords" content="développement web maroc, création site wordpress maroc, développement application mobile maroc, woocommerce maroc, shopify maroc, développement ios android casablanca, intelligence artificielle maroc, cybersécurité maroc, e-commerce maroc, développement logiciel maroc" />
        
        <meta property="og:title" content="Développement Web & Applications | BrandHub.ma" />
        <meta property="og:description" content="Solutions technologiques innovantes : développement web, applications mobiles, IA, cybersécurité et e-commerce au Maroc et en Afrique." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/programming" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Développement Web & Applications | BrandHub.ma" />
        <meta name="twitter:description" content="Services de développement web, applications mobiles, IA et cybersécurité au Maroc." />
        
        <link rel="canonical" href="https://brandhub.ma/services/programming" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web & Mobile Development",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East", "Europe"],
            "description": "Services professionnels de développement web (WordPress, WooCommerce, Shopify), applications mobiles (iOS, Android), intelligence artificielle, cybersécurité et solutions e-commerce.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
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
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Code className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Programmation & Technologie</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solutions Technologiques
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Innovantes et Performantes
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Du développement web aux applications mobiles, en passant par l'IA et la cybersécurité, 
              nous créons des solutions technologiques adaptées à vos besoins.
            </p>
          </div>
        </div>
      </WavyBackground>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto justify-items-center">
            {displayServices.map((service, index) => {
              const IconComponent = service.id 
                ? getIconComponent(service.icon)
                : service.icon;
              
              return (
                <div
                  key={service.id || index} 
                  className="animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => service.id && navigate(`/services/programming/${service.id}`)}
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

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Notre <span className="gradient-primary bg-clip-text text-transparent">Processus</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { step: "01", title: "Analyse", desc: "Étude approfondie de vos besoins et objectifs" },
                { step: "02", title: "Conception", desc: "Architecture technique et design de la solution" },
                { step: "03", title: "Développement", desc: "Codage et intégration des fonctionnalités" },
                { step: "04", title: "Tests & Déploiement", desc: "Validation qualité et mise en production" },
                { step: "05", title: "Maintenance", desc: "Support continu et évolutions" }
              ].map((item, index) => (
                <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 flex items-start space-x-6">
                    <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent opacity-30">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceProgramming;
