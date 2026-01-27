import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { PortfolioProject, PortfolioFilters } from '@/types/portfolio';

export function usePortfolio(filters: PortfolioFilters) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('is_public', true)
          .eq('status', 'completed')
          .order('is_featured', { ascending: false })
          .order('completed_at', { ascending: false });

        if (fetchError) throw fetchError;

        // Type assertion since we know these fields now exist
        setProjects((data as unknown as PortfolioProject[]) || []);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Erreur lors du chargement du portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by category
    if (filters.category) {
      result = result.filter(p => p.service_category === filters.category);
    }

    // Filter by technologies
    if (filters.technologies.length > 0) {
      result = result.filter(p =>
        filters.technologies.some(tech =>
          p.technologies?.includes(tech)
        )
      );
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.client_name?.toLowerCase().includes(searchLower) ||
        p.technologies?.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'featured':
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date':
      default:
        result.sort((a, b) => {
          const dateA = a.completed_at ? new Date(a.completed_at).getTime() : 0;
          const dateB = b.completed_at ? new Date(b.completed_at).getTime() : 0;
          return dateB - dateA;
        });
    }

    return result;
  }, [projects, filters]);

  const featuredProjects = useMemo(() =>
    projects.filter(p => p.is_featured).slice(0, 6),
    [projects]
  );

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(p => {
      p.technologies?.forEach(t => techSet.add(t));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  return {
    projects: filteredProjects,
    featuredProjects,
    allTechnologies,
    loading,
    error,
  };
}

export function useFeaturedPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_public', true)
          .eq('status', 'completed')
          .order('is_featured', { ascending: false })
          .order('completed_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setProjects((data as unknown as PortfolioProject[]) || []);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { projects, loading };
}
