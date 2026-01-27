import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, EyeOff, Trash2, Award, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  position: string | null;
  content: string;
  rating: number;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function AdminTestimonials() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les avis",
        variant: "destructive",
      });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: `Avis ${!currentStatus ? "publié" : "dépublié"}`,
      });
      loadTestimonials();
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_featured: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut vedette",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: `Avis ${!currentStatus ? "mis en vedette" : "retiré de la vedette"}`,
      });
      loadTestimonials();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'avis",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Avis supprimé",
      });
      loadTestimonials();
    }
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Avis Clients</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les avis et témoignages des clients
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  {testimonial.position && testimonial.company && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position} chez {testimonial.company}
                    </p>
                  )}
                  {!testimonial.position && testimonial.company && (
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  )}
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={testimonial.is_published ? "default" : "secondary"}>
                    {testimonial.is_published ? "Publié" : "Non publié"}
                  </Badge>
                  {testimonial.is_featured && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                      <Award className="w-3 h-3 mr-1" />
                      Vedette
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Soumis le {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublish(testimonial.id, testimonial.is_published)}
                  >
                    {testimonial.is_published ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Dépublier
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Publier
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                  >
                    <Award className={`w-4 h-4 mr-2 ${testimonial.is_featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    {testimonial.is_featured ? "Retirer vedette" : "Mettre en vedette"}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(testimonial.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Aucun avis pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
