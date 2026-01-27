import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Edit, Trash2, Loader2, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  title: string;
  description: string | null;
  category: string;
  icon: string | null;
  price_starting: number | null;
  features: string[] | null;
  is_active: boolean;
}

export default function AdminServices() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("category", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les services",
        variant: "destructive"
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description || "");
    setCategory(service.category);
    setIcon(service.icon || "");
    setPrice(service.price_starting?.toString() || "");
    setIsActive(service.is_active);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!title || !category) {
      toast({
        title: "Erreur",
        description: "Titre et catégorie sont requis",
        variant: "destructive"
      });
      return;
    }

    const serviceData = {
      title,
      description,
      category,
      icon,
      price_starting: price ? parseFloat(price) : null,
      is_active: isActive
    };

    let error;
    if (editingService) {
      ({ error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingService.id));
    } else {
      ({ error } = await supabase
        .from("services")
        .insert([serviceData]));
    }

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: editingService ? "Service mis à jour" : "Service créé"
      });
      resetForm();
      await loadServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Service supprimé"
      });
      await loadServices();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setIcon("");
    setPrice("");
    setIsActive(true);
    setEditingService(null);
    setIsEditing(false);
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      programming: "bg-blue-500/10 text-blue-600",
      graphics: "bg-purple-500/10 text-purple-600",
      content: "bg-orange-500/10 text-orange-600",
      business: "bg-green-500/10 text-green-600"
    };
    return colors[cat] || "bg-gray-500/10 text-gray-600";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Gestion des Services</h1>
          <p className="text-muted-foreground">
            {services.length} services au total
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Package className="w-8 h-8 text-primary" />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/admin/services/${service.id}`)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(service.category)}>
                  {service.category}
                </Badge>
                <Badge variant={service.is_active ? "default" : "secondary"}>
                  {service.is_active ? "Actif" : "Inactif"}
                </Badge>
                {service.price_starting && (
                  <Badge variant="outline">
                    À partir de {service.price_starting} MAD
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun service pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Modifier le Service" : "Nouveau Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre du service"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programmation</SelectItem>
                  <SelectItem value="graphics">Graphisme</SelectItem>
                  <SelectItem value="content">Contenu</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du service"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icône (Lucide)</Label>
                <Input
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Code"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix de départ (MAD)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active">Service actif</Label>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSave} className="flex-1">
                {editingService ? "Mettre à jour" : "Créer"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}