import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const AvailableActifSection = () => {
	return (
		<section className="w-full flex flex-col min-h-[80vh] items-center justify-center py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Actifs Disponibles
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Explorez les actifs disponibles pour le prêt et l emprunt sur
							notre plateforme.
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
				<CardTitle className="text-sm font-medium">
					<div className="flex items-center gap-2">
						<Image
							src={iconUrl || "/placeholder.svg"}
							alt={name}
							width={40}
							height={40}
							className="rounded-full"
						/>
						<div>
							<div className="font-bold">{name}</div>
							<div className="text-xs text-muted-foreground">{symbol}</div>
						</div>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<p className="text-xs text-muted-foreground">Taux de Prêt (APY)</p>
						<p className="text-2xl font-bold text-green-500">{supplyApy}</p>
					</div>
					<div className="space-y-2">
						<p className="text-xs text-muted-foreground">
							Taux d Emprunt (APY)
						</p>
						<p className="text-2xl font-bold text-primary">{borrowApy}</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Total Fourni</p>
						<p className="text-sm font-medium">{totalSupply}</p>
					</div>
					<div className="space-y-1">
						<p className="text-xs text-muted-foreground">Total Emprunté</p>
						<p className="text-sm font-medium">{totalBorrow}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Link href={`/markets/${symbol.toLowerCase()}`} className="w-full">
					<Button className="w-full" variant="outline">
						Voir le Marché
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
