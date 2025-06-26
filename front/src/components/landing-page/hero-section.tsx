import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Prêtez et Empruntez en Toute Décentralisation
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Accédez à une plateforme de prêt décentralisée sécurisée par la
              blockchain. Gagnez des intérêts en prêtant vos actifs ou empruntez
              contre vos garanties.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg">
              Commencer à prêter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Explorer les marchés
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
