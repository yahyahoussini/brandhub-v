export interface PortfolioProject {
  id: string;
  title: string;
  description: string | null;
  service_category: string;
  status: string | null;
  demo_url: string | null;
  screenshots: string[] | null;
  video_url: string | null;
  technologies: string[] | null;
  is_featured: boolean | null;
  is_public: boolean | null;
  challenge: string | null;
  solution: string | null;
  results: string[] | null;
  metrics: Record<string, unknown> | null;
  client_name: string | null;
  client_industry: string | null;
  completed_at: string | null;
  created_at: string | null;
}

export interface PortfolioFilters {
  category: string | null;
  technologies: string[];
  search: string;
  sortBy: 'date' | 'featured' | 'title';
}

export const SERVICE_CATEGORIES = [
  { id: 'programming', label: 'Programmation', icon: 'Code' },
  { id: 'graphics', label: 'Design Graphique', icon: 'Palette' },
  { id: 'content', label: 'Création de Contenu', icon: 'FileText' },
  { id: 'business', label: 'Business', icon: 'Briefcase' },
] as const;

export const TECHNOLOGY_OPTIONS = [
  'React', 'React Native', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL',
  'Firebase', 'Stripe', 'Tailwind CSS', 'TensorFlow', 'Adobe Illustrator',
  'Photoshop', 'InDesign', 'After Effects', 'Premiere Pro', 'DaVinci Resolve',
  'Cinema 4D', 'Framer Motion', 'Sanity CMS', 'Vercel', 'Google Ads',
  'Meta Ads', 'SEMrush', 'HubSpot', 'Analytics', 'Apple HealthKit', 'Google Fit'
] as const;
