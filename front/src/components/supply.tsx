'use client';

import { Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatUnits, parseUnits } from 'viem';
import { type UseBalanceReturnType, useAccount, useBalance } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReadDepositTokenAllowance } from '@/generated';
import type { Pools } from '@/lib/pool.action';

export function SupplyButton({ pool }: { pool: Pools[0] }) {
  const { address } = useAccount();
  const { data: balance, refetch: refetchBalance } = useBalance({
    address,
    token: pool.underlyingToken,
  });
  const hasBalance = balance && balance.value > BigInt(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button disabled={!(hasBalance && address)} size="sm" variant="outline">
          Supply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              Supply {pool.id}{' '}
              <Copy
                className="size-4 cursor-pointer duration-300 ease-in-out hover:text-red-600"
                onClick={() => {
                  navigator.clipboard.writeText(pool.underlyingToken);
                  toast.success('Token address copied to clipboard');
                }}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            Deposit {pool.id} tokens to earn{' '}
            {formatUnits(pool.interestRatePerSecond * BigInt(31_536_000), 18)}%
            APY
          </DialogDescription>
          {hasBalance && address && (
            <SupplyForm balance={balance} pool={pool} userAddress={address} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

interface SupplyFormProps {
  userAddress: `0x${string}`;
  balance: NonNullable<UseBalanceReturnType['data']>;
  pool: Pools[0];
}

const SupplyForm = ({ userAddress, balance, pool }: SupplyFormProps) => {
  const [amount, setAmount] = useState('');

  const { data: allowance, refetch: refetchAllowance } =
    useReadDepositTokenAllowance({
      address: pool.underlyingToken,
      args: [userAddress, pool.lendingPoolAddress],
      query: {
        enabled: Boolean(userAddress && pool.lendingPoolAddress),
      },
    });
  const isApprovalSufficient =
    allowance && allowance >= parseUnits(amount, balance.decimals);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your logic here
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="flex gap-2">
            <Input
              // disabled={isApproving || isDepositing}
              className="h-8"
              id="amount"
              onChange={handleAmountChange}
              placeholder="0.00"
              type="number"
              value={amount}
            />
            <Button
              // disabled={!balance || isApproving || isDepositing}
              className="h-8"
              onClick={() =>
                setAmount(formatUnits(balance.value, balance.decimals))
              }
              size="sm"
              type="button"
              variant="outline"
            >
              Max
            </Button>
          </div>
          {balance && (
            <p className="text-muted-foreground text-sm">
              Available: {formatUnits(balance.value, balance.decimals)}{' '}
              {balance.symbol}
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        {isApprovalSufficient ? (
          <Button className="w-full" type="button">
            Supply
            {/* {isApproving ? 'Approving...' : `Approve ${pool.id}`} */}
          </Button>
        ) : (
          <Button className="w-full" type="button" variant="outline">
            Approve
            {/* {isApproving ? 'Approving...' : `Approve ${pool.id}`} */}
          </Button>
        )}
      </DialogFooter>
    </>
  );
};
