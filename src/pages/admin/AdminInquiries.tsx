import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Building, Calendar, Loader2, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminInquiries() {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes",
        variant: "destructive"
      });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    const { error } = await supabase
      .from("contact_inquiries")
      .update({ status: newStatus })
      .eq("id", inquiryId);

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
      loadInquiries();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-500/10 text-blue-600",
      contacted: "bg-yellow-500/10 text-yellow-600",
      qualified: "bg-purple-500/10 text-purple-600",
      converted: "bg-green-500/10 text-green-600",
      rejected: "bg-red-500/10 text-red-600"
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
        <h1 className="text-4xl font-bold mb-2">Demandes de Contact</h1>
        <p className="text-muted-foreground">
          {inquiries.length} demandes au total • {inquiries.filter(i => i.status === "new").length} nouvelles
        </p>
      </div>

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">{inquiry.name}</h3>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      {inquiry.email}
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        {inquiry.phone}
                      </div>
                    )}
                    {inquiry.company && (
                      <div className="flex items-center text-muted-foreground">
                        <Building className="w-4 h-4 mr-2" />
                        {inquiry.company}
                      </div>
                    )}
                    {inquiry.service_interest && (
                      <div className="flex items-center">
                        <Badge variant="outline">{inquiry.service_interest}</Badge>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {inquiry.message}
                  </p>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(inquiry.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Select
                    value={inquiry.status}
                    onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nouveau</SelectItem>
                      <SelectItem value="contacted">Contacté</SelectItem>
                      <SelectItem value="qualified">Qualifié</SelectItem>
                      <SelectItem value="converted">Converti</SelectItem>
                      <SelectItem value="rejected">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {inquiries.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune demande pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Inquiry Details Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Nom</h4>
                  <p>{selectedInquiry.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm">{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p>{selectedInquiry.phone}</p>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div>
                    <h4 className="font-semibold mb-1">Entreprise</h4>
                    <p>{selectedInquiry.company}</p>
                  </div>
                )}
              </div>

              {selectedInquiry.service_interest && (
                <div>
                  <h4 className="font-semibold mb-1">Service intéressé</h4>
                  <Badge>{selectedInquiry.service_interest}</Badge>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-1">Message</h4>
                <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-lg">
                  {selectedInquiry.message}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Date de réception</h4>
                <p className="text-sm">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}