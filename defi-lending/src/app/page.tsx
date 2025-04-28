import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, DollarSign, TrendingUp, Wallet } from "lucide-react"
import { AssetCard } from "@/components/asset-card"
import { StatsCard } from "@/components/stats-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Wallet className="h-6 w-6" />
            <span>DeFi Lending</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Accueil
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Tableau de bord
            </Link>
            <Link href="/markets" className="text-sm font-medium">
              Marchés
            </Link>
            <Link href="/faq" className="text-sm font-medium">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline">Se connecter</Button>
            <Button>Connecter Wallet</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Prêtez et Empruntez en Toute Décentralisation
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Accédez à une plateforme de prêt décentralisée sécurisée par la blockchain. Gagnez des intérêts en
                  prêtant vos actifs ou empruntez contre vos garanties.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Commencer à prêter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Explorer les marchés
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Actifs Disponibles</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explorez les actifs disponibles pour le prêt et l emprunt sur notre plateforme.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AssetCard
                name="Ethereum"
                symbol="ETH"
                supplyApy="3.2%"
                borrowApy="5.8%"
                totalSupply="$45.2M"
                totalBorrow="$32.1M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
              <AssetCard
                name="Bitcoin"
                symbol="BTC"
                supplyApy="2.8%"
                borrowApy="4.9%"
                totalSupply="$78.5M"
                totalBorrow="$52.3M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
              <AssetCard
                name="USD Coin"
                symbol="USDC"
                supplyApy="4.5%"
                borrowApy="6.2%"
                totalSupply="$62.7M"
                totalBorrow="$41.8M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
              <AssetCard
                name="Tether"
                symbol="USDT"
                supplyApy="4.3%"
                borrowApy="6.0%"
                totalSupply="$58.9M"
                totalBorrow="$39.2M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
              <AssetCard
                name="Solana"
                symbol="SOL"
                supplyApy="3.9%"
                borrowApy="5.5%"
                totalSupply="$25.4M"
                totalBorrow="$18.7M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
              <AssetCard
                name="Avalanche"
                symbol="AVAX"
                supplyApy="3.7%"
                borrowApy="5.3%"
                totalSupply="$18.2M"
                totalBorrow="$12.5M"
                iconUrl="/placeholder.svg?height=40&width=40"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment ça fonctionne</h2>
                <p className="text-muted-foreground md:text-xl">
                  Notre plateforme de prêt décentralisée utilise des contrats intelligents pour faciliter les prêts et
                  les emprunts sans intermédiaires.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        1
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Connectez votre wallet</h3>
                      <p className="text-sm text-muted-foreground">
                        Connectez votre portefeuille crypto pour accéder à la plateforme.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Déposez des actifs</h3>
                      <p className="text-sm text-muted-foreground">
                        Déposez vos actifs cryptographiques pour commencer à gagner des intérêts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Empruntez ou prêtez</h3>
                      <p className="text-sm text-muted-foreground">
                        Utilisez vos actifs comme garantie pour emprunter ou gagnez des intérêts en prêtant.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        4
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Gérez vos positions</h3>
                      <p className="text-sm text-muted-foreground">
                        Suivez et gérez vos positions de prêt et d emprunt via le tableau de bord.
                      </p>
                    </div>
                  </li>
                </ul>
                <Button className="mt-4">En savoir plus</Button>
              </div>
              <div className="rounded-lg overflow-hidden border bg-background p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Simulateur de Prêt</h3>
                    <p className="text-sm text-muted-foreground">
                      Calculez vos gains potentiels en prêtant vos actifs.
                    </p>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Simulation de Prêt</CardTitle>
                      <CardDescription>Estimez vos rendements annuels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Montant du dépôt</span>
                            <span className="text-sm font-medium">10,000 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">APY</span>
                            <span className="text-sm font-medium">4.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Durée</span>
                            <span className="text-sm font-medium">12 mois</span>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-medium">
                            <span>Intérêts estimés</span>
                            <span className="text-primary">450 USDC</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Commencer à prêter</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Wallet className="h-5 w-5" />
            <span>DeFi Lending</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} DeFi Lending. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Conditions d utilisation
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
