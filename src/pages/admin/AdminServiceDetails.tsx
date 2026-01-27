import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Service {
  id: string;
  title: string;
  category: string;
}

interface ServiceExample {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_url: string | null;
  display_order: number;
}

interface PricingTier {
  id: string;
  tier_name: string;
  description: string;
  delivery_time: string;
  revisions_count: number;
  price: number;
  details: string[];
}

const AdminServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);
  const [examples, setExamples] = useState<ServiceExample[]>([]);
  const [landingContent, setLandingContent] = useState("");
  const [landingContentId, setLandingContentId] = useState<string | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  
  const [exampleDialog, setExampleDialog] = useState(false);
  const [editingExample, setEditingExample] = useState<ServiceExample | null>(null);
  const [exampleForm, setExampleForm] = useState({
    title: "",
    description: "",
    image_url: "",
    project_url: "",
    display_order: 0
  });

  const [pricingDialog, setPricingDialog] = useState(false);
  const [editingPricing, setEditingPricing] = useState<PricingTier | null>(null);
  const [pricingForm, setPricingForm] = useState({
    tier_name: "basic",
    description: "",
    delivery_time: "",
    revisions_count: 0,
    price: 0,
    details: [""]
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    const [serviceRes, examplesRes, landingRes, pricingRes] = await Promise.all([
      supabase.from("services").select("id, title, category").eq("id", id).single(),
      supabase.from("service_examples").select("*").eq("service_id", id).order("display_order"),
      supabase.from("service_landing_content").select("*").eq("service_id", id).maybeSingle(),
      supabase.from("service_pricing_tiers").select("*").eq("service_id", id).order("tier_name")
    ]);

    if (serviceRes.data) setService(serviceRes.data);
    if (examplesRes.data) setExamples(examplesRes.data);
    if (landingRes.data) {
      setLandingContent(landingRes.data.content);
      setLandingContentId(landingRes.data.id);
    }
    if (pricingRes.data) setPricingTiers(pricingRes.data);

    setLoading(false);
  };

  const saveLandingContent = async () => {
    if (!id) return;

    const operation = landingContentId
      ? supabase.from("service_landing_content").update({ content: landingContent }).eq("id", landingContentId)
      : supabase.from("service_landing_content").insert({ service_id: id, content: landingContent }).select().single();

    const { data, error } = await operation;

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    if (!landingContentId && data) setLandingContentId(data.id);
    toast({ title: "Succès", description: "Contenu sauvegardé" });
  };

  const saveExample = async () => {
    if (!id) return;

    const exampleData = { ...exampleForm, service_id: id };

    const { error } = editingExample
      ? await supabase.from("service_examples").update(exampleData).eq("id", editingExample.id)
      : await supabase.from("service_examples").insert(exampleData);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Succès", description: "Exemple sauvegardé" });
    setExampleDialog(false);
    resetExampleForm();
    loadData();
  };

  const deleteExample = async (exampleId: string) => {
    if (!confirm("Supprimer cet exemple ?")) return;

    const { error } = await supabase.from("service_examples").delete().eq("id", exampleId);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Succès", description: "Exemple supprimé" });
    loadData();
  };

  const savePricing = async () => {
    if (!id) return;

    const pricingData = { 
      ...pricingForm, 
      service_id: id,
      details: pricingForm.details.filter(d => d.trim())
    };

    const { error } = editingPricing
      ? await supabase.from("service_pricing_tiers").update(pricingData).eq("id", editingPricing.id)
      : await supabase.from("service_pricing_tiers").insert(pricingData);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Succès", description: "Tarif sauvegardé" });
    setPricingDialog(false);
    resetPricingForm();
    loadData();
  };

  const deletePricing = async (pricingId: string) => {
    if (!confirm("Supprimer ce tarif ?")) return;

    const { error } = await supabase.from("service_pricing_tiers").delete().eq("id", pricingId);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Succès", description: "Tarif supprimé" });
    loadData();
  };

  const resetExampleForm = () => {
    setExampleForm({ title: "", description: "", image_url: "", project_url: "", display_order: 0 });
    setEditingExample(null);
  };

  const resetPricingForm = () => {
    setPricingForm({ tier_name: "basic", description: "", delivery_time: "", revisions_count: 0, price: 0, details: [""] });
    setEditingPricing(null);
  };

  const getTierLabel = (tier: string) => {
    const labels: Record<string, string> = {
      basic: "Basique",
      standard: "Standard",
      advanced: "Avancé"
    };
    return labels[tier] || tier;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return <div>Service non trouvé</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/admin/services")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">{service.title}</h1>
        </div>
      </div>

      <Tabs defaultValue="landing" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="landing">Contenu Landing</TabsTrigger>
          <TabsTrigger value="examples">Exemples</TabsTrigger>
          <TabsTrigger value="pricing">Tarification</TabsTrigger>
        </TabsList>

        <TabsContent value="landing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Landing Personnalisée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[400px] bg-background">
                <ReactQuill 
                  theme="snow" 
                  value={landingContent} 
                  onChange={setLandingContent}
                  className="h-[350px]"
                />
              </div>
              <Button onClick={saveLandingContent} className="mt-12">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Exemples de Projets</h2>
            <Dialog open={exampleDialog} onOpenChange={setExampleDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetExampleForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un exemple
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingExample ? "Modifier" : "Ajouter"} un exemple</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Titre</Label>
                    <Input 
                      value={exampleForm.title}
                      onChange={(e) => setExampleForm({...exampleForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={exampleForm.description}
                      onChange={(e) => setExampleForm({...exampleForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>URL Image</Label>
                    <Input 
                      value={exampleForm.image_url}
                      onChange={(e) => setExampleForm({...exampleForm, image_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>URL Projet</Label>
                    <Input 
                      value={exampleForm.project_url}
                      onChange={(e) => setExampleForm({...exampleForm, project_url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label>Ordre d'affichage</Label>
                    <Input 
                      type="number"
                      value={exampleForm.display_order}
                      onChange={(e) => setExampleForm({...exampleForm, display_order: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <Button onClick={saveExample} className="w-full">Sauvegarder</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((example) => (
              <Card key={example.id}>
                <CardContent className="p-4">
                  {example.image_url && (
                    <img src={example.image_url} alt={example.title} className="w-full h-48 object-cover rounded mb-4" />
                  )}
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setEditingExample(example);
                        setExampleForm({
                          title: example.title,
                          description: example.description || "",
                          image_url: example.image_url || "",
                          project_url: example.project_url || "",
                          display_order: example.display_order
                        });
                        setExampleDialog(true);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteExample(example.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plans Tarifaires</h2>
            <Dialog open={pricingDialog} onOpenChange={setPricingDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetPricingForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPricing ? "Modifier" : "Ajouter"} un plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Niveau</Label>
                    <select 
                      className="w-full border rounded p-2"
                      value={pricingForm.tier_name}
                      onChange={(e) => setPricingForm({...pricingForm, tier_name: e.target.value})}
                      disabled={!!editingPricing}
                    >
                      <option value="basic">Basique</option>
                      <option value="standard">Standard</option>
                      <option value="advanced">Avancé</option>
                    </select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={pricingForm.description}
                      onChange={(e) => setPricingForm({...pricingForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Délai de livraison</Label>
                    <Input 
                      value={pricingForm.delivery_time}
                      onChange={(e) => setPricingForm({...pricingForm, delivery_time: e.target.value})}
                      placeholder="Ex: 5 jours"
                    />
                  </div>
                  <div>
                    <Label>Nombre de révisions</Label>
                    <Input 
                      type="number"
                      value={pricingForm.revisions_count}
                      onChange={(e) => setPricingForm({...pricingForm, revisions_count: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label>Prix (MAD)</Label>
                    <Input 
                      type="number"
                      value={pricingForm.price}
                      onChange={(e) => setPricingForm({...pricingForm, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label>Détails (liste)</Label>
                    {pricingForm.details.map((detail, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input 
                          value={detail}
                          onChange={(e) => {
                            const newDetails = [...pricingForm.details];
                            newDetails[index] = e.target.value;
                            setPricingForm({...pricingForm, details: newDetails});
                          }}
                          placeholder="Détail du service"
                        />
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            const newDetails = pricingForm.details.filter((_, i) => i !== index);
                            setPricingForm({...pricingForm, details: newDetails});
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setPricingForm({...pricingForm, details: [...pricingForm.details, ""]})}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un détail
                    </Button>
                  </div>
                  <Button onClick={savePricing} className="w-full">Sauvegarder</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingTiers.map((tier) => (
              <Card key={tier.id}>
                <CardHeader>
                  <CardTitle>{getTierLabel(tier.tier_name)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold">{tier.price.toLocaleString()} MAD</div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Livraison:</strong> {tier.delivery_time}</div>
                    <div><strong>Révisions:</strong> {tier.revisions_count}</div>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm">Inclus:</strong>
                    <ul className="list-disc list-inside text-sm">
                      {tier.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setEditingPricing(tier);
                        setPricingForm({
                          tier_name: tier.tier_name,
                          description: tier.description,
                          delivery_time: tier.delivery_time,
                          revisions_count: tier.revisions_count,
                          price: tier.price,
                          details: tier.details
                        });
                        setPricingDialog(true);
                      }}
                    >
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deletePricing(tier.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminServiceDetails;
