import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Conditions d'Utilisation
            </h1>
            <p className="text-muted-foreground text-center mb-12">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptation des Conditions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En accédant et en utilisant ce site web, vous acceptez d'être lié par ces Conditions d'Utilisation,
                  toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de
                  toutes les lois locales applicables. Si vous n'acceptez pas l'une de ces conditions, vous n'êtes pas
                  autorisé à utiliser ou accéder à ce site.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Utilisation du Site</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ce site web et son contenu sont fournis pour votre usage personnel et commercial sous réserve des
                  restrictions suivantes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Vous ne devez pas modifier ou copier les matériaux sans autorisation</li>
                  <li>Vous ne devez pas utiliser les matériaux à des fins commerciales non autorisées</li>
                  <li>Vous ne devez pas tenter de décompiler ou de désosser tout logiciel contenu sur ce site</li>
                  <li>Vous ne devez pas supprimer les mentions de droits d'auteur ou autres mentions de propriété</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Services Proposés</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous nous efforçons de fournir des descriptions précises de nos services. Cependant, nous ne garantissons
                  pas que les descriptions ou tout autre contenu de ce site sont exacts, complets, fiables, actuels ou
                  exempts d'erreurs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les tarifs affichés sont indicatifs et peuvent varier en fonction des spécifications exactes de votre projet.
                  Un devis personnalisé vous sera fourni après étude de vos besoins.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Propriété Intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tout le contenu de ce site, y compris mais sans s'y limiter, le texte, les graphiques, les logos,
                  les images, ainsi que la compilation de ceux-ci, est la propriété de notre entreprise ou de ses
                  fournisseurs de contenu et est protégé par les lois marocaines et internationales sur les droits d'auteur.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Pour les projets réalisés pour nos clients, les droits de propriété intellectuelle sont transférés
                  au client après paiement intégral, sauf accord contraire spécifié dans le contrat de service.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Limitation de Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En aucun cas, notre entreprise ou ses fournisseurs ne seront responsables de tout dommage (y compris,
                  sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption
                  d'activité) découlant de l'utilisation ou de l'incapacité d'utiliser les matériaux sur notre site web.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Confidentialité</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous nous engageons à protéger votre vie privée. Toutes les informations personnelles collectées
                  via notre site ou nos services sont traitées conformément à notre politique de confidentialité et
                  aux lois applicables sur la protection des données.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les informations relatives à vos projets sont strictement confidentielles et ne seront pas partagées
                  avec des tiers sans votre consentement explicite.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Conditions de Paiement</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pour tous nos services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Un acompte de 50% est requis avant le début des travaux</li>
                  <li>Le solde est dû à la livraison finale du projet</li>
                  <li>Les tarifs sont exprimés en Dirham Marocain (MAD)</li>
                  <li>Les délais de livraison commencent après réception de l'acompte et validation du brief</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Révisions et Modifications</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Le nombre de révisions incluses dépend du forfait choisi. Les révisions supplémentaires seront
                  facturées selon un tarif horaire qui vous sera communiqué.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les demandes de modifications majeures dépassant le cadre du brief initial peuvent entraîner
                  une révision du devis et des délais de livraison.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Annulation et Remboursement</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Les acomptes versés ne sont pas remboursables une fois les travaux commencés. En cas d'annulation
                  de votre part, les sommes déjà versées restent acquises en compensation du temps et des ressources
                  déjà engagées.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Modifications des Conditions</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous nous réservons le droit de réviser ces conditions d'utilisation à tout moment sans préavis.
                  En utilisant ce site web, vous acceptez d'être lié par la version actuelle de ces Conditions d'Utilisation.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Téléphone: <a href="tel:+212703026422" className="text-primary hover:underline">+212 703 026 422</a></p>
                  <p>WhatsApp: <a href="https://wa.me/212703026422" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+212 703 026 422</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
