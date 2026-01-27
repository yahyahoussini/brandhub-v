import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { FaReddit } from "react-icons/fa";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="BrandHub.ma Logo - Agence Digitale Premium"
                className="w-10 h-10"
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
              />
              <span className="text-xl font-bold">BrandHub.ma</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Votre partenaire de confiance pour des solutions de branding complètes au Maroc.
            </p>
            <nav className="flex space-x-4" aria-label="Réseaux sociaux">
              <a
                href="https://www.instagram.com/brandhub.ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-base min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/brandhub-ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-base min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Suivez-nous sur LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.reddit.com/r/BrandHUB_maroc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-base min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Rejoignez-nous sur Reddit"
              >
                <FaReddit className="w-5 h-5" aria-hidden="true" />
              </a>
            </nav>
          </div>

          {/* Services */}
          <nav aria-label="Nos services">
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/programming" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Programmation & Tech
                </Link>
              </li>
              <li>
                <Link to="/services/graphics" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Design & Graphisme
                </Link>
              </li>
              <li>
                <Link to="/services/content" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Contenu & Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/business" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Business & Data
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="À propos de l'entreprise">
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-base inline-block min-h-[32px] flex items-center">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center space-x-2 min-h-[32px]">
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+212703026422" className="hover:text-accent transition-base" aria-label="Appelez-nous au +212 703 026 422">
                  +212 607 076 940
                </a>
              </li>
              <li className="flex items-center space-x-2 min-h-[32px]">
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:contact@brandhub.ma" className="hover:text-accent transition-base" aria-label="Envoyez-nous un email à contact@brandhub.ma">
                  contact@brandhub.ma
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {currentYear} BrandHub.ma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
