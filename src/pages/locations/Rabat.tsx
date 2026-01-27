import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Building2, Users, MapPin, Phone, Mail, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationRabat() {
    return (
        <>
            <Helmet>
                <title>Branding & Web Development Rabat | Agence Digitale Capital | BrandHub.ma</title>
                <meta name="description" content="Agence de branding et développement web à Rabat, capitale du Maroc 🇲🇦 BrandHub.ma: Experts en identité de marque, création de sites web et marketing digital pour entreprises et institutions gouvernementales à Rabat. ⭐ Consultation gratuite!" />
                <meta name="keywords" content="branding rabat, web development rabat, agence digitale rabat, développement web rabat, création site web rabat, agence web rabat, design rabat, marketing digital rabat, agence gouvernementale rabat" />
                <link rel="canonical" href="https://brandhub.ma/locations/rabat" />
                <meta property="og:title" content="Branding & Web Development Rabat | BrandHub.ma" />
                <meta property="og:description" content="Agence digitale experte à Rabat. Services de branding, web development et marketing digital pour entreprises et institutions." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Landmark className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Rabat, Capitale du Maroc</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-300">
                                Agence Branding &
                            </span>
                            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500">
                                Web Development Rabat
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            Services professionnels de branding et développement web pour entreprises, institutions gouvernementales et organisations à Rabat et sa région.
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
                                    Nos Projets à Rabat
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">50+ Projets Gouvernementaux</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-info rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">Expertise Institutionnelle</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                                <span className="text-sm text-muted-foreground">Service Bilingue FR/AR</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Rabat Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
                            Expertise Digitale pour <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Rabat</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Landmark className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Projets Gouvernementaux</h3>
                                <p className="text-muted-foreground">
                                    Expérience approfondie avec institutions gouvernementales et organisations officielles à Rabat. Respect des normes et procédures administratives marocaines.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Users className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Entreprises & PME</h3>
                                <p className="text-muted-foreground">
                                    Solutions digitales pour startups, PME et grandes entreprises installées à Rabat. Innovation et professionnalisme adapté au marché de la capitale.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <MapPin className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Présence Locale</h3>
                                <p className="text-muted-foreground">
                                    Compréhension du tissu économique de Rabat, networking avec partenaires locaux, et connaissance des spécificités de la capitale administrative.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg glass-card hover-lift">
                                <Building2 className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Standards Internationaux</h3>
                                <p className="text-muted-foreground">
                                    Qualité internationale alignée avec les attentes des institutions et entreprises de Rabat. Conformité aux standards marocains et européens.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
                            Services Digitaux à Rabat
                        </h2>

                        <div className="space-y-6">
                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">🎨 Branding Institutionnel & Corporate</h3>
                                <p className="text-muted-foreground mb-4">
                                    Création d'identité de marque pour institutions gouvernementales, ONG et grandes entreprises à Rabat: logo professionnel, charte graphique institutionnelle, brand guidelines conformes aux standards officiels.
                                </p>
                                <Link to="/services/graphics" className="text-primary hover:underline font-medium">
                                    Services de branding professionnel →
                                </Link>
                            </div>

                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">💻 Développement Web Sécurisé</h3>
                                <p className="text-muted-foreground mb-4">
                                    Sites web gouvernementaux sécurisés, portails d'administration, et applications web conformes aux normes de sécurité. Hébergement local au Maroc disponible pour conformité CNDP.
                                </p>
                                <Link to="/services/programming" className="text-primary hover:underline font-medium">
                                    Solutions de développement web →
                                </Link>
                            </div>

                            <div className="p-8 rounded-lg border border-border hover:border-primary transition-colors">
                                <h3 className="text-2xl font-bold mb-3">📱 Marketing Digital & Communication</h3>
                                <p className="text-muted-foreground mb-4">
                                    Stratégies de communication digitale pour institutions, campagnes de sensibilisation, gestion réseaux sociaux officiels, et content management adapté au secteur public et privé.
                                </p>
                                <Link to="/services/content" className="text-primary hover:underline font-medium">
                                    Services de marketing digital →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <h2 className="text-4xl md:text-5xl font-display font-bold">
                            Lancez Votre Projet à Rabat
                        </h2>

                        <p className="text-xl text-muted-foreground">
                            Que vous soyez une institution, une entreprise ou une organisation, nous sommes prêts à transformer vos ambitions digitales en réalité.
                        </p>

                        <div className="flex flex-col items-center gap-4 pt-4">
                            <Button size="lg" asChild className="hover-lift shadow-premium text-lg px-12 py-8">
                                <Link to="/contact">
                                    Contactez-Nous pour Rabat
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
                        <h2>Agence Digitale Experte à Rabat - Capitale du Maroc</h2>
                        <p>
                            BrandHub.ma est votre partenaire digital de confiance à Rabat, capitale administrative du Maroc.
                            Nous comprenons les exigences spécifiques des institutions gouvernementales, des ambassades,
                            et des grandes entreprises établies à Rabat.
                        </p>

                        <h3>Services de Branding pour Institutions à Rabat</h3>
                        <p>
                            Notre expertise en branding institutionnel nous permet de créer des identités visuelles
                            professionnelles et conformes aux standards officiels. Nous travaillons avec des ministères,
                            agences gouvernementales, et organisations internationales basées à Rabat.
                        </p>

                        <h3>Développement Web Sécurisé pour le Secteur Public</h3>
                        <p>
                            En tant qu'agence de développement web à Rabat, nous créons des portails gouvernementaux sécurisés,
                            des sites institutionnels conformes aux normes CNDP, et des applications web robustes pour le secteur public et privé.
                        </p>

                        <h3>Pourquoi Choisir BrandHub.ma à Rabat?</h3>
                        <p>
                            Notre connaissance du tissu institutionnel et économique de Rabat, combinée à notre expertise technique
                            internationale, fait de nous le choix idéal pour vos projets digitaux dans la capitale.
                            Nous maîtrisons les procédures administratives marocaines et offrons un service bilingue français-arabe.
                        </p>

                        <h3>Secteurs Desservis à Rabat</h3>
                        <ul>
                            <li>Institutions gouvernementales et ministères</li>
                            <li>Ambassades et organisations internationales</li>
                            <li>Grandes entreprises et multinationales</li>
                            <li>PME et startups innovantes</li>
                            <li>ONGs et associations</li>
                            <li>Établissements d'enseignement supérieur</li>
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}
