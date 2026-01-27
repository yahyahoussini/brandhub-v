import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Save, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApiKey {
  name: string;
  key: string;
  description: string;
  category: string;
}

export default function AdminApiKeys() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { name: "PERPLEXITY_API_KEY", key: "", description: "Pour la génération de contenu SEO", category: "content" },
    { name: "GEMINI_API_KEY", key: "", description: "Google Gemini AI pour génération de contenu", category: "ai" },
    { name: "OPENAI_API_KEY", key: "", description: "Pour les outils IA", category: "ai" },
    { name: "META_ACCESS_TOKEN", key: "", description: "Facebook/Instagram Ads", category: "marketing" },
    { name: "WHATSAPP_API_KEY", key: "", description: "WhatsApp Business API", category: "marketing" },
    { name: "LINKEDIN_API_KEY", key: "", description: "LinkedIn API", category: "marketing" },
    { name: "STRIPE_SECRET_KEY", key: "", description: "Paiements Stripe", category: "payment" },
    { name: "RESEND_API_KEY", key: "", description: "Envoi d'emails", category: "email" },
    { name: "GOOGLE_SEARCH_CONSOLE_KEY", key: "", description: "Google Search Console", category: "seo" },
  ]);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load all saved keys from localStorage
    const initialKeys: ApiKey[] = [
      { name: "PERPLEXITY_API_KEY", key: "", description: "Pour la génération de contenu SEO", category: "content" },
      { name: "GEMINI_API_KEY", key: "", description: "Google Gemini AI pour génération de contenu", category: "ai" },
      { name: "OPENAI_API_KEY", key: "", description: "Pour les outils IA", category: "ai" },
      { name: "META_ACCESS_TOKEN", key: "", description: "Facebook/Instagram Ads", category: "marketing" },
      { name: "WHATSAPP_API_KEY", key: "", description: "WhatsApp Business API", category: "marketing" },
      { name: "LINKEDIN_API_KEY", key: "", description: "LinkedIn API", category: "marketing" },
      { name: "STRIPE_SECRET_KEY", key: "", description: "Paiements Stripe", category: "payment" },
      { name: "RESEND_API_KEY", key: "", description: "Envoi d'emails", category: "email" },
      { name: "GOOGLE_SEARCH_CONSOLE_KEY", key: "", description: "Google Search Console", category: "seo" },
    ];

    const loadedKeys = initialKeys.map(apiKey => {
      const saved = localStorage.getItem(apiKey.name);
      return saved ? { ...apiKey, key: saved } : apiKey;
    });

    setApiKeys(loadedKeys);
  }, []);

  const handleSaveKey = (keyName: string, value: string) => {
    localStorage.setItem(keyName, value);
    setApiKeys(prev => prev.map(k => 
      k.name === keyName ? { ...k, key: value } : k
    ));
    toast({
      title: "Clé API sauvegardée",
      description: `${keyName} a été sauvegardée avec succès`
    });
  };

  const toggleVisibility = (keyName: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyName)) {
        newSet.delete(keyName);
      } else {
        newSet.add(keyName);
      }
      return newSet;
    });
  };

  const keysByCategory = {
    content: apiKeys.filter(k => k.category === "content"),
    ai: apiKeys.filter(k => k.category === "ai"),
    marketing: apiKeys.filter(k => k.category === "marketing"),
    payment: apiKeys.filter(k => k.category === "payment"),
    email: apiKeys.filter(k => k.category === "email"),
    seo: apiKeys.filter(k => k.category === "seo"),
  };

  const renderKeyInput = (apiKey: ApiKey) => (
    <Card key={apiKey.name} className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Key className="mr-2 w-5 h-5" />
          {apiKey.name.replace(/_/g, " ")}
        </CardTitle>
        <CardDescription>{apiKey.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type={visibleKeys.has(apiKey.name) ? "text" : "password"}
                value={apiKey.key}
                onChange={(e) => {
                  const value = e.target.value;
                  setApiKeys(prev => prev.map(k => 
                    k.name === apiKey.name ? { ...k, key: value } : k
                  ));
                }}
                placeholder={`Entrez votre ${apiKey.name}`}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleVisibility(apiKey.name)}
            >
              {visibleKeys.has(apiKey.name) ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={() => handleSaveKey(apiKey.name, apiKey.key)}
              disabled={!apiKey.key}
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Gestion des API Keys</h1>
        <p className="text-muted-foreground">
          Configurez vos clés API pour activer les différentes intégrations
        </p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="ai">IA</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="payment">Paiement</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 mt-6">
          {keysByCategory.content.map(renderKeyInput)}
        </TabsContent>

        <TabsContent value="ai" className="space-y-4 mt-6">
          {keysByCategory.ai.map(renderKeyInput)}
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4 mt-6">
          {keysByCategory.marketing.map(renderKeyInput)}
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-6">
          {keysByCategory.payment.map(renderKeyInput)}
        </TabsContent>

        <TabsContent value="email" className="space-y-4 mt-6">
          {keysByCategory.email.map(renderKeyInput)}
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 mt-6">
          {keysByCategory.seo.map(renderKeyInput)}
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Note de Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ⚠️ Les clés API sont stockées localement dans votre navigateur. Pour une utilisation en production,
            il est recommandé de les stocker de manière sécurisée côté serveur via Supabase Edge Functions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}