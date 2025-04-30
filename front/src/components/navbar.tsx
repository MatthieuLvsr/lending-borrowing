import { Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export function Navbar() {
  return (
    <header className="flex justify-around border-b">
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
        <Button>Connecter Wallet</Button>
      </div>
    </header>
  )
}
