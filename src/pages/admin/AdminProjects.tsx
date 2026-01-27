import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, FolderKanban, Eye, Star, Globe, Plus, X, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TECHNOLOGY_OPTIONS } from "@/types/portfolio";

interface Project {
  id: string;
  title: string;
  description: string | null;
  service_category: string;
  status: string;
  budget: number | null;
  deadline: string | null;
  created_at: string;
  client_id: string;
  // Portfolio fields
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
  profiles?: {
    full_name: string;
    email: string;
  };
}

export default function AdminProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState<Partial<Project>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        profiles:profiles!client_id(full_name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    setProjects((data as unknown as Project[]) || []);
    setLoading(false);
  };

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", projectId);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Statut mis à jour"
      });
      loadProjects();
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      demo_url: project.demo_url || '',
      screenshots: project.screenshots || [],
      video_url: project.video_url || '',
      technologies: project.technologies || [],
      is_featured: project.is_featured || false,
      is_public: project.is_public || false,
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || [],
      client_name: project.client_name || '',
      client_industry: project.client_industry || '',
    });
    setEditMode(true);
  };

  const handleSavePortfolio = async () => {
    if (!selectedProject) return;

    setSaving(true);
    const { error } = await supabase
      .from("projects")
      .update({
        demo_url: editData.demo_url || null,
        screenshots: editData.screenshots || [],
        video_url: editData.video_url || null,
        technologies: editData.technologies || [],
        is_featured: editData.is_featured || false,
        is_public: editData.is_public || false,
        challenge: editData.challenge || null,
        solution: editData.solution || null,
        results: editData.results || [],
        client_name: editData.client_name || null,
        client_industry: editData.client_industry || null,
        completed_at: selectedProject.status === 'completed' ? new Date().toISOString() : null,
      })
      .eq("id", selectedProject.id);

    setSaving(false);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Paramètres portfolio mis à jour"
      });
      loadProjects();
      setEditMode(false);
      setSelectedProject(null);
    }
  };

  const addScreenshot = () => {
    setEditData(prev => ({
      ...prev,
      screenshots: [...(prev.screenshots || []), '']
    }));
  };

  const updateScreenshot = (index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      screenshots: prev.screenshots?.map((s, i) => i === index ? value : s) || []
    }));
  };

  const removeScreenshot = (index: number) => {
    setEditData(prev => ({
      ...prev,
      screenshots: prev.screenshots?.filter((_, i) => i !== index) || []
    }));
  };

  const addResult = () => {
    setEditData(prev => ({
      ...prev,
      results: [...(prev.results || []), '']
    }));
  };

  const updateResult = (index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      results: prev.results?.map((r, i) => i === index ? value : r) || []
    }));
  };

  const removeResult = (index: number) => {
    setEditData(prev => ({
      ...prev,
      results: prev.results?.filter((_, i) => i !== index) || []
    }));
  };

  const toggleTechnology = (tech: string) => {
    setEditData(prev => ({
      ...prev,
      technologies: prev.technologies?.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...(prev.technologies || []), tech]
    }));
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-600",
      in_progress: "bg-blue-500/10 text-blue-600",
      completed: "bg-green-500/10 text-green-600",
      cancelled: "bg-red-500/10 text-red-600"
    };
    return colors[status] || "bg-gray-500/10 text-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Gestion des Projets</h1>
        <p className="text-muted-foreground">
          {projects.length} projets au total • {projects.filter(p => p.is_public).length} publics
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FolderKanban className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    {project.is_featured && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                    {project.is_public && (
                      <Globe className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{project.service_category}</Badge>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    {project.budget && (
                      <Badge variant="secondary">
                        {project.budget.toLocaleString()} MAD
                      </Badge>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-600">
                        {project.technologies.length} techs
                      </Badge>
                    )}
                  </div>

                  {project.client_name && (
                    <div className="text-sm text-muted-foreground">
                      Client: <span className="font-medium">{project.client_name}</span>
                      {project.client_industry && ` • ${project.client_industry}`}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-2">
                    Créé le {new Date(project.created_at).toLocaleDateString()}
                    {project.deadline && ` • Échéance: ${new Date(project.deadline).toLocaleDateString()}`}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Select
                    value={project.status}
                    onValueChange={(value) => handleStatusChange(project.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProject(project)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Portfolio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun projet pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Portfolio Edit Dialog */}
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Paramètres Portfolio - {selectedProject?.title}</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] pr-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="media">Médias</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                {/* Visibility Settings */}
                <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is_public"
                      checked={editData.is_public || false}
                      onCheckedChange={(checked) => 
                        setEditData(prev => ({ ...prev, is_public: !!checked }))
                      }
                    />
                    <Label htmlFor="is_public" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Visible au public
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is_featured"
                      checked={editData.is_featured || false}
                      onCheckedChange={(checked) => 
                        setEditData(prev => ({ ...prev, is_featured: !!checked }))
                      }
                    />
                    <Label htmlFor="is_featured" className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Projet en vedette
                    </Label>
                  </div>
                </div>

                {/* Client Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nom du client (public)</Label>
                    <Input
                      value={editData.client_name || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="Ex: Maison Luxe"
                    />
                  </div>
                  <div>
                    <Label>Industrie</Label>
                    <Input
                      value={editData.client_industry || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, client_industry: e.target.value }))}
                      placeholder="Ex: Mode & Luxe"
                    />
                  </div>
                </div>

                {/* Demo URL */}
                <div>
                  <Label>URL de démo</Label>
                  <Input
                    value={editData.demo_url || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, demo_url: e.target.value }))}
                    placeholder="https://demo.example.com"
                    type="url"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <Label className="mb-2 block">Technologies utilisées</Label>
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
                    {TECHNOLOGY_OPTIONS.map((tech) => (
                      <Badge
                        key={tech}
                        variant={editData.technologies?.includes(tech) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleTechnology(tech)}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4 mt-4">
                {/* Video URL */}
                <div>
                  <Label>URL vidéo (YouTube embed)</Label>
                  <Input
                    value={editData.video_url || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, video_url: e.target.value }))}
                    placeholder="https://www.youtube.com/embed/..."
                    type="url"
                  />
                </div>

                {/* Screenshots */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Captures d'écran</Label>
                    <Button variant="outline" size="sm" onClick={addScreenshot}>
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editData.screenshots?.map((url, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={url}
                          onChange={(e) => updateScreenshot(index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          type="url"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeScreenshot(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {(!editData.screenshots || editData.screenshots.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Aucune capture d'écran ajoutée
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                {/* Challenge */}
                <div>
                  <Label>Défi</Label>
                  <Textarea
                    value={editData.challenge || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, challenge: e.target.value }))}
                    placeholder="Quel était le défi principal du projet ?"
                    rows={3}
                  />
                </div>

                {/* Solution */}
                <div>
                  <Label>Solution</Label>
                  <Textarea
                    value={editData.solution || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, solution: e.target.value }))}
                    placeholder="Comment avez-vous résolu ce défi ?"
                    rows={3}
                  />
                </div>

                {/* Results */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Résultats</Label>
                    <Button variant="outline" size="sm" onClick={addResult}>
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editData.results?.map((result, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={result}
                          onChange={(e) => updateResult(index, e.target.value)}
                          placeholder="Ex: +250% de conversions"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeResult(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {(!editData.results || editData.results.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Aucun résultat ajouté
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Annuler
            </Button>
            <Button onClick={handleSavePortfolio} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
