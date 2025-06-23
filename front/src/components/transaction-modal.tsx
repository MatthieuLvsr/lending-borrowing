"use client";

import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	type: "deposit" | "withdraw" | "borrow" | "repay";
	asset: {
		name: string;
		symbol: string;
		address: string;
		decimals: number;
		iconUrl: string;
	};
	maxAmount?: string;
}

export function TransactionModal({
	isOpen,
	onClose,
	type,
	asset,
	maxAmount = "0",
}: TransactionModalProps) {
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [interestRateMode, setInterestRateMode] = useState<string>("2"); // 1 pour stable, 2 pour variable

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
	};

	const setMaxAmount = () => {
		setAmount(maxAmount);
	};

	const resetState = () => {
		setAmount("");
		setLoading(false);
		setError(null);
		setSuccess(null);
		setInterestRateMode("2");
	};

	const handleClose = () => {
		resetState();
		onClose();
	};
	setLoading(true);
	setError(null);
	setSuccess(null);

	const getTitle = () => {
		switch (type) {
			case "deposit":
				return `Déposer des ${asset.symbol}`;
			case "withdraw":
				return `Retirer des ${asset.symbol}`;
			case "borrow":
				return `Emprunter des ${asset.symbol}`;
			case "repay":
				return `Rembourser des ${asset.symbol}`;
			default:
				return "Transaction";
		}
	};

	const getDescription = () => {
		switch (type) {
			case "deposit":
				return `Déposez vos ${asset.symbol} pour gagner des intérêts et utiliser comme collatéral.`;
			case "withdraw":
				return `Retirez vos ${asset.symbol} déposés sur la plateforme.`;
			case "borrow":
				return `Empruntez des ${asset.symbol} en utilisant votre collatéral.`;
			case "repay":
				return `Remboursez votre dette en ${asset.symbol}.`;
			default:
				return "";
		}
	};

	const getButtonText = () => {
		if (loading) return "Traitement en cours...";

		switch (type) {
			case "deposit":
				return "Déposer";
			case "withdraw":
				return "Retirer";
			case "borrow":
				return "Emprunter";
			case "repay":
				return "Rembourser";
			default:
				return "Confirmer";
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{getTitle()}</DialogTitle>
					<DialogDescription>{getDescription()}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="amount">Montant</Label>
						<div className="flex items-center gap-2">
							<Input
								id="amount"
								type="number"
								placeholder="0.00"
								value={amount}
								onChange={handleAmountChange}
								disabled={loading}
							/>
							<Button
								variant="outline"
								size="sm"
								onClick={setMaxAmount}
								disabled={loading}
							>
								Max
							</Button>
						</div>
						<div className="text-xs text-muted-foreground">
							Maximum disponible: {maxAmount} {asset.symbol}
						</div>
					</div>

					{(type === "borrow" || type === "repay") && (
						<div className="grid gap-2">
							<Label htmlFor="interestRateMode">Type de taux</Label>
							<Select
								value={interestRateMode}
								onValueChange={setInterestRateMode}
								disabled={loading}
							>
								<SelectTrigger id="interestRateMode">
									<SelectValue placeholder="Sélectionner un type de taux" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1">Taux stable</SelectItem>
									<SelectItem value="2">Taux variable</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}

					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert>
							<AlertDescription>{success}</AlertDescription>
						</Alert>
					)}
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose} disabled={loading}>
						Annuler
					</Button>
					<Button disabled={loading}>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{getButtonText()}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
