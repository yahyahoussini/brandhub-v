'use client'

import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

// Lazy load the heavy Spline component - only when visible
const SplineScene = lazy(() => import("@/components/ui/splite").then(m => ({ default: m.SplineScene })));

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, stop observing
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, { threshold: 0.1, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { isVisible, elementRef };
}

export function SplineSceneBasic() {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section aria-label="Hero section avec scène 3D interactive" className="animate-fade-in-up">
      <Card className="w-full min-h-[600px] bg-black/[0.96] relative overflow-hidden shadow-2xl hover-lift transition-smooth">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
          {/* Left content - Enhanced with premium typography */}
          <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white border-0 rounded-full w-fit shadow-lg hover:bg-primary/90 transition-colors">
              <Sparkles className="w-4 h-4 fill-white/20 animate-pulse" />
              <span className="text-sm font-semibold">Agence Premium</span>
            </div>

            {/* Main Headline - Using Playfair Display via h1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-300">
                Agence Branding & Création Web
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl leading-relaxed">
              BrandHub.ma – Solutions Web sur-mesure à Casablanca, Marrakech & Rabat
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="hover-lift shadow-premium text-base px-8 group"
                asChild
              >
                <a href="/contact">
                  Démarrer Votre Projet
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-glow text-base px-8 bg-white/5 border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <a href="/portfolio">
                  Voir Nos Réalisations
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>+100 Projets Réalisés</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
                <span>Support 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                <span>ROI Garanti</span>
              </div>
            </div>
          </div>

          {/* Right content - Only load Spline when scrolled into view */}
          <div
            ref={elementRef}
            className="flex-1 relative min-h-[400px] lg:min-h-0"
            role="img"
            aria-label="Scène 3D interactive représentant notre expertise digitale"
          >
            {isVisible ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center" role="status">
                  {/* Premium loading state */}
                  <div className="space-y-4 w-full max-w-md p-8">
                    <div className="shimmer h-12 rounded-lg" />
                    <div className="shimmer h-12 w-3/4 rounded-lg" />
                    <div className="shimmer h-12 w-1/2 rounded-lg" />
                  </div>
                </div>
              }>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
                {/* Static preview before Spline loads */}
                <div className="text-center space-y-4 p-8">
                  <div className="shimmer h-12 rounded-lg w-64 mx-auto" />
                  <div className="shimmer h-12 w-48 rounded-lg mx-auto" />
                  <div className="shimmer h-12 w-32 rounded-lg mx-auto" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom gradient overlay for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </Card>
    </section>
  )
}
