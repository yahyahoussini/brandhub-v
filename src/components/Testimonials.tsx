import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { SparklesCore } from "./ui/sparkles";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) {
      setTestimonials(data);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary-50/5 to-background dark:via-primary-950/5" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
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
              Ce Que Disent <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Nos Clients</span>
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La satisfaction de nos clients est notre plus grande fierté
          </p>
        </div>

        {/* Two rows of scrolling testimonials */}
        <div className="space-y-8 overflow-hidden">
          {/* First Row - Scrolls Right */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-right">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card
                  key={`row1-${testimonial.id}-${index}`}
                  className="hover-lift shadow-premium glass-card backdrop-blur-premium border-primary/10 flex-shrink-0 w-[400px]"
                >
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-accent mb-4 opacity-50" />

                    <div className="flex mb-4" role="img" aria-label={`Note: ${testimonial.rating} sur 5 étoiles`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        {testimonial.company && (
                          <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolls Left (Reverse) */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-left">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card
                  key={`row2-${testimonial.id}-${index}`}
                  className="hover-lift shadow-premium glass-card backdrop-blur-premium border-primary/10 flex-shrink-0 w-[400px]"
                >
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-accent mb-4 opacity-50" />

                    <div className="flex mb-4" role="img" aria-label={`Note: ${testimonial.rating} sur 5 étoiles`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                        {getInitials(testimonial.name)}
                      </div>
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        {testimonial.company && (
                          <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
