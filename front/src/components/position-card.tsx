"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface PositionCardProps {
	name: string;
	symbol: string;
	amount: string;
	value: string;
	apy: string;
	iconUrl: string;
	actionLabel: string;
	isBorrow?: boolean;
	onDeposit?: () => void;
	onWithdraw?: () => void;
	onBorrow?: () => void;
	onRepay?: () => void;
}

export function PositionCard({
	name,
	symbol,
	amount,
	value,
	apy,
	iconUrl,
	actionLabel,
	isBorrow = false,
	onDeposit,
	onWithdraw,
	onBorrow,
	onRepay,
}: PositionCardProps) {
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
				<div className="space-y-4">
					<div className="space-y-2">
						<p className="text-xs text-muted-foreground">Montant</p>
						<div className="flex justify-between">
							<p className="text-xl font-bold">
								{amount} {symbol}
							</p>
							<p className="text-xl font-medium">{value}</p>
						</div>
					</div>
					<div className="flex justify-between">
						<p className="text-xs text-muted-foreground">
							{isBorrow ? "Taux d'Emprunt (APY)" : "Taux de Prêt (APY)"}
						</p>
						<p
							className={`text-sm font-medium ${isBorrow ? "text-primary" : "text-green-500"}`}
						>
							{apy}
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex gap-2">
				{isBorrow ? (
					<>
						<Button className="flex-1" onClick={onRepay}>
							<ArrowUp className="mr-2 h-4 w-4" />
							Rembourser
						</Button>
						<Button className="flex-1" variant="outline" onClick={onBorrow}>
							<ArrowDown className="mr-2 h-4 w-4" />
							Emprunter plus
						</Button>
					</>
				) : (
					<>
						<Button className="flex-1" variant="outline" onClick={onDeposit}>
							<ArrowDown className="mr-2 h-4 w-4" />
							Déposer
						</Button>
						<Button className="flex-1" onClick={onWithdraw}>
							<ArrowUp className="mr-2 h-4 w-4" />
							Retirer
						</Button>
					</>
				)}
			</CardFooter>
		</Card>
	);
}
