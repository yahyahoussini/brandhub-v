import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSkeleton, ServicesSkeleton, TestimonialsSkeleton, ContentSkeleton } from "@/components/LoadingSkeleton";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";

// Lazy load ALL heavy components for optimal performance
const Hero = lazy(() => import("@/components/Hero"));
const FeaturedPortfolio = lazy(() => import("@/components/portfolio/FeaturedPortfolio").then(m => ({ default: m.FeaturedPortfolio })));
const ServicesOverview = lazy(() => import("@/components/ServicesOverview"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
// Defer these heavy components - load after initial render
const WorldMapSection = lazy(() => import("@/components/WorldMapSection").then(m => ({ default: m.WorldMapSection })));
const CTAWithVerticalMarquee = lazy(() => import("@/components/ui/cta-with-text-marquee"));
const NeuralNetworkHero = lazy(() => import("@/components/ui/neural-network-hero"));
const TechStackCloud = lazy(() => import("@/components/TechStackCloud"));
const FAQ = lazy(() => import("@/components/FAQ"));
const WebsiteCostCalculator = lazy(() => import("@/components/WebsiteCostCalculator"));
const NewsletterSignup = lazy(() => import("@/components/NewsletterSignup"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <PerformanceOptimizer />

      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Aller au contenu principal
      </a>

      <Navbar />

      <main id="main-content" role="main">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <FeaturedPortfolio />
        </Suspense>

        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesOverview />
        </Suspense>

        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <CTAWithVerticalMarquee />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <NeuralNetworkHero
            title="Prêt à Transformer Votre Vision en Réalité?"
            description="Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs avec des solutions innovantes et performantes."
            badgeText="Technologie de Pointe"
            badgeLabel="Nouveau"
            ctaButtons={[
              { text: "Consultation Gratuite", href: "https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20une%20consultation%20gratuite.%20Je%20vous%20contacte%20depuis%20la%20section%20technologique%20de%20votre%20site.", primary: true },
              { text: "Voir Nos Projets", href: "/services/programming" }
            ]}
            microDetails={["Innovation constante", "Expertise confirmée", "Résultats garantis"]}
          />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <WorldMapSection />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <TechStackCloud />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <WebsiteCostCalculator />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <NewsletterSignup />
        </Suspense>

        <Suspense fallback={<ContentSkeleton />}>
          <BlogPreview />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
