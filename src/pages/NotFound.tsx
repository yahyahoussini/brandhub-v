import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center pt-20">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page non trouvée</h2>
          <p className="text-muted-foreground mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
          <Button asChild size="lg">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
