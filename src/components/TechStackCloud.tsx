import { IconCloud } from "@/components/ui/interactive-icon-cloud"
import { SparklesCore } from "./ui/sparkles"
import { useState, useEffect, useRef } from "react"

const slugs = [
  // Web Development
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "nextdotjs",
  "vuedotjs",
  // Databases & Cloud
  "postgresql",
  "mongodb",
  "firebase",
  "vercel",
  "amazonaws",
  // DevOps & Tools
  "docker",
  "git",
  "github",
  "gitlab",
  // Design & UI/UX
  "figma",
  "tailwindcss",
  "canva",
  "sketch",
  "adobexd",
  // 3D & Creative
  "blender",
  "unity",
  "adobecreativecloud",
  // AI & Machine Learning
  "openai",
  "tensorflow",
  "pytorch",
  "keras",
  "scikitlearn",
  "huggingface",
  // Data & Analytics
  "tableau",
  "python",
  "pandas",
  "jupyter",
  "anaconda",
]

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

const TechStackCloud = () => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return (
    <section className="py-20 bg-background">
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
              Technologies <span className="gradient-primary bg-clip-text text-transparent">Maîtrisées</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mt-4">
            Un écosystème complet de technologies modernes pour vos projets
          </p>
        </div>

        <div
          ref={elementRef}
          className="flex justify-center items-center animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center rounded-lg border bg-card/50 backdrop-blur-sm shadow-elegant">
            {isVisible ? (
              <IconCloud iconSlugs={slugs} />
            ) : (
              <div className="flex items-center justify-center">
                <div className="shimmer h-64 w-64 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStackCloud
