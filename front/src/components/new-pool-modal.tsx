'use client';

import { useState } from 'react';
import { isAddress, parseUnits } from 'viem';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { lendingPoolFactoryAbi } from '@/generated';
import { LENDING_POOL_FACTORY } from '@/lib/contracts';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface NewPoolModalProps {
  trigger: React.ReactNode;
}

export const NewPoolModal = ({ trigger }: NewPoolModalProps) => {
  const [open, setOpen] = useState(false);
  const [underlyingToken, setUnderlyingToken] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [formErrors, setFormErrors] = useState<{
    underlyingToken?: string;
    interestRate?: string;
  }>({});

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!underlyingToken.trim()) {
      errors.underlyingToken = 'Underlying token address is required';
    } else if (!isAddress(underlyingToken)) {
      errors.underlyingToken = 'Invalid Ethereum address';
    }

    if (interestRate.trim()) {
      const rate = Number.parseFloat(interestRate);
      if (Number.isNaN(rate) || rate < 0 || rate > 100) {
        errors.interestRate = 'Interest rate must be between 0 and 100';
      }
    } else {
      errors.interestRate = 'Interest rate is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const annualRate = Number.parseFloat(interestRate) / 100;
    const perSecondRate = (1 + annualRate) ** (1 / 31_536_000) - 1;
    const scaledRate = parseUnits(perSecondRate.toString(), 18);

    writeContract({
      address: LENDING_POOL_FACTORY,
      abi: lendingPoolFactoryAbi,
      functionName: 'createLendingPool',
      args: [underlyingToken as `0x${string}`, scaledRate],
    });
  };

  const resetForm = () => {
    setUnderlyingToken('');
    setInterestRate('');
    setFormErrors({});
  };

  const handleClose = () => {
    if (!(isPending || isConfirming)) {
      setOpen(false);
      if (isConfirmed) {
        resetForm();
      }
    }
  };

  const getSubmitButtonText = () => {
    if (isPending) {
      return 'Confirming...';
    }
    if (isConfirming) {
      return 'Creating...';
    }
    return 'Create Pool';
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Lending Pool</DialogTitle>
          <DialogDescription>
            Deploy a new lending pool for an ERC20 token. Make sure you have the
            GOVERNOR role to perform this action.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="underlyingToken">Underlying Token Address</Label>
            <Input
              className={formErrors.underlyingToken ? 'border-red-500' : ''}
              disabled={isPending || isConfirming}
              id="underlyingToken"
              onChange={(e) => {
                setUnderlyingToken(e.target.value);
                if (formErrors.underlyingToken) {
                  setFormErrors((prev) => ({
                    ...prev,
                    underlyingToken: undefined,
                  }));
                }
              }}
              placeholder="0x..."
              type="text"
              value={underlyingToken}
            />
            {formErrors.underlyingToken && (
              <p className="text-red-500 text-sm">
                {formErrors.underlyingToken}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
            <Input
              className={formErrors.interestRate ? 'border-red-500' : ''}
              disabled={isPending || isConfirming}
              id="interestRate"
              max="100"
              min="0"
              onChange={(e) => {
                setInterestRate(e.target.value);
                if (formErrors.interestRate) {
                  setFormErrors((prev) => ({
                    ...prev,
                    interestRate: undefined,
                  }));
                }
              }}
              placeholder="5.0"
              step="0.01"
              type="number"
              value={interestRate}
            />
            {formErrors.interestRate && (
              <p className="text-red-500 text-sm">{formErrors.interestRate}</p>
            )}
            <p className="text-gray-500 text-xs">
              Enter the annual percentage rate (e.g., 5.0 for 5% APR)
            </p>
          </div>

          {hash && (
            <Alert>
              <AlertDescription>
                Transaction Hash: <code className="text-sm">{hash}</code>
              </AlertDescription>
            </Alert>
          )}

          {isConfirming && (
            <Alert>
              <AlertDescription>
                Waiting for transaction confirmation...
              </AlertDescription>
            </Alert>
          )}

          {isConfirmed && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Lending pool created successfully!
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                Error: {(error as BaseError).shortMessage || error.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1"
              disabled={isPending || isConfirming}
              onClick={handleClose}
              type="button"
              variant="outline"
            >
              {isConfirmed ? 'Close' : 'Cancel'}
            </Button>
            <Button
              className="flex-1"
              disabled={isPending || isConfirming}
              type="submit"
            >
              {getSubmitButtonText()}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
