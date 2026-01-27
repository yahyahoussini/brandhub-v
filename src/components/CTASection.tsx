import { Button } from "./ui/button";
import { MessageSquare, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-20 shadow-2xl hover-lift transition-smooth">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
            {/* Using h2 for Playfair Display */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white animate-fade-in-up leading-tight">
              Prêt à Transformer Votre Vision en Réalité?
            </h2>

            <p className="text-xl md:text-2xl text-white/90 animate-fade-in-up leading-relaxed max-w-2xl mx-auto" style={{ animationDelay: "0.1s" }}>
              Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button
                size="lg"
                className="gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold px-8 py-6 text-lg group"
                asChild
              >
                <a
                  href="https://wa.me/212703026422?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services.%20Je%20vous%20contacte%20depuis%20votre%20section%20d'appel%20%C3%A0%20l'action."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  WhatsApp Maintenant
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg transition-smooth"
                asChild
              >
                <a href="tel:+212703026422" className="flex items-center">
                  <Phone className="mr-2 w-5 h-5" />
                  Appelez-nous
                </a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/90 text-base">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Réponse en 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                <span>Devis gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span>Sans engagement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
