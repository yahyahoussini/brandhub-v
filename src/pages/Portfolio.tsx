import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { PortfolioFilters } from '@/components/portfolio/PortfolioFilters';
import { PortfolioDetailModal } from '@/components/portfolio/PortfolioDetailModal';
import { usePortfolio } from '@/hooks/usePortfolio';
import type { PortfolioProject, PortfolioFilters as FiltersType } from '@/types/portfolio';

export default function Portfolio() {
  const [filters, setFilters] = useState<FiltersType>({
    category: null,
    technologies: [],
    search: '',
    sortBy: 'date',
  });
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const { projects, featuredProjects, allTechnologies, loading, error } = usePortfolio(filters);

  return (
    <>
      <Helmet>
        <title>Portfolio | BrandHub - Nos Réalisations</title>
        <meta 
          name="description" 
          content="Découvrez notre portfolio de projets réussis en développement web, design graphique, marketing digital et plus encore." 
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 gap-2">
                <Sparkles className="w-3 h-3" />
                Portfolio
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Nos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                  Réalisations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explorez notre collection de projets réussis. Chaque réalisation 
                témoigne de notre engagement envers l'excellence et l'innovation.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <PortfolioFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableTechnologies={allTechnologies}
              />
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                Aucun projet ne correspond à vos critères de recherche.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Results Count */}
          {!loading && projects.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-muted-foreground mt-8"
            >
              {projects.length} projet{projects.length > 1 ? 's' : ''} trouvé{projects.length > 1 ? 's' : ''}
            </motion.p>
          )}
        </section>
      </main>

      <Footer />

      {/* Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
