import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, Users, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LocationSpain = () => {
  return (
    <>
      <Helmet>
        <title>Agencia Web España | Desarrollo Web & Branding en Madrid, Barcelona, Valencia</title>
        <meta name="description" content="Agencia de desarrollo web en España especializada en branding, diseño gráfico y marketing digital. Servicios para PYMES en Madrid, Barcelona, Valencia y toda España." />
        <meta name="keywords" content="agencia web españa, desarrollo web españa, branding españa, diseño gráfico españa, marketing digital españa, creación sitio web madrid, agencia digital barcelona, desarrollador web valencia" />
        <link rel="canonical" href="https://yourdomain.com/espana" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">España</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Agencia de Desarrollo Web y Branding en España
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Tu socio digital en España para desarrollo web, branding, diseño gráfico y marketing digital.
                Acompañamos PYMES y grandes empresas en Madrid, Barcelona, Valencia y toda España en su transformación digital.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-accent" asChild>
                  <a href="https://wa.me/212703026422?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios%20en%20Espa%C3%B1a.%20Les%20contacto%20desde%20su%20p%C3%A1gina%20de%20Espa%C3%B1a." target="_blank" rel="noopener noreferrer">
                    Contáctanos en España
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services/programming">
                    Nuestros Servicios en España
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services en España */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros Servicios de Desarrollo Web en España
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Soluciones digitales completas para empresas españolas en Madrid, Barcelona, Valencia, Sevilla y toda España
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Desarrollo Web España</h3>
                  <p className="text-muted-foreground">
                    Creación de sitios web profesionales, e-commerce y aplicaciones web a medida para empresas españolas.
                    Tecnologías modernas y SEO optimizado para el mercado español.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Branding & Diseño Gráfico</h3>
                  <p className="text-muted-foreground">
                    Creación de identidad visual, diseño de logotipos, carta gráfica y soportes de marketing para marcas españolas.
                    Diseño que captura la esencia de tu empresa en España.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Marketing Digital España</h3>
                  <p className="text-muted-foreground">
                    Estrategias SEO, publicidad Google Ads, gestión de redes sociales y content marketing para empresas en España.
                    Aumenta tu visibilidad online en el mercado español.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Consultoría Estrategia Digital</h3>
                  <p className="text-muted-foreground">
                    Acompañamiento estratégico para la transformación digital de tu empresa en España.
                    Análisis, auditoría y recomendaciones personalizadas.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">E-commerce España</h3>
                  <p className="text-muted-foreground">
                    Tiendas online completas con pasarela de pago segura adaptada al mercado español.
                    Soluciones WooCommerce, Shopify y desarrollo a medida.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Aplicaciones Web & Móvil</h3>
                  <p className="text-muted-foreground">
                    Desarrollo de aplicaciones web progresivas (PWA) y aplicaciones móviles para iOS y Android
                    para empresas españolas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ciudades Principales */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Presentes en Todas las Ciudades de España
              </h2>
              <p className="text-xl text-muted-foreground">
                Nuestros servicios de desarrollo web y branding están disponibles en toda España
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "Madrid", "Barcelona", "Valencia", "Sevilla",
                "Zaragoza", "Málaga", "Murcia", "Palma",
                "Bilbao", "Alicante", "Córdoba", "Valladolid"
              ].map((city) => (
                <Card key={city} className="text-center shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">{city}</h3>
                    <p className="text-sm text-muted-foreground">Desarrollo Web</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué Elegir Nuestra Agencia */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                ¿Por Qué Elegir Nuestra Agencia Web en España?
              </h2>

              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Experiencia en el Mercado Español</h3>
                        <p className="text-muted-foreground">
                          Conocimiento profundo del mercado español, comportamientos de consumidores y especificidades
                          culturales para soluciones digitales adaptadas a empresas españolas.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Tecnologías de Vanguardia</h3>
                        <p className="text-muted-foreground">
                          Desarrollo web con las últimas tecnologías: React, Node.js, WordPress, Shopify.
                          Sitios web rápidos, seguros y optimizados para SEO en España.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Soporte Dedicado</h3>
                        <p className="text-muted-foreground">
                          Equipo disponible en español, soporte reactivo y acompañamiento continuo después de la entrega.
                          Estamos aquí para tu éxito en España.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Precios Competitivos</h3>
                        <p className="text-muted-foreground">
                          Precios transparentes y adaptados al mercado español. Excelente relación calidad-precio para servicios
                          de desarrollo web y branding profesionales.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Contacta con Nuestra Agencia en España
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Teléfono</h3>
                    <a href="tel:+212703026422" className="text-muted-foreground hover:text-primary">
                      +212 607 076 940
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Email</h3>
                    <a href="mailto:contact@youragency.com" className="text-muted-foreground hover:text-primary">
                      contact@youragency.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">WhatsApp</h3>
                    <a
                      href="https://wa.me/212703026422?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20ustedes%20sobre%20sus%20servicios%20en%20Espa%C3%B1a."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Chat Directo
                    </a>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-muted-foreground">
                Agencia de desarrollo web y branding al servicio de empresas españolas desde hace varios años.
                Transforma tu presencia digital en España con nuestras soluciones profesionales.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LocationSpain;
