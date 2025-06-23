import { ArrowDown, ArrowUp } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function TransactionHistory() {
	const transactions = [
		{
			id: "tx1",
			type: "supply",
			asset: "ETH",
			amount: "2.5",
			value: "$5,000",
			timestamp: "2023-04-15 14:32",
		},
		{
			id: "tx2",
			type: "borrow",
			asset: "USDC",
			amount: "3,000",
			value: "$3,000",
			timestamp: "2023-04-14 09:15",
		},
		{
			id: "tx3",
			type: "repay",
			asset: "USDC",
			amount: "1,000",
			value: "$1,000",
			timestamp: "2023-04-12 16:45",
		},
		{
			id: "tx4",
			type: "withdraw",
			asset: "SOL",
			amount: "20",
			value: "$950",
			timestamp: "2023-04-10 11:22",
		},
		{
			id: "tx5",
			type: "supply",
			asset: "USDC",
			amount: "5,000",
			value: "$5,000",
			timestamp: "2023-04-08 13:10",
		},
	];

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Type</TableHead>
						<TableHead>Actif</TableHead>
						<TableHead>Montant</TableHead>
						<TableHead>Valeur</TableHead>
						<TableHead className="text-right">Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{transactions.map((tx) => (
						<TableRow key={tx.id}>
							<TableCell>
								<div className="flex items-center gap-2">
									{tx.type === "supply" || tx.type === "withdraw" ? (
										<div
											className={`p-1 rounded-full ${tx.type === "supply" ? "bg-green-100" : "bg-amber-100"}`}
										>
											{tx.type === "supply" ? (
												<ArrowUp className="h-3 w-3 text-green-600" />
											) : (
												<ArrowDown className="h-3 w-3 text-amber-600" />
											)}
										</div>
									) : (
										<div
											className={`p-1 rounded-full ${tx.type === "borrow" ? "bg-blue-100" : "bg-purple-100"}`}
										>
											{tx.type === "borrow" ? (
												<ArrowDown className="h-3 w-3 text-blue-600" />
											) : (
												<ArrowUp className="h-3 w-3 text-purple-600" />
											)}
										</div>
									)}
									<span className="capitalize">{tx.type}</span>
								</div>
							</TableCell>
							<TableCell>{tx.asset}</TableCell>
							<TableCell>
								{tx.amount} {tx.asset}
							</TableCell>
							<TableCell>{tx.value}</TableCell>
							<TableCell className="text-right">{tx.timestamp}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
