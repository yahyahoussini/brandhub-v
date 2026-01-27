import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, ChevronLeft, ChevronRight, 
  Target, Lightbulb, TrendingUp, Play, Maximize2 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { PortfolioProject } from '@/types/portfolio';

interface PortfolioDetailModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioDetailModal({ project, isOpen, onClose }: PortfolioDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const hasMultipleImages = screenshots.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-blue-500/20 text-blue-400';
      case 'graphics': return 'bg-purple-500/20 text-purple-400';
      case 'content': return 'bg-green-500/20 text-green-400';
      case 'business': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatMetricValue = (key: string, value: unknown): string => {
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('rate') || key.toLowerCase().includes('retention')) {
        return `${value}%`;
      }
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toString();
    }
    return String(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className={`mb-2 ${getCategoryColor(project.service_category)}`}>
                    {project.service_category}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                  {project.client_name && (
                    <p className="text-muted-foreground mt-1">
                      {project.client_name}
                      {project.client_industry && ` • ${project.client_industry}`}
                    </p>
                  )}
                </div>
                {project.demo_url && (
                  <Button asChild className="shrink-0">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir le site
                    </a>
                  </Button>
                )}
              </div>
            </DialogHeader>

            {/* Image Gallery / Video */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-6">
              {showVideo && project.video_url ? (
                <iframe
                  src={project.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={screenshots[currentImageIndex] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Video Toggle */}
                  {project.video_url && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Voir la vidéo
                    </button>
                  )}
                </>
              )}

              {/* Back to Images */}
              {showVideo && (
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && !showVideo && (
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {screenshots.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground mb-6">{project.description}</p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge / Solution / Results */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {project.challenge && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-red-400" />
                    <h4 className="font-semibold text-red-400">Défi</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.challenge}</p>
                </div>
              )}
              
              {project.solution && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold text-blue-400">Solution</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.solution}</p>
                </div>
              )}
              
              {project.results && project.results.length > 0 && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="font-semibold text-green-400">Résultats</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Metrics */}
            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-semibold mb-4">Métriques clés</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold text-primary">
                        {formatMetricValue(key, value)}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
