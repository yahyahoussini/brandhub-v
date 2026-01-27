import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CEOSection from "@/components/CEOSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              À Propos de Notre Agence Digitale
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Agence de développement web et branding au Maroc, en Espagne et en Arabie Saoudite - Votre partenaire pour la transformation digitale
            </p>

            <Card className="shadow-elegant mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Agence de développement web basée au Maroc avec une présence en Espagne et en Arabie Saoudite, nous avons 
                  été fondés avec la passion de l'innovation et l'excellence. Notre mission est de transformer les idées en 
                  réalités digitales grâce à nos services de branding, design graphique, développement de sites web et 
                  marketing digital. Nous combinons créativité, expertise technique et compréhension approfondie des besoins 
                  de nos clients pour livrer des solutions qui font la différence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Au fil des années, nous avons accompagné plus de 300 entreprises au Maroc, en Espagne et en Arabie Saoudite 
                  dans leur transformation digitale, en leur fournissant des services de haute qualité en développement web, 
                  programmation sur mesure, design graphique, création de contenu et stratégie business. Nos clients incluent 
                  des PME et des grandes entreprises à la recherche d'une agence digitale fiable et innovante.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Notre Mission</h3>
                  <p className="text-muted-foreground">
                    Accompagner les entreprises dans leur transformation digitale en fournissant des solutions 
                    innovantes, performantes et sur-mesure qui répondent à leurs objectifs stratégiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Notre Vision</h3>
                  <p className="text-muted-foreground">
                    Devenir le partenaire de référence en transformation digitale, reconnu pour notre excellence, 
                    notre créativité et notre capacité à générer des résultats mesurables pour nos clients.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Notre Équipe</h3>
                  <p className="text-muted-foreground">
                    Une équipe pluridisciplinaire de professionnels passionnés, experts dans leurs domaines respectifs, 
                    qui travaillent ensemble pour créer des solutions exceptionnelles.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Nos Valeurs</h3>
                  <p className="text-muted-foreground">
                    Excellence, innovation, transparence et engagement. Ces valeurs guident chaque projet 
                    et chaque interaction avec nos clients.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Pourquoi Nous Choisir?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Expertise Multidisciplinaire:</strong> Notre équipe couvre tous les aspects 
                      du digital, de la programmation au design en passant par le marketing.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Approche Personnalisée:</strong> Chaque projet est unique. Nous prenons 
                      le temps de comprendre vos besoins pour créer des solutions sur-mesure.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Qualité Garantie:</strong> Nous nous engageons à livrer des résultats 
                      de haute qualité, dans les délais convenus.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Support Continu:</strong> Notre relation ne s'arrête pas à la livraison. 
                      Nous restons à vos côtés pour assurer le succès de votre projet.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CEOSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
