"use client"

import { Button } from "@/components/ui/button"
import { useBalance } from "@/hooks/use-balance"
import { formatAddress } from "@/lib/utils"
import { config } from "@/lib/wallet"
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react"
import { getChains } from '@wagmi/core'
import { Wallet } from "lucide-react"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function WalletConnect() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount({ namespace: "eip155" });
  const { disconnect } = useDisconnect();
  const balance = useBalance()
  const chains = getChains(config)

  return (
    <div>
      {!isConnected && (
        <Button onClick={() => open({ view: "Connect", namespace: "eip155" })} >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}

      {isConnected && address &&
        (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              {formatAddress(address)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Mon Wallet</span>
              <span
                className="hover:bg-accent hover:text-accent-foreground items-center gap-2 rounded-sm px-2 py-1.5
                text-sm outline-hidden select-none cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast.success("Address copied.");
                }}>
                {formatAddress(address)}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-sm">
              <div className="flex items-center justify-between">

              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium">{balance} ETH</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-muted-foreground">Réseau:</span>
                <span className="text-muted-foreground">{chains[0].name}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address);
                toast.success("Address copied.");
              }}
            >
              Copier l&apos;adresse
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => disconnect()}>Déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
