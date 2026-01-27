import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, Users, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LocationMorocco = () => {
  return (
    <>
      <Helmet>
        <title>Agence Web Maroc | Développement Web & Branding à Casablanca, Rabat, Marrakech</title>
        <meta name="description" content="Agence de développement web au Maroc spécialisée en branding, design graphique et marketing digital. Services pour PME à Casablanca, Rabat, Marrakech et partout au Maroc." />
        <meta name="keywords" content="agence web maroc, développement web maroc, branding maroc, design graphique maroc, marketing digital maroc, création site web casablanca, agence digitale rabat, developpeur web marrakech" />
        <link rel="canonical" href="https://yourdomain.com/maroc" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Maroc</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Agence de Développement Web et Branding au Maroc
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Votre partenaire digital au Maroc pour le développement web, le branding, le design graphique et le marketing digital.
                Nous accompagnons les PME et grandes entreprises à Casablanca, Rabat, Marrakech et partout au Maroc dans leur transformation digitale.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-accent" asChild>
                  <a href="https://wa.me/212703026422?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services%20au%20Maroc.%20Je%20vous%20contacte%20depuis%20votre%20page%20Maroc." target="_blank" rel="noopener noreferrer">
                    Contactez-nous au Maroc
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services/programming">
                    Nos Services au Maroc
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services au Maroc */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Services de Développement Web au Maroc
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Solutions digitales complètes pour entreprises marocaines à Casablanca, Rabat, Marrakech, Tanger, Agadir et dans tout le Maroc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Développement Web Maroc</h3>
                  <p className="text-muted-foreground">
                    Création de sites web professionnels, e-commerce et applications web sur mesure pour entreprises marocaines.
                    Technologies modernes et SEO optimisé pour le marché marocain.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Branding & Design Graphique</h3>
                  <p className="text-muted-foreground">
                    Création d'identité visuelle, logo design, charte graphique et supports marketing pour marques marocaines.
                    Design qui capture l'essence de votre entreprise au Maroc.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Marketing Digital Maroc</h3>
                  <p className="text-muted-foreground">
                    Stratégies SEO, publicité Google Ads, gestion réseaux sociaux et content marketing pour entreprises au Maroc.
                    Augmentez votre visibilité en ligne sur le marché marocain.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Conseil en Stratégie Digitale</h3>
                  <p className="text-muted-foreground">
                    Accompagnement stratégique pour la transformation digitale de votre entreprise au Maroc.
                    Analyse, audit et recommandations personnalisées.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">E-commerce Maroc</h3>
                  <p className="text-muted-foreground">
                    Boutiques en ligne complètes avec paiement sécurisé adapté au marché marocain.
                    Solutions WooCommerce, Shopify et développement sur mesure.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Applications Web & Mobile</h3>
                  <p className="text-muted-foreground">
                    Développement d'applications web progressives (PWA) et applications mobiles pour iOS et Android
                    pour entreprises marocaines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Villes Principales */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Présents dans Toutes les Villes du Maroc
              </h2>
              <p className="text-xl text-muted-foreground">
                Nos services de développement web et branding sont disponibles partout au Maroc
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "Casablanca", "Rabat", "Marrakech", "Tanger",
                "Fès", "Agadir", "Meknès", "Oujda",
                "Kenitra", "Tétouan", "Salé", "Mohammedia"
              ].map((city) => (
                <Card key={city} className="text-center shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">{city}</h3>
                    <p className="text-sm text-muted-foreground">Développement Web</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi Choisir Notre Agence au Maroc */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Pourquoi Choisir Notre Agence Web au Maroc?
              </h2>

              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Expertise Locale au Maroc</h3>
                        <p className="text-muted-foreground">
                          Connaissance approfondie du marché marocain, des comportements des consommateurs et des spécificités
                          culturelles pour des solutions digitales adaptées aux entreprises marocaines.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Technologies de Pointe</h3>
                        <p className="text-muted-foreground">
                          Développement web avec les dernières technologies: React, Node.js, WordPress, Shopify.
                          Sites web rapides, sécurisés et optimisés pour le SEO au Maroc.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Support Client Dédié</h3>
                        <p className="text-muted-foreground">
                          Équipe disponible en français et arabe, support réactif et accompagnement continu après livraison.
                          Nous sommes là pour votre succès au Maroc.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Tarifs Compétitifs</h3>
                        <p className="text-muted-foreground">
                          Prix transparents et adaptés au marché marocain. Excellent rapport qualité-prix pour des services
                          de développement web et branding professionnels.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Contactez Notre Agence au Maroc
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Téléphone</h3>
                    <a href="tel:+212703026422" className="text-muted-foreground hover:text-primary">
                      +212 607 076 940
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Email</h3>
                    <a href="mailto:contact@youragency.com" className="text-muted-foreground hover:text-primary">
                      contact@youragency.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">WhatsApp</h3>
                    <a
                      href="https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20discuter%20avec%20vous%20concernant%20vos%20services%20au%20Maroc."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Chat Direct
                    </a>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-muted-foreground">
                Agence de développement web et branding au service des entreprises marocaines depuis plusieurs années.
                Transformez votre présence digitale au Maroc avec nos solutions professionnelles.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LocationMorocco;
