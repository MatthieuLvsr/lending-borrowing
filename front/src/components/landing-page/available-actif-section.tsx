import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const AvailableActifSection = () => {
  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-muted py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Actifs Disponibles
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explorez les actifs disponibles pour le prêt et l emprunt sur
              notre plateforme.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AssetCard
            borrowApy="5.8%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="Ethereum"
            supplyApy="3.2%"
            symbol="ETH"
            totalBorrow="$32.1M"
            totalSupply="$45.2M"
          />
          <AssetCard
            borrowApy="4.9%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="Bitcoin"
            supplyApy="2.8%"
            symbol="BTC"
            totalBorrow="$52.3M"
            totalSupply="$78.5M"
          />
          <AssetCard
            borrowApy="6.2%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="USD Coin"
            supplyApy="4.5%"
            symbol="USDC"
            totalBorrow="$41.8M"
            totalSupply="$62.7M"
          />
          <AssetCard
            borrowApy="6.0%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="Tether"
            supplyApy="4.3%"
            symbol="USDT"
            totalBorrow="$39.2M"
            totalSupply="$58.9M"
          />
          <AssetCard
            borrowApy="5.5%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="Solana"
            supplyApy="3.9%"
            symbol="SOL"
            totalBorrow="$18.7M"
            totalSupply="$25.4M"
          />
          <AssetCard
            borrowApy="5.3%"
            iconUrl="/placeholder.svg?height=40&width=40"
            name="Avalanche"
            supplyApy="3.7%"
            symbol="AVAX"
            totalBorrow="$12.5M"
            totalSupply="$18.2M"
          />
        </div>
      </div>
    </section>
  );
};

interface AssetCardProps {
  name: string;
  symbol: string;
  supplyApy: string;
  borrowApy: string;
  totalSupply: string;
  totalBorrow: string;
  iconUrl: string;
}

export function AssetCard({
  name,
  symbol,
  supplyApy,
  borrowApy,
  totalSupply,
  totalBorrow,
  iconUrl,
}: AssetCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">
          <div className="flex items-center gap-2">
            <Image
              alt={name}
              className="rounded-full"
              height={40}
              src={iconUrl || '/placeholder.svg'}
              width={40}
            />
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-muted-foreground text-xs">{symbol}</div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">Taux de Prêt (APY)</p>
            <p className="font-bold text-2xl text-green-500">{supplyApy}</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">
              Taux d Emprunt (APY)
            </p>
            <p className="font-bold text-2xl text-primary">{borrowApy}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Total Fourni</p>
            <p className="font-medium text-sm">{totalSupply}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Total Emprunté</p>
            <p className="font-medium text-sm">{totalBorrow}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={`/markets/${symbol.toLowerCase()}`}>
          <Button className="w-full" variant="outline">
            Voir le Marché
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
