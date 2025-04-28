import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Wallet } from "lucide-react"
import { MarketTable } from "@/components/market-table"

export default function MarketsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Wallet className="h-6 w-6" />
            <span>DeFi Lending</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              0x1a2...3b4c
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Marchés</h1>
            <p className="text-muted-foreground">Explorez les actifs disponibles pour le prêt et l emprunt</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Tous les Marchés</CardTitle>
                  <CardDescription>Consultez les taux et les liquidités de tous les actifs</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Rechercher un actif..." className="w-full pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="stablecoins">Stablecoins</TabsTrigger>
                  <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                  <TabsTrigger value="other">Autres</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <MarketTable />
                </TabsContent>
                <TabsContent value="stablecoins">
                  <MarketTable filter="stablecoins" />
                </TabsContent>
                <TabsContent value="ethereum">
                  <MarketTable filter="ethereum" />
                </TabsContent>
                <TabsContent value="other">
                  <MarketTable filter="other" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fournir des Actifs</CardTitle>
                <CardDescription>Gagnez des intérêts en fournissant des actifs à la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Lorsque vous fournissez des actifs à notre plateforme, vous recevez des jetons représentatifs qui
                    accumulent des intérêts en temps réel. Ces jetons peuvent être utilisés comme garantie pour
                    emprunter d autres actifs.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Liquidité totale fournie</span>
                      <span className="text-sm font-medium">$245.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">APY moyen de fourniture</span>
                      <span className="text-sm font-medium">3.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Nombre de fournisseurs</span>
                      <span className="text-sm font-medium">8,450</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emprunter des Actifs</CardTitle>
                <CardDescription>Empruntez des actifs en utilisant vos dépôts comme garantie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez emprunter des actifs en utilisant vos dépôts comme garantie. Assurez-vous de maintenir
                    un ratio d emprunt sain pour éviter la liquidation. Les taux d emprunt varient en fonction de
                    l utilisation du marché.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Liquidité totale empruntée</span>
                      <span className="text-sm font-medium">$178.3M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">APY moyen d emprunt</span>
                      <span className="text-sm font-medium">5.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ratio d utilisation moyen</span>
                      <span className="text-sm font-medium">72.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Wallet className="h-5 w-5" />
            <span>DeFi Lending</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} DeFi Lending. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
