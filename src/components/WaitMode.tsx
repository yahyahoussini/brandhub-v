import { Loader2 } from "lucide-react";

export const WaitMode = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Nous Revenons Bientôt
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Notre site est actuellement en maintenance. Merci de votre patience.
          </p>
        </div>
      </div>
    </div>
  );
};
