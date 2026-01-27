import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { name: "Programmation & Technologie", path: "/services/programming" },
    { name: "Design & Graphisme", path: "/services/graphics" },
    { name: "Contenu & Marketing", path: "/services/content" },
    { name: "Business & Data", path: "/services/business" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" aria-label="Retour à l'accueil BrandHub.ma">
            <img
              src={logo}
              alt="BrandHub.ma Logo - Agence Digitale Premium"
              className="w-10 h-10 transition-smooth group-hover:scale-110"
              width="40"
              height="40"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BrandHub.ma
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navigation principale">
            <Link to="/" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Accueil
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-base font-medium min-h-[44px]"
                aria-label="Menu des services"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-elegant border border-border overflow-hidden animate-fade-in"
                  role="menu"
                  aria-label="Sous-menu des services"
                >
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-3 hover:bg-muted transition-base text-sm min-h-[44px] flex items-center"
                      role="menuitem"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Blog
            </Link>

            <Link to="/contact" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              asChild
              aria-label="Se connecter à votre compte"
              className="min-h-[44px] min-w-[44px]"
            >
              <Link to="/auth">Connexion</Link>
            </Button>
            <Button
              className="gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold min-h-[44px] min-w-[44px]"
              asChild
            >
              <a
                href="https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20depuis%20le%20menu%20de%20navigation."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Obtenir un devis gratuit via WhatsApp"
              >
                Devis Gratuit
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav id="mobile-menu" className="md:hidden py-4 animate-fade-in" aria-label="Navigation mobile">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>

              <div className="space-y-2">
                <button
                  className="flex items-center space-x-1 text-foreground font-medium w-full min-h-[44px]"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-label="Menu des services"
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {servicesOpen && (
                  <div className="pl-4 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block text-sm text-muted-foreground hover:text-primary transition-base min-h-[44px] flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <Button
                className="gradient-accent text-foreground font-semibold w-full min-h-[48px]"
                asChild
              >
                <a
                  href="https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20depuis%20le%20menu%20mobile."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Obtenir un devis gratuit via WhatsApp"
                >
                  Devis Gratuit
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full min-h-[48px]"
                asChild
                aria-label="Se connecter à votre compte"
              >
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  Connexion
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
