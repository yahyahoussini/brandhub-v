import { SparklesCore } from "./ui/sparkles"
import ceoImage from "@/assets/ceo-portrait.png"

const CEOSection = () => {
  return (
    <section className="py-20 bg-background/50 backdrop-blur-sm" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 700px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
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
              Rencontrez Notre <span className="gradient-primary bg-clip-text text-transparent">CEO</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mt-4">
            Conseils et insights pour votre succès digital
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image with animated effects */}
            <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-elegant">
                <img
                  src={ceoImage}
                  alt="Chief Executive Officer - Directeur Général et Fondateur de BrandHub"
                  loading="lazy"
                  width="600"
                  height="800"
                  decoding="async"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold">
                  Chief Executive Officer
                </h3>
                <p className="text-lg text-primary font-semibold">
                  Directeur Général & Fondateur
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/yahya-houssini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir le profil LinkedIn du CEO"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://yahyahoussini.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visiter le portfolio du CEO"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CEOSection
