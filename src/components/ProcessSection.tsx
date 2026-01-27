import { SparklesCore } from "./ui/sparkles";
import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
  accentColor?: string;
}

const ProcessSection = ({ steps, accentColor = "purple" }: ProcessSectionProps) => {
  return (
    <section className="py-20 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-2 relative z-10">
              Notre <span className="gradient-primary bg-clip-text text-transparent">Processus</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mt-4">
            Une méthodologie éprouvée pour des résultats exceptionnels
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card 
                  key={index}
                  className="hover-lift animate-fade-in relative overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-${accentColor}-500 transition-all duration-300 group-hover:w-full group-hover:opacity-10`} />
                  
                  <CardContent className="p-8 relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${accentColor}-500/10 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${accentColor}-600`} />
                      </div>
                      <div className={`text-4xl font-bold text-${accentColor}-500/20`}>
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;