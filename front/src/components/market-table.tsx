import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Pools } from "@/lib/pool.action";

interface MarketTableProps {
	filter?: string;
	pools: Pools;
}

export function MarketTable({ filter = "all", pools }: MarketTableProps) {
	// Données simulées pour le tableau des marchés

	// Filtrer les marchés en fonction du filtre sélectionné
	// const filteredMarkets = filter === "all" ? pools : pools.filter((pool) => pool.category === filter)

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Asset</TableHead>
						<TableHead>Wallet Balance</TableHead>
						<TableHead>Lending APY</TableHead>
						<TableHead>Borrowing APY</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{pools.map((pool) => (
						<TableRow key={pool.lendingPoolAddress}>
							<TableCell>
								<div className="flex items-center gap-2">
									<Image
										src={"/placeholder.svg"}
										alt={pool.id}
										width={24}
										height={24}
										className="rounded-full"
									/>
									<div>
										<div className="font-medium">{pool.id}</div>
										<div className="text-xs text-muted-foreground">
											{pool.id}
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell>{"Balance"}</TableCell>
							<TableCell className="text-green-500">
								{pool.interestRatePerSecond}
							</TableCell>
							<TableCell className="text-green-500">
								{pool.interestRatePerSecond}
							</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end gap-2">
									<Button size="sm" variant="outline">
										Prêter
									</Button>
									<Button size="sm">Emprunter</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

const markets = [
	{
		id: "eth",
		name: "Ethereum",
		symbol: "ETH",
		price: "$2,000",
		supplyApy: "3.2%",
		borrowApy: "5.8%",
		totalSupply: "$45.2M",
		totalBorrow: "$32.1M",
		utilization: "71%",
		category: "ethereum",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "btc",
		name: "Bitcoin",
		symbol: "BTC",
		price: "$20,500",
		supplyApy: "2.8%",
		borrowApy: "4.9%",
		totalSupply: "$78.5M",
		totalBorrow: "$52.3M",
		utilization: "67%",
		category: "other",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "usdc",
		name: "USD Coin",
		symbol: "USDC",
		price: "$1.00",
		supplyApy: "4.5%",
		borrowApy: "6.2%",
		totalSupply: "$62.7M",
		totalBorrow: "$41.8M",
		utilization: "67%",
		category: "stablecoins",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "usdt",
		name: "Tether",
		symbol: "USDT",
		price: "$1.00",
		supplyApy: "4.3%",
		borrowApy: "6.0%",
		totalSupply: "$58.9M",
		totalBorrow: "$39.2M",
		utilization: "67%",
		category: "stablecoins",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "sol",
		name: "Solana",
		symbol: "SOL",
		price: "$47.35",
		supplyApy: "3.9%",
		borrowApy: "5.5%",
		totalSupply: "$25.4M",
		totalBorrow: "$18.7M",
		utilization: "74%",
		category: "other",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "avax",
		name: "Avalanche",
		symbol: "AVAX",
		price: "$35.20",
		supplyApy: "3.7%",
		borrowApy: "5.3%",
		totalSupply: "$18.2M",
		totalBorrow: "$12.5M",
		utilization: "69%",
		category: "other",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "dai",
		name: "Dai",
		symbol: "DAI",
		price: "$1.00",
		supplyApy: "4.2%",
		borrowApy: "5.9%",
		totalSupply: "$42.1M",
		totalBorrow: "$28.3M",
		utilization: "67%",
		category: "stablecoins",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
	{
		id: "weth",
		name: "Wrapped Ethereum",
		symbol: "WETH",
		price: "$2,000",
		supplyApy: "3.1%",
		borrowApy: "5.7%",
		totalSupply: "$38.6M",
		totalBorrow: "$25.9M",
		utilization: "67%",
		category: "ethereum",
		iconUrl: "/placeholder.svg?height=24&width=24",
	},
];
