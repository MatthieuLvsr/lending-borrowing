"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const disconnectWallet = () => {
    setAccount(null)
    setBalance(null)
    setChainId(null)
  }

  const getNetworkName = (chainId: number | null) => {
    if (!chainId) return "Inconnu"

    switch (chainId) {
      case 1:
        return "Ethereum Mainnet"
      case 5:
        return "Goerli Testnet"
      case 11155111:
        return "Sepolia Testnet"
      case 137:
        return "Polygon Mainnet"
      case 80001:
        return "Mumbai Testnet"
      default:
        return `Réseau ${chainId}`
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div>
      {!account && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>Veuillez installer Metamask pour continuer.</AlertDescription>
        </Alert>
      )}

      {!account ? (
        <Button >
          <Wallet className="mr-2 h-4 w-4" />
          Connecter Wallet
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              {formatAddress(account)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Adresse:</span>
                <span className="font-medium">{formatAddress(account)}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium">{balance} ETH</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted-foreground">Réseau:</span>
                <span className="font-medium">{getNetworkName(chainId)}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(account)
              }}
            >
              Copier l adresse
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet}>Déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
