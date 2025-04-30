import { Wallet } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="flex justify-around border-t py-6 md:py-10">
			<div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
				<div className="flex items-center gap-2 font-bold">
					<Wallet className="h-5 w-5" />
					<span>DeFi Lending</span>
				</div>
				<p className="text-center text-sm text-muted-foreground md:text-left">
					&copy; {new Date().getFullYear()} DeFi Lending. Tous droits réservés.
				</p>
				<div className="flex gap-4">
					<Link
						href="/terms"
						className="text-sm text-muted-foreground hover:underline"
					>
						Conditions d utilisation
					</Link>
					<Link
						href="/privacy"
						className="text-sm text-muted-foreground hover:underline"
					>
						Politique de confidentialité
					</Link>
				</div>
			</div>
		</footer>
	);
}
