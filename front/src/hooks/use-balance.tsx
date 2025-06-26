import { useAppKitAccount } from '@reown/appkit/react';
import { getBalance } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { config } from '@/lib/wallet';

export function useBalance() {
  const { address } = useAppKitAccount({ namespace: 'eip155' });
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      getBalance(config, { address: address as `0x${string}` }).then(
        (_balance) => {
          const formattedBalance = Number(formatEther(_balance.value, 'wei'));
          setBalance(formattedBalance.toFixed(2));
        }
      );
    }
  }, [address]);

  return balance;
}
