import { config } from "@/lib/wallet";
import { useAppKitAccount } from "@reown/appkit/react";
import { getBalance } from "@wagmi/core";
import { useEffect, useState } from "react";
import { formatEther } from "viem";

export function useBalance() {
  const { address } = useAppKitAccount({ namespace: "eip155" });
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if(address) {
      getBalance(config, { address: address as `0x${string}` }).then((balance) => {
        setBalance(formatEther(balance.value, "gwei"))
      })
    }
  }, [address])

  return balance;
}
