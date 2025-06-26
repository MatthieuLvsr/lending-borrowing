'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PositionCardProps {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  apy: string;
  iconUrl: string;
  actionLabel: string;
  isBorrow?: boolean;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onBorrow?: () => void;
  onRepay?: () => void;
}

export function PositionCard({
  name,
  symbol,
  amount,
  value,
  apy,
  iconUrl,
  isBorrow = false,
  onDeposit,
  onWithdraw,
  onBorrow,
  onRepay,
}: PositionCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">
          <div className="flex items-center gap-2">
            <Image
              alt={name}
              className="rounded-full"
              height={40}
              src={iconUrl || '/placeholder.svg'}
              width={40}
            />
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-muted-foreground text-xs">{symbol}</div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground text-xs">Montant</p>
            <div className="flex justify-between">
              <p className="font-bold text-xl">
                {amount} {symbol}
              </p>
              <p className="font-medium text-xl">{value}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground text-xs">
              {isBorrow ? "Taux d'Emprunt (APY)" : 'Taux de Prêt (APY)'}
            </p>
            <p
              className={`font-medium text-sm ${isBorrow ? 'text-primary' : 'text-green-500'}`}
            >
              {apy}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isBorrow ? (
          <>
            <Button className="flex-1" onClick={onRepay}>
              <ArrowUp className="mr-2 h-4 w-4" />
              Rembourser
            </Button>
            <Button className="flex-1" onClick={onBorrow} variant="outline">
              <ArrowDown className="mr-2 h-4 w-4" />
              Emprunter plus
            </Button>
          </>
        ) : (
          <>
            <Button className="flex-1" onClick={onDeposit} variant="outline">
              <ArrowDown className="mr-2 h-4 w-4" />
              Déposer
            </Button>
            <Button className="flex-1" onClick={onWithdraw}>
              <ArrowUp className="mr-2 h-4 w-4" />
              Retirer
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
