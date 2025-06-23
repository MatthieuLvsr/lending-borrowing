import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { ReactNode } from "react";

export const StatSection = () => {
  return (
    <section className="w-full flex flex-col min-h-[80vh] items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Statistiques du Marché</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Découvrez les dernières statistiques de notre plateforme de prêt décentralisée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            <StatsCard
              title="Valeur Totale Verrouillée"
              value="$245.8M"
              change="+5.25%"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <StatsCard
              title="Volume de Prêts"
              value="$78.3M"
              change="+2.4%"
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <StatsCard
              title="Utilisateurs Actifs"
              value="12,450"
              change="+12.3%"
              icon={<Wallet className="h-4 w-4" />}
            />
            <StatsCard title="APY Moyen" value="4.8%" change="+0.2%" icon={<TrendingUp className="h-4 w-4" />} />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
  changeNegative?: boolean
}

export function StatsCard({ title, value, change, icon, changeNegative = false }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeNegative ? "text-red-500" : "text-green-500"} flex items-center`}>{change}</p>
      </CardContent>
    </Card>
  )
}
