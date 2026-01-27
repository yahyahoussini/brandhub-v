import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  company: z.string().trim().max(100, "Le nom de l'entreprise ne peut pas dépasser 100 caractères").optional(),
  position: z.string().trim().max(100, "Le poste ne peut pas dépasser 100 caractères").optional(),
  content: z.string().trim().min(10, "L'avis doit contenir au moins 10 caractères").max(1000, "L'avis ne peut pas dépasser 1000 caractères"),
  rating: z.number().min(1, "Veuillez sélectionner une note").max(5),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      content: "",
      rating: 0,
    },
  });

  const rating = form.watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        name: data.name,
        company: data.company || null,
        position: data.position || null,
        content: data.content,
        rating: data.rating,
        is_published: false,
      });

      if (error) throw error;

      toast({
        title: "Avis soumis avec succès",
        description: "Merci pour votre retour! Votre avis sera publié après modération.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre avis.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle>Laissez-nous votre avis</CardTitle>
        <CardDescription>
          Partagez votre expérience avec nos services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note *</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoveredStar || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet *</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'entreprise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poste</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre poste" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre avis *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Partagez votre expérience avec nos services..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre l'avis"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
