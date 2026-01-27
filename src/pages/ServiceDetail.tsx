import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

interface Service {
  id: string;
  category: string;
  title: string;
  description: string | null;
  icon: string | null;
  price_starting: number | null;
  features: string[] | null;
  is_active: boolean;
}

interface ServiceExample {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
}

interface PricingTier {
  id: string;
  tier_name: string;
  description: string;
  delivery_time: string;
  revisions_count: number;
  price: number;
  details: string[];
}

const ServiceDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [examples, setExamples] = useState<ServiceExample[]>([]);
  const [landingContent, setLandingContent] = useState<string | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    if (!id) return;

    const [serviceRes, examplesRes, landingRes, pricingRes] = await Promise.all([
      supabase.from("services").select("*").eq("id", id).single(),
      supabase.from("service_examples").select("*").eq("service_id", id).order("display_order"),
      supabase.from("service_landing_content").select("content").eq("service_id", id).maybeSingle(),
      supabase.from("service_pricing_tiers").select("*").eq("service_id", id).order("tier_name")
    ]);

    if (serviceRes.error) {
      console.error("Error fetching service:", serviceRes.error);
      setLoading(false);
      return;
    }

    setService(serviceRes.data);
    if (examplesRes.data) setExamples(examplesRes.data);
    if (landingRes.data) setLandingContent(landingRes.data.content);
    if (pricingRes.data) setPricingTiers(pricingRes.data);
    setLoading(false);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "programming":
        return "from-blue-500 to-cyan-500";
      case "graphics":
        return "from-purple-500 to-pink-500";
      case "content":
        return "from-orange-500 to-red-500";
      case "business":
        return "from-green-500 to-emerald-500";
      default:
        return "from-primary to-secondary";
    }
  };

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case "programming":
        return "Programmation & Technologie";
      case "graphics":
        return "Design & Graphisme";
      case "content":
        return "Contenu & Marketing";
      case "business":
        return "Business & Data";
      default:
        return cat;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Service non trouvé</h1>
            <p className="text-muted-foreground mb-8">
              Le service que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => navigate("/")}>
              Retour à l'accueil
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate(`/services/${category}`)}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour aux services
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card className="overflow-hidden shadow-elegant animate-fade-in">
                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(service.category)}`}></div>
                <CardContent className="p-8">
                  <Badge className="mb-4">
                    {getCategoryName(service.category)}
                  </Badge>

                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {service.title}
                  </h1>

                  {service.description && (
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Features Card */}
              {service.features && service.features.length > 0 && (
                <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Ce qui est inclus</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-base"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Custom Landing Content */}
              {landingContent && (
                <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <CardContent className="p-8">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: landingContent }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Examples Portfolio */}
              {examples.length > 0 && (
                <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Exemples de Projets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {examples.map((example) => (
                        <div key={example.id} className="group">
                          {example.image_url && (
                            <div className="relative overflow-hidden rounded-lg mb-3">
                              <img
                                src={example.image_url}
                                alt={example.title}
                                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          )}
                          <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                          {example.description && (
                            <p className="text-sm text-muted-foreground mb-2">{example.description}</p>
                          )}
                          {example.project_url && (
                            <a
                              href={example.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Voir le projet →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Description Card */}
              <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Description détaillée</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description || "Ce service vous offre une solution complète et professionnelle adaptée à vos besoins. Notre équipe d'experts travaillera avec vous pour créer un résultat qui dépasse vos attentes."}
                    </p>

                    <h3 className="text-xl font-bold mt-6 mb-3">Pourquoi choisir ce service?</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Expertise professionnelle et créative
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Suivi personnalisé tout au long du projet
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Délais respectés et qualité garantie
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Support après livraison
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Tiers */}
              {pricingTiers.length > 0 ? (
                <Card className="shadow-elegant sticky top-24 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Tarifs & Forfaits</h3>

                    <div className="space-y-6">
                      {pricingTiers.map((tier) => (
                        <div key={tier.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-lg capitalize">{tier.tier_name}</h4>
                              <p className="text-sm text-muted-foreground">{tier.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">{tier.price.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">MAD</div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Livraison:</span>
                              <span className="font-medium">{tier.delivery_time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Révisions:</span>
                              <span className="font-medium">{tier.revisions_count}</span>
                            </div>
                          </div>

                          {tier.details.length > 0 && (
                            <div className="space-y-1 mb-4">
                              {tier.details.map((detail, i) => (
                                <div key={i} className="flex items-start text-sm">
                                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <Button
                            className="w-full"
                            variant={tier.tier_name === "standard" ? "default" : "outline"}
                            onClick={() => {
                              const message = `Bonjour, je suis intéressé(e) par le service "${service.title}" - Forfait ${tier.tier_name} (${tier.price.toLocaleString()} MAD). Pourriez-vous me donner plus d'informations ?`;
                              window.open(`https://wa.me/212703026422?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                          >
                            Choisir {tier.tier_name}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => {
                          const message = `Bonjour, je suis intéressé(e) par le service "${service.title}" (${getCategoryName(category || '')}). Pourriez-vous me contacter pour discuter des détails ?`;
                          window.open(`https://wa.me/212703026422?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-elegant sticky top-24 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <CardContent className="p-8">
                    {service.price_starting && (
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-2">À partir de</p>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                            {service.price_starting.toLocaleString()}
                          </span>
                          <span className="text-xl text-muted-foreground ml-2">MAD</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button
                        className="w-full gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold"
                        size="lg"
                        onClick={() => navigate("/contact")}
                      >
                        Demander un devis
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => {
                          const message = `Bonjour, je suis intéressé(e) par le service "${service.title}" (${getCategoryName(category || '')}). Pourriez-vous me contacter pour discuter des détails ?`;
                          window.open(`https://wa.me/212703026422?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                      >
                        WhatsApp
                      </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        Réponse en 24h
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        Devis personnalisé gratuit
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        Sans engagement
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card className="shadow-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Besoin d'aide?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Notre équipe est disponible pour répondre à toutes vos questions et vous guider dans votre projet.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/contact")}
                  >
                    Nous contacter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
