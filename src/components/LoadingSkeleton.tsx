import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => (
  <div className="relative pt-20 h-[500px] bg-muted/20" role="status" aria-label="Chargement du contenu principal">
    <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
      <Skeleton className="h-16 w-3/4 max-w-2xl mb-6" />
      <Skeleton className="h-8 w-2/3 max-w-xl mb-8" />
      <div className="flex gap-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
    <span className="sr-only">Chargement en cours...</span>
  </div>
);

export const ServicesSkeleton = () => (
  <section className="py-20 bg-background" role="status" aria-label="Chargement des services">
    <div className="container mx-auto px-4">
      <Skeleton className="h-12 w-64 mx-auto mb-4" />
      <Skeleton className="h-6 w-96 mx-auto mb-12" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-lg bg-card">
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
    <span className="sr-only">Chargement en cours...</span>
  </section>
);

export const TestimonialsSkeleton = () => (
  <section className="py-20 bg-muted/20" role="status" aria-label="Chargement des témoignages">
    <div className="container mx-auto px-4">
      <Skeleton className="h-12 w-64 mx-auto mb-12" />
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-lg bg-card">
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <span className="sr-only">Chargement en cours...</span>
  </section>
);

export const ContentSkeleton = () => (
  <div className="py-20" role="status" aria-label="Chargement du contenu">
    <div className="container mx-auto px-4">
      <Skeleton className="h-10 w-64 mb-6" />
      <Skeleton className="h-6 w-full mb-4" />
      <Skeleton className="h-6 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-4" />
    </div>
    <span className="sr-only">Chargement en cours...</span>
  </div>
);
