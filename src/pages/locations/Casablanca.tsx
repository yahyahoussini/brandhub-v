import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Building2, Users, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationCasablanca() {
    return (
        <>
            <Helmet>
                <title>Branding & Web Development Casablanca | Agence Digitale Expert | BrandHub.ma</title>
                <meta name="description" content="Agence de branding et développement web à Casablanca, Maroc 🇲🇦 BrandHub.ma: Services professionnels de création de sites web, identité de marque et marketing digital. Experts locaux basés à Casablanca. ⭐ Consultation gratuite!" />
                <meta name="keywords" content="branding casablanca, web development casablanca, agence digitale casablanca, développement web casablanca, création site web casablanca, agence web casablanca, design casablanca, marketing digital casablanca" />
                <link rel="canonical" href="https://brandhub.ma/locations/casablanca" />
                <meta property="og:title" content="Branding & Web Development Casablanca | BrandHub.ma" />
                <meta property="og:description" content="Agence digitale experte à Casablanca. Services de branding, web development et marketing digital pour entreprises marocaines." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Casablanca, Maroc</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-300">
                                Agence de Branding &
                            </span>
                            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500">
                                Web Development Casablanca
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            BrandHub.ma - Votre agence digitale de confiance à Casablanca.
                            Spécialistes en branding, développement web et marketing digital pour les entreprises marocaines.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button size="lg" asChild className="hover-lift shadow-premium text-lg px-10 py-7 group">
                                <Link to="/contact">
                                    <Mail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Demander un Devis Gratuit
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="glass-card backdrop-blur-premium hover-glow">
                                <Link to="/portfolio">
                                    <Building2 className="mr-2 w-5 h-5" />
                                    Voir Nos Projets
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">100+ Projets à Casablanca</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-info rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">Support Local 24/7</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">Équipe Casablancaise</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us in Casablanca */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
                            Pourquoi Choisir <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">BrandHub.ma</span> à Casablanca?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <MapPin className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Agence Locale</h3>
                                <p className="text-muted-foreground">
                                    Basés à Casablanca, nous comprenons le marché marocain et les spécificités des entreprises locales. Rencontres en personne possibles.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Users className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Expertise Marocaine</h3>
                                <p className="text-muted-foreground">
                                    Notre équipe casablancaise combine expertise internationale et connaissance approfondie du marché marocain et africain.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Globe className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Support Multilingue</h3>
                                <p className="text-muted-foreground">
                                    Services en français, arabe et anglais. Communication fluide avec votre équipe dans votre langue préférée.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Building2 className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Qualité Premium</h3>
                                <p className="text-muted-foreground">
                                    Standards internationaux à prix marocains. Qualité professionnelle accessible pour PME et grandes entreprises de Casablanca.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
                            Nos Services à Casablanca
                        </h2>

                        <div className="space-y-6">
                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">🎨 Branding & Identité Visuelle</h3>
                                <p className="text-muted-foreground mb-4">
                                    Création d'identité de marque complète pour entreprises casablancaises: logo design, charte graphique, brand guidelines, et stratégie de marque adaptée au marché marocain.
                                </p>
                                <Link to="/services/graphics" className="text-primary hover:underline font-medium">
                                    En savoir plus sur nos services de branding →
                                </Link>
                            </div>

                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">💻 Développement Web Casablanca</h3>
                                <p className="text-muted-foreground mb-4">
                                    Création de sites web professionnels, e-commerce, et applications web sur mesure. Technologies modernes, responsive design, et optimisation SEO pour le marché marocain.
                                </p>
                                <Link to="/services/programming" className="text-primary hover:underline font-medium">
                                    Découvrir nos services de développement web →
                                </Link>
                            </div>

                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">📱 Marketing Digital Maroc</h3>
                                <p className="text-muted-foreground mb-4">
                                    SEO local pour Casablanca, social media marketing, publicité digitale, et stratégie de contenu adaptée au marché marocain et aux tendances locales.
                                </p>
                                <Link to="/services/content" className="text-primary hover:underline font-medium">
                                    Explorer nos services marketing →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-5xl font-display font-bold">
                            Prêt à Démarrer Votre Projet à Casablanca?
                        </h2>

                        <p className="text-xl text-muted-foreground">
                            Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons transformer votre vision en réalité.
                        </p>

                        <div className="flex flex-col items-center gap-4 pt-4">
                            <Button size="lg" asChild className="hover-lift shadow-premium text-lg px-12 py-8">
                                <Link to="/contact">
                                    Contactez Notre Équipe Casablanca
                                </Link>
                            </Button>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-5 h-5" />
                                <a href="tel:+212703026422" className="hover:text-primary transition-colors">
                                    +212 703 026 422
                                </a>
                            </div>

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-5 h-5" />
                                <a href="mailto:contact@brandhub.ma" className="hover:text-primary transition-colors">
                                    contact@brandhub.ma
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="container mx-auto px-4 py-20 bg-muted/30">
                    <div className="max-w-4xl mx-auto prose prose-invert">
                        <h2>Agence Digitale à Casablanca - Votre Partenaire de Confiance</h2>
                        <p>
                            BrandHub.ma est fier d'être l'une des agences digitales leaders à Casablanca, Maroc.
                            Nous combinons expertise internationale en branding et web development avec une connaissance
                            approfondie du marché local marocain.
                        </p>

                        <h3>Services de Branding Professionnel à Casablanca</h3>
                        <p>
                            Notre agence de branding à Casablanca offre des services complets de création d'identité visuelle,
                            allant du design de logo à la stratégie de marque complète. Nous travaillons avec des PME, startups,
                            et grandes entreprises à travers Casablanca et tout le Maroc.
                        </p>

                        <h3>Développement Web Expert au Maroc</h3>
                        <p>
                            En tant qu'agence de développement web à Casablanca, nous créons des sites internet modernes,
                            performants et optimisés pour le référencement. Du site vitrine au e-commerce complexe,
                            nous maîtrisons les dernières technologies web.
                        </p>

                        <h3>Pourquoi Travailler avec une Agence Locale à Casablanca?</h3>
                        <p>
                            Choisir une agence digitale basée à Casablanca vous offre plusieurs avantages: rencontres en personne,
                            compréhension du marché local, support réactif en français et arabe, et tarifs adaptés au marché marocain.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
