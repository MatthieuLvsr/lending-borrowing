"use client";

import { CollateralRatioIndicator } from "@/components/collateral-ratio-indicator";
import { InterestRatesChart } from "@/components/interest-rates-chart";
import { StatsCard } from "@/components/landing-page/stat-section";
import type { AccountData } from "@/components/lending-contract";
import { PositionCard } from "@/components/position-card";
import { TransactionHistory } from "@/components/transaction-history";
import { TransactionModal } from "@/components/transaction-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnect } from "@/components/wallet-connect";
import { useBalance } from "@/hooks/use-balance";
import { useAppKitAccount } from "@reown/appkit/react";
import {
	AlertTriangle,
	ArrowUpDown,
	DollarSign,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useState } from "react";

const accountData: AccountData = {
	totalCollateralETH: "15.0", // User has 15 ETH as collateral
	totalDebtETH: "5.0", // User owes 5 ETH
	availableBorrowsETH: "8.0", // User can borrow up to 8 ETH
	currentLiquidationThreshold: 85, // Liquidation threshold is 85%
	ltv: 75, // Loan-to-value ratio is 75%
	healthFactor: "2.5", // Health factor is 2.5 (safe zone)
};

export default function DashboardPage() {
	const balance = useBalance();
	const { address, isConnected } = useAppKitAccount({ namespace: "eip155" });

	const [collateralRatio] = useState<number>(0);
	const [transactionModal, setTransactionModal] = useState<{
		isOpen: boolean;
		type: "deposit" | "withdraw" | "borrow" | "repay";
		asset: {
			name: string;
			symbol: string;
			address: string;
			decimals: number;
			iconUrl: string;
		};
		maxAmount: string;
	}>({
		isOpen: false,
		type: "deposit",
		asset: {
			name: "",
			symbol: "",
			address: "",
			decimals: 18,
			iconUrl: "",
		},
		maxAmount: "0",
	});

	const openTransactionModal = (
		type: "deposit" | "withdraw" | "borrow" | "repay",
		asset: {
			name: string;
			symbol: string;
			address: string;
			decimals: number;
			iconUrl: string;
		},
		maxAmount: string,
	) => {
		setTransactionModal({
			isOpen: true,
			type,
			asset,
			maxAmount,
		});
	};

	const closeTransactionModal = () => {
		setTransactionModal((prev) => ({
			...prev,
			isOpen: false,
		}));
	};

	const assets = [
		{
			name: "Ethereum",
			symbol: "ETH",
			address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			decimals: 18,
			iconUrl: "/placeholder.svg?height=40&width=40",
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			decimals: 6,
			iconUrl: "/placeholder.svg?height=40&width=40",
		},
		{
			name: "Solana",
			symbol: "SOL",
			address: "0x173fd7434B8B50dF08e3298f173487ebDB35FD14",
			decimals: 9,
			iconUrl: "/placeholder.svg?height=40&width=40",
		},
	];

	return (
		<div>
			{!isConnected && (
				<div className="flex flex-col items-center justify-center h-full gap-4 py-20">
					<Wallet className="h-16 w-16 text-muted-foreground" />
					<h2 className="text-2xl font-bold">Connectez votre wallet</h2>
					<p className="text-muted-foreground text-center max-w-md">
						Connectez votre wallet pour accéder à votre tableau de bord et gérer
						vos positions de prêt et d emprunt.
					</p>
					<WalletConnect />
				</div>
			)}

			{isConnected && (
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold">Tableau de Bord</h1>
						<p className="text-muted-foreground">
							Gérez vos positions de prêt et d emprunt
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<StatsCard
							title="Valeur Totale Fournie"
							value={`${accountData.totalCollateralETH} ETH`}
							change="+5.25%"
							icon={<DollarSign className="h-4 w-4" />}
						/>
						<StatsCard
							title="Dette Totale"
							value={`${accountData.totalDebtETH} ETH`}
							change="+2.4%"
							icon={<ArrowUpDown className="h-4 w-4" />}
						/>
						<StatsCard
							title="Disponible à Emprunter"
							value={`${accountData.availableBorrowsETH} ETH`}
							change="-1.3%"
							icon={<Wallet className="h-4 w-4" />}
							changeNegative={true}
						/>
						<StatsCard
							title="Facteur de Santé"
							value={accountData.healthFactor}
							change="+0.2"
							icon={<TrendingUp className="h-4 w-4" />}
						/>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Santé de votre Position</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<CollateralRatioIndicator
									currentRatio={collateralRatio}
									liquidationRatio={accountData.currentLiquidationThreshold}
									safeRatio={150}
								/>

								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-sm text-muted-foreground">
												Seuil de Liquidation
											</p>
											<p className="text-lg font-medium">
												{accountData.currentLiquidationThreshold}%
											</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Ratio LTV Maximum
											</p>
											<p className="text-lg font-medium">{accountData.ltv}%</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Collatéral Total
											</p>
											<p className="text-lg font-medium">
												{accountData.totalCollateralETH} ETH
											</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">
												Dette Totale
											</p>
											<p className="text-lg font-medium">
												{accountData.totalDebtETH} ETH
											</p>
										</div>
									</div>

									<div className="bg-muted p-4 rounded-lg">
										<div className="flex items-start gap-2">
											<AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
											<div>
												<p className="font-medium">
													Comment fonctionne la liquidation ?
												</p>
												<p className="text-sm text-muted-foreground mt-1">
													Si votre ratio de collatéralisation tombe en dessous
													du seuil de liquidation, vos actifs peuvent être
													liquidés pour rembourser votre dette. Maintenez un
													ratio sain pour éviter la liquidation.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Tabs defaultValue="supply" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-8">
							<TabsTrigger value="supply">Mes Fournitures</TabsTrigger>
							<TabsTrigger value="borrow">Mes Emprunts</TabsTrigger>
						</TabsList>
						<TabsContent value="supply" className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<PositionCard
									name="Ethereum"
									symbol="ETH"
									amount="5.2"
									value="$10,400"
									apy="3.2%"
									iconUrl="/placeholder.svg?height=40&width=40"
									actionLabel="Gérer"
									onDeposit={() =>
										openTransactionModal("deposit", assets[0], "10")
									}
									onWithdraw={() =>
										openTransactionModal("withdraw", assets[0], "5.2")
									}
								/>
								<PositionCard
									name="USD Coin"
									symbol="USDC"
									amount="8,500"
									value="$8,500"
									apy="4.5%"
									iconUrl="/placeholder.svg?height=40&width=40"
									actionLabel="Gérer"
									onDeposit={() =>
										openTransactionModal("deposit", assets[1], "5000")
									}
									onWithdraw={() =>
										openTransactionModal("withdraw", assets[1], "8500")
									}
								/>
								<PositionCard
									name="Solana"
									symbol="SOL"
									amount="120"
									value="$5,680"
									apy="3.9%"
									iconUrl="/placeholder.svg?height=40&width=40"
									actionLabel="Gérer"
									onDeposit={() =>
										openTransactionModal("deposit", assets[2], "200")
									}
									onWithdraw={() =>
										openTransactionModal("withdraw", assets[2], "120")
									}
								/>
								<Card className="flex flex-col items-center justify-center p-6 h-full border-dashed">
									<Button
										variant="outline"
										className="rounded-full w-12 h-12 mb-4"
									>
										+
									</Button>
									<p className="text-muted-foreground">
										Fournir un nouvel actif
									</p>
								</Card>
							</div>
						</TabsContent>
						<TabsContent value="borrow" className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<PositionCard
									name="Bitcoin"
									symbol="BTC"
									amount="0.45"
									value="$9,200"
									apy="4.9%"
									iconUrl="/placeholder.svg?height=40&width=40"
									actionLabel="Rembourser"
									isBorrow={true}
									onBorrow={() =>
										openTransactionModal(
											"borrow",
											{ ...assets[0], name: "Bitcoin", symbol: "BTC" },
											"0.2",
										)
									}
									onRepay={() =>
										openTransactionModal(
											"repay",
											{ ...assets[0], name: "Bitcoin", symbol: "BTC" },
											"0.45",
										)
									}
								/>
								<PositionCard
									name="Tether"
									symbol="USDT"
									amount="3,150"
									value="$3,150"
									apy="6.0%"
									iconUrl="/placeholder.svg?height=40&width=40"
									actionLabel="Rembourser"
									isBorrow={true}
									onBorrow={() =>
										openTransactionModal(
											"borrow",
											{ ...assets[1], name: "Tether", symbol: "USDT" },
											"1000",
										)
									}
									onRepay={() =>
										openTransactionModal(
											"repay",
											{ ...assets[1], name: "Tether", symbol: "USDT" },
											"3150",
										)
									}
								/>
								<Card className="flex flex-col items-center justify-center p-6 h-full border-dashed">
									<Button
										variant="outline"
										className="rounded-full w-12 h-12 mb-4"
									>
										+
									</Button>
									<p className="text-muted-foreground">
										Emprunter un nouvel actif
									</p>
								</Card>
							</div>
						</TabsContent>
					</Tabs>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<InterestRatesChart
							utilizationRate={0.72}
							optimalUtilizationRate={0.8}
							baseVariableBorrowRate={0.01}
							variableRateSlope1={0.04}
							variableRateSlope2={0.75}
						/>

						<div className="space-y-4">
							<h2 className="text-2xl font-bold">
								Historique des Transactions
							</h2>
							<TransactionHistory />
						</div>
					</div>
				</div>
			)}
			{transactionModal.isOpen && (
				<TransactionModal
					isOpen={transactionModal.isOpen}
					onClose={closeTransactionModal}
					type={transactionModal.type}
					asset={transactionModal.asset}
					maxAmount={transactionModal.maxAmount}
				/>
			)}
		</div>
	);
}
