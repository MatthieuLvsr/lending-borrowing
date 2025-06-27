'use client';

import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { isAddress, parseUnits } from 'viem';
import { type BaseError, useWaitForTransactionReceipt } from 'wagmi';
import { useWriteLendingPoolFactoryCreateLendingPool } from '@/generated';
import { CONTRACT_ADDRESSES } from '@/lib/contracts';
import { revalidatePools } from '@/lib/pool.action';
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

interface FormData {
  underlyingToken: string;
  interestRate: string;
}

interface FormErrors {
  underlyingToken?: string;
  interestRate?: string;
}

export const NewPoolModal = ({ trigger }: NewPoolModalProps) => {
  const {
    writeContract,
    data: hash,
    isPending,
    error,
  } = useWriteLendingPoolFactoryCreateLendingPool();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    underlyingToken: '',
    interestRate: '',
  });

  useEffect(() => {
    const handleRevalidation = async () => {
      if (isConfirmed) {
        await revalidatePools();
      }
    };

    handleRevalidation();
  }, [isConfirmed]);

  useEffect(() => {
    if (error) {
      toast.error((error as BaseError).shortMessage || error.message);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!isAddress(form.underlyingToken)) {
      errors.underlyingToken = 'Invalid Ethereum address';
    }

    if (form.interestRate.trim()) {
      const rate = Number.parseFloat(form.interestRate);
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

    writeContract({
      address: CONTRACT_ADDRESSES.LENDING_POOL_FACTORY,
      args: [
        form.underlyingToken as `0x${string}`,
        parseUnits(form.interestRate, 2),
      ],
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const resetForm = () => {
    setForm({
      underlyingToken: '',
      interestRate: '',
    });
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

  const getSubmitButtonText = (): string => {
    if (isPending) {
      return 'Creating Pool...';
    }
    if (isConfirming) {
      return 'Confirming...';
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
              onChange={(e) =>
                handleInputChange('underlyingToken', e.target.value)
              }
              placeholder="0x..."
              type="text"
              value={form.underlyingToken}
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
              onChange={(e) =>
                handleInputChange('interestRate', e.target.value)
              }
              placeholder="5.0"
              step="0.01"
              type="number"
              value={form.interestRate}
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
                <div className="flex w-full items-center justify-between gap-2">
                  <code className="text-xs">
                    Transaction Hash: {hash.slice(0, 6)}...{hash.slice(-4)}
                  </code>
                  <Copy
                    className="size-4 cursor-pointer duration-300 ease-in-out hover:text-red-600"
                    onClick={() => {
                      navigator.clipboard.writeText(hash);
                      toast.success('Hash address copied to clipboard');
                    }}
                  />
                </div>
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
                Lending pool created successfully! The market data is being
                refreshed.
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
