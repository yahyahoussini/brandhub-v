import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import type { PortfolioFilters as FiltersType } from '@/types/portfolio';
import { SERVICE_CATEGORIES } from '@/types/portfolio';

interface PortfolioFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  availableTechnologies: string[];
}

export function PortfolioFilters({ 
  filters, 
  onFiltersChange, 
  availableTechnologies 
}: PortfolioFiltersProps) {
  const updateFilter = <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTechnology = (tech: string) => {
    const newTechs = filters.technologies.includes(tech)
      ? filters.technologies.filter(t => t !== tech)
      : [...filters.technologies, tech];
    updateFilter('technologies', newTechs);
  };

  const clearFilters = () => {
    onFiltersChange({
      category: null,
      technologies: [],
      search: '',
      sortBy: 'date',
    });
  };

  const hasActiveFilters = filters.category || filters.technologies.length > 0 || filters.search;

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un projet..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>

        {/* Technology Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 min-w-[140px]">
              <Filter className="w-4 h-4" />
              Technologies
              {filters.technologies.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {filters.technologies.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableTechnologies.map((tech) => (
                <label 
                  key={tech}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1.5 rounded"
                >
                  <Checkbox
                    checked={filters.technologies.includes(tech)}
                    onCheckedChange={() => toggleTechnology(tech)}
                  />
                  <span className="text-sm">{tech}</span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort */}
        <Select value={filters.sortBy} onValueChange={(v) => updateFilter('sortBy', v as FiltersType['sortBy'])}>
          <SelectTrigger className="w-[160px] bg-card/50 border-border/50">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Plus récents</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="title">Alphabétique</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.category === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateFilter('category', null)}
          className="rounded-full"
        >
          Tous
        </Button>
        {SERVICE_CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            variant={filters.category === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateFilter('category', cat.id)}
            className="rounded-full"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              "{filters.search}"
              <button onClick={() => updateFilter('search', '')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="gap-1">
              {tech}
              <button onClick={() => toggleTechnology(tech)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            Tout effacer
          </Button>
        </div>
      )}
    </div>
  );
}
