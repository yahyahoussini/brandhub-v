import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, FolderKanban } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  created_at: string;
  projects?: { count: number }[];
}

export default function AdminClients() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        *,
        projects(count)
      `)
      .eq("role", "client")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les clients",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Get emails from auth
    const authResponse = await supabase.auth.admin.listUsers();
    const users = authResponse.data?.users || [];
    
    const clientsWithEmail = (data || []).map(profile => ({
      ...profile,
      email: users.find(u => u.id === profile.id)?.email || "N/A"
    }));
    
    setClients(clientsWithEmail);
    setLoading(false);
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
        <h1 className="text-4xl font-bold mb-2">Gestion des Clients</h1>
        <p className="text-muted-foreground">
          {clients.length} clients au total
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate mb-1">
                    {client.full_name || "Sans nom"}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    
                    {client.company && (
                      <div className="flex items-center">
                        <Badge variant="outline">{client.company}</Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <FolderKanban className="w-4 h-4 mr-2" />
                      <span>
                        {client.projects?.[0]?.count || 0} projet(s)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs">
                      <Calendar className="w-3 h-3 mr-2" />
                      <span>
                        Inscrit le {new Date(client.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {clients.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun client pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}