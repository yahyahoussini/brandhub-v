import { Code, Palette, PenTool, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "./ui/glass-card";
import { SparklesCore } from "./ui/sparkles";

const ServicesOverview = () => {
  const services = [
    {
      icon: Code,
      title: "Programmation & Technologie",
      description: "Développement web, mobile, desktop et solutions technologiques avancées incluant l'IA et la cybersécurité.",
      path: "/services/programming",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "Design & Graphisme",
      description: "Identité visuelle, UI/UX design, impression et création graphique pour marquer les esprits.",
      path: "/services/graphics",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PenTool,
      title: "Contenu & Marketing",
      description: "Rédaction, traduction, marketing digital et production de contenu pour amplifier votre message.",
      path: "/services/content",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Business & Data",
      description: "Analyse de données, études de marché et consultation stratégique pour optimiser votre activité.",
      path: "/services/business",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in-up space-y-6">
          <div className="relative inline-block">
            <div className="w-full h-20 absolute top-0">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={800}
                className="w-full h-full"
                particleColor="#8b5cf6"
              />
            </div>
            {/* Using h2 for Playfair Display font */}
            <h2 className="text-5xl md:text-6xl font-display font-bold relative z-10">
              Nos <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Services</span>
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des solutions complètes pour tous vos besoins en branding et transformation digitale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {services.map((service, index) => (
            <Link
              key={service.path}
              to={service.path}
              aria-label={`Découvrir nos services de ${service.title.toLowerCase()}`}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GlassCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                href={service.path}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
