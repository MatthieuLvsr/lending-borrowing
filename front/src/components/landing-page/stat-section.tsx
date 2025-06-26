import { BarChart3, DollarSign, TrendingUp, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const StatSection = () => {
  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Statistiques du Marché
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Découvrez les dernières statistiques de notre plateforme de prêt
              décentralisée.
            </p>
          </div>
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              change="+5.25%"
              icon={<DollarSign className="h-4 w-4" />}
              title="Valeur Totale Verrouillée"
              value="$245.8M"
            />
            <StatsCard
              change="+2.4%"
              icon={<BarChart3 className="h-4 w-4" />}
              title="Volume de Prêts"
              value="$78.3M"
            />
            <StatsCard
              change="+12.3%"
              icon={<Wallet className="h-4 w-4" />}
              title="Utilisateurs Actifs"
              value="12,450"
            />
            <StatsCard
              change="+0.2%"
              icon={<TrendingUp className="h-4 w-4" />}
              title="APY Moyen"
              value="4.8%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  changeNegative?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  changeNegative = false,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">{value}</div>
        <p
          className={`text-xs ${changeNegative ? 'text-red-500' : 'text-green-500'} flex items-center`}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
