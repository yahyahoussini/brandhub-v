import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PortfolioProject } from '@/types/portfolio';

interface PortfolioCardProps {
  project: PortfolioProject;
  onViewDetails: (project: PortfolioProject) => void;
  index?: number;
}

export function PortfolioCard({ project, onViewDetails, index = 0 }: PortfolioCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl = project.screenshots?.[0] || 
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800';

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'graphics': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'content': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'business': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'programming': return 'Programmation';
      case 'graphics': return 'Design';
      case 'content': return 'Contenu';
      case 'business': return 'Business';
      default: return category;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={thumbnailUrl}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`} />

          {/* Featured Badge */}
          {project.is_featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-amber-500/90 text-white border-0 gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            </div>
          )}

          {/* Video Indicator */}
          {project.video_url && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm gap-1">
                <Play className="w-3 h-3" />
                Vidéo
              </Badge>
            </div>
          )}

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2 z-10"
          >
            <Button
              onClick={() => onViewDetails(project)}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Détails
            </Button>
            {project.demo_url && (
              <Button
                variant="outline"
                size="sm"
                className="bg-background/80 backdrop-blur-sm"
                asChild
              >
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <Badge 
            variant="outline" 
            className={`mb-3 ${getCategoryColor(project.service_category)}`}
          >
            {getCategoryLabel(project.service_category)}
          </Badge>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Client Info */}
          {project.client_name && (
            <p className="text-xs text-muted-foreground mb-3">
              <span className="text-foreground/70">Client:</span> {project.client_name}
              {project.client_industry && ` • ${project.client_industry}`}
            </p>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5 bg-secondary/50"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-secondary/50">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Results Preview */}
          {project.results && project.results.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex gap-2 overflow-hidden">
                {project.results.slice(0, 2).map((result, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap"
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
