import { useState, useRef } from 'react';
import { SparklesCore } from "@/components/ui/sparkles";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeaturedPortfolio } from '@/hooks/usePortfolio';
import { PortfolioDetailModal } from './PortfolioDetailModal';
import type { PortfolioProject } from '@/types/portfolio';

// Project Card Component
function ProjectCard({
  project,
  index,
  onSelect
}: {
  project: PortfolioProject;
  index: number;
  onSelect: (project: PortfolioProject) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.screenshots?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Floating Badge */}
          {project.is_featured && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Tech Stack Pills - Visible on hover */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/95 text-slate-900 shadow-sm backdrop-blur-[2px] border-0 font-medium text-[10px] px-2.5 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="bg-white/95 text-slate-900 shadow-sm backdrop-blur-[2px] border-0 font-medium text-[10px] px-2.5 py-0.5">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <Badge variant="outline" className="mb-2 bg-primary/5 border-primary/20 text-primary text-xs">
                {project.service_category}
              </Badge>
              <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            {project.demo_url && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demo_url!, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                </Button>
              </motion.div>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Results/Metrics */}
          {project.results && project.results.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <motion.span
                className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary font-medium border border-primary/20"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                {project.results[0]}
              </motion.span>
            </div>
          )}
        </div>

        {/* Hover Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />

        {/* Corner Glow Effect */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.article>
  );
}

// Parallax Grid Component - renders all projects in a 3-column grid
function ParallaxGrid({
  projects,
  onSelectProject
}: {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateFirst = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);
  const rotateThird = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Ensure we always show projects in rows of 3
  const projectsToShow = projects.slice(0, 6);

  // Distribute evenly: if we have fewer projects, still show them across 3 columns
  const getColumnProjects = (columnIndex: number) => {
    return projectsToShow.filter((_, i) => i % 3 === columnIndex);
  };

  const firstPart = getColumnProjects(0);
  const secondPart = getColumnProjects(1);
  const thirdPart = getColumnProjects(2);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* First Column - Parallax with rotation */}
      <motion.div
        className="flex flex-col gap-6"
        style={{ y: translateYFirst, rotateZ: rotateFirst }}
      >
        {firstPart.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index * 3}
            onSelect={onSelectProject}
          />
        ))}
      </motion.div>

      {/* Second Column - Static center column */}
      <div className="flex flex-col gap-6 md:mt-8">
        {secondPart.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index * 3 + 1}
            onSelect={onSelectProject}
          />
        ))}
      </div>

      {/* Third Column - Parallax opposite direction */}
      <motion.div
        className="flex flex-col gap-6"
        style={{ y: translateYThird, rotateZ: rotateThird }}
      >
        {thirdPart.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index * 3 + 2}
            onSelect={onSelectProject}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function FeaturedPortfolio() {
  const { projects, loading } = useFeaturedPortfolio();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-primary text-white border-0 gap-2 px-6 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
              <Sparkles className="w-4 h-4 fill-white/20" />
              Notre Portfolio
            </Badge>
          </motion.div>
          <div className="relative inline-block mb-16">
            <div className="w-full h-20 absolute top-0 pointer-events-none">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={800}
                className="w-full h-full"
                particleColor="#8b5cf6"
              />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold relative z-10">
              Projets qui{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                Inspirent
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos réalisations les plus remarquables et les succès de nos clients
          </p>
        </motion.div>

        {/* Parallax Grid */}
        <ParallaxGrid
          projects={projects}
          onSelectProject={setSelectedProject}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="gap-2 group px-8 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/portfolio">
              Voir tout le portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <PortfolioDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
