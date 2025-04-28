import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface AssetCardProps {
  name: string
  symbol: string
  supplyApy: string
  borrowApy: string
  totalSupply: string
  totalBorrow: string
  iconUrl: string
}

export function AssetCard({ name, symbol, supplyApy, borrowApy, totalSupply, totalBorrow, iconUrl }: AssetCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <Image src={iconUrl || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-full" />
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
            <p className="text-xs text-muted-foreground">Taux d Emprunt (APY)</p>
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
  )
}
