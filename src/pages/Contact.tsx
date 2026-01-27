import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Save to database
    const { error } = await supabase
      .from("contact_inquiries")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }
      ]);

    setLoading(false);

    if (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message envoyé!",
      description: "Nous vous contacterons bientôt."
    });

    // WhatsApp message formatting
    const whatsappMessage = `Bonjour, je suis ${formData.name}.%0A%0AEmail: ${formData.email}%0ATéléphone: ${formData.phone}%0A%0AMessage:%0A${formData.message}`;
    const whatsappUrl = `https://wa.me/212703026422?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Contactez <span className="gradient-primary bg-clip-text text-transparent">BrandHub.ma</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous sommes là pour répondre à vos questions et discuter de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Adresse</h3>
                  <p className="text-muted-foreground">
                    Casablanca, Maroc
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                  <a href="tel:+212703026422" className="text-primary hover:underline">
                    +212 607 076 940
                  </a>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <a href="mailto:contact@brandhub.ma" className="text-primary hover:underline">
                    contact@brandhub.ma
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom Complet *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Parlez-nous de votre projet..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold"
                      disabled={loading}
                    >
                      <Send className="mr-2 w-5 h-5" />
                      {loading ? "Envoi..." : "Envoyer le message"}
                    </Button>
                  </form>

                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Votre message sera enregistré et vous serez redirigé vers WhatsApp pour continuer la conversation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Review Form Section */}
          <div className="max-w-2xl mx-auto mt-16 animate-fade-in">
            <ReviewForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
