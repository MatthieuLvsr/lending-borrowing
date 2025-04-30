import { Wallet } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../theme-provider";
import { Button } from "../ui/button";

export function Navbar() {
	return (
		<header className="flex justify-around border-b">
			<div className="container flex h-16 items-center justify-between py-4">
				<Link href="/" className="flex items-center gap-2 font-bold text-xl">
					<Wallet className="h-6 w-6" />
					<span>DeFi Lending</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6">
					<Link href="/" className="text-sm font-medium">
						Accueil
					</Link>
					<Link href="/markets" className="text-sm font-medium">
						Marchés
					</Link>
				</nav>
				<div className="flex gap-4">
  				<Button asChild>
    				<Link href="/dashboard">
    						Launch Dapp
    				</Link>
  				</Button>
   			  <ModeToggle />
				</div>
  		</div>
		</header>
	);
}
