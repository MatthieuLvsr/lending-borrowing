'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import {
  AlertTriangle,
  ArrowUpDown,
  DollarSign,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { CollateralRatioIndicator } from '@/components/collateral-ratio-indicator';
import { InterestRatesChart } from '@/components/interest-rates-chart';
import { StatsCard } from '@/components/landing-page/stat-section';
import type { AccountData } from '@/components/lending-contract';
import { PositionCard } from '@/components/position-card';
import { TransactionHistory } from '@/components/transaction-history';
import { TransactionModal } from '@/components/transaction-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletConnect } from '@/components/wallet-connect';
import { useBalance } from '@/hooks/use-balance';

const accountData: AccountData = {
  totalCollateralETH: '15.0', // User has 15 ETH as collateral
  totalDebtETH: '5.0', // User owes 5 ETH
  availableBorrowsETH: '8.0', // User can borrow up to 8 ETH
  currentLiquidationThreshold: 85, // Liquidation threshold is 85%
  ltv: 75, // Loan-to-value ratio is 75%
  healthFactor: '2.5', // Health factor is 2.5 (safe zone)
};

export default function DashboardPage() {
  const _balance = useBalance();
  const { isConnected } = useAppKitAccount({ namespace: 'eip155' });

  const [collateralRatio] = useState<number>(0);
  const [transactionModal, setTransactionModal] = useState<{
    isOpen: boolean;
    type: 'deposit' | 'withdraw' | 'borrow' | 'repay';
    asset: {
      name: string;
      symbol: string;
      address: string;
      decimals: number;
      iconUrl: string;
    };
    maxAmount: string;
  }>({
    isOpen: false,
    type: 'deposit',
    asset: {
      name: '',
      symbol: '',
      address: '',
      decimals: 18,
      iconUrl: '',
    },
    maxAmount: '0',
  });

  const openTransactionModal = (
    type: 'deposit' | 'withdraw' | 'borrow' | 'repay',
    asset: {
      name: string;
      symbol: string;
      address: string;
      decimals: number;
      iconUrl: string;
    },
    maxAmount: string
  ) => {
    setTransactionModal({
      isOpen: true,
      type,
      asset,
      maxAmount,
    });
  };

  const closeTransactionModal = () => {
    setTransactionModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const assets = [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      decimals: 18,
      iconUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      iconUrl: '/placeholder.svg?height=40&width=40',
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      address: '0x173fd7434B8B50dF08e3298f173487ebDB35FD14',
      decimals: 9,
      iconUrl: '/placeholder.svg?height=40&width=40',
    },
  ];

  return (
    <div>
      {!isConnected && (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
          <Wallet className="h-16 w-16 text-muted-foreground" />
          <h2 className="font-bold text-2xl">Connectez votre wallet</h2>
          <p className="max-w-md text-center text-muted-foreground">
            Connectez votre wallet pour accéder à votre tableau de bord et gérer
            vos positions de prêt et d emprunt.
          </p>
          <WalletConnect />
        </div>
      )}

      {isConnected && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Tableau de Bord</h1>
            <p className="text-muted-foreground">
              Gérez vos positions de prêt et d emprunt
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              change="+5.25%"
              icon={<DollarSign className="h-4 w-4" />}
              title="Valeur Totale Fournie"
              value={`${accountData.totalCollateralETH} ETH`}
            />
            <StatsCard
              change="+2.4%"
              icon={<ArrowUpDown className="h-4 w-4" />}
              title="Dette Totale"
              value={`${accountData.totalDebtETH} ETH`}
            />
            <StatsCard
              change="-1.3%"
              changeNegative={true}
              icon={<Wallet className="h-4 w-4" />}
              title="Disponible à Emprunter"
              value={`${accountData.availableBorrowsETH} ETH`}
            />
            <StatsCard
              change="+0.2"
              icon={<TrendingUp className="h-4 w-4" />}
              title="Facteur de Santé"
              value={accountData.healthFactor}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Santé de votre Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <CollateralRatioIndicator
                  currentRatio={collateralRatio}
                  liquidationRatio={accountData.currentLiquidationThreshold}
                  safeRatio={150}
                />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Seuil de Liquidation
                      </p>
                      <p className="font-medium text-lg">
                        {accountData.currentLiquidationThreshold}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Ratio LTV Maximum
                      </p>
                      <p className="font-medium text-lg">{accountData.ltv}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Collatéral Total
                      </p>
                      <p className="font-medium text-lg">
                        {accountData.totalCollateralETH} ETH
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Dette Totale
                      </p>
                      <p className="font-medium text-lg">
                        {accountData.totalDebtETH} ETH
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">
                          Comment fonctionne la liquidation ?
                        </p>
                        <p className="mt-1 text-muted-foreground text-sm">
                          Si votre ratio de collatéralisation tombe en dessous
                          du seuil de liquidation, vos actifs peuvent être
                          liquidés pour rembourser votre dette. Maintenez un
                          ratio sain pour éviter la liquidation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs className="w-full" defaultValue="supply">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="supply">Mes Fournitures</TabsTrigger>
              <TabsTrigger value="borrow">Mes Emprunts</TabsTrigger>
            </TabsList>
            <TabsContent className="space-y-6" value="supply">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PositionCard
                  actionLabel="Gérer"
                  amount="5.2"
                  apy="3.2%"
                  iconUrl="/placeholder.svg?height=40&width=40"
                  name="Ethereum"
                  onDeposit={() =>
                    openTransactionModal('deposit', assets[0], '10')
                  }
                  onWithdraw={() =>
                    openTransactionModal('withdraw', assets[0], '5.2')
                  }
                  symbol="ETH"
                  value="$10,400"
                />
                <PositionCard
                  actionLabel="Gérer"
                  amount="8,500"
                  apy="4.5%"
                  iconUrl="/placeholder.svg?height=40&width=40"
                  name="USD Coin"
                  onDeposit={() =>
                    openTransactionModal('deposit', assets[1], '5000')
                  }
                  onWithdraw={() =>
                    openTransactionModal('withdraw', assets[1], '8500')
                  }
                  symbol="USDC"
                  value="$8,500"
                />
                <PositionCard
                  actionLabel="Gérer"
                  amount="120"
                  apy="3.9%"
                  iconUrl="/placeholder.svg?height=40&width=40"
                  name="Solana"
                  onDeposit={() =>
                    openTransactionModal('deposit', assets[2], '200')
                  }
                  onWithdraw={() =>
                    openTransactionModal('withdraw', assets[2], '120')
                  }
                  symbol="SOL"
                  value="$5,680"
                />
                <Card className="flex h-full flex-col items-center justify-center border-dashed p-6">
                  <Button
                    className="mb-4 h-12 w-12 rounded-full"
                    variant="outline"
                  >
                    +
                  </Button>
                  <p className="text-muted-foreground">
                    Fournir un nouvel actif
                  </p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent className="space-y-6" value="borrow">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PositionCard
                  actionLabel="Rembourser"
                  amount="0.45"
                  apy="4.9%"
                  iconUrl="/placeholder.svg?height=40&width=40"
                  isBorrow={true}
                  name="Bitcoin"
                  onBorrow={() =>
                    openTransactionModal(
                      'borrow',
                      { ...assets[0], name: 'Bitcoin', symbol: 'BTC' },
                      '0.2'
                    )
                  }
                  onRepay={() =>
                    openTransactionModal(
                      'repay',
                      { ...assets[0], name: 'Bitcoin', symbol: 'BTC' },
                      '0.45'
                    )
                  }
                  symbol="BTC"
                  value="$9,200"
                />
                <PositionCard
                  actionLabel="Rembourser"
                  amount="3,150"
                  apy="6.0%"
                  iconUrl="/placeholder.svg?height=40&width=40"
                  isBorrow={true}
                  name="Tether"
                  onBorrow={() =>
                    openTransactionModal(
                      'borrow',
                      { ...assets[1], name: 'Tether', symbol: 'USDT' },
                      '1000'
                    )
                  }
                  onRepay={() =>
                    openTransactionModal(
                      'repay',
                      { ...assets[1], name: 'Tether', symbol: 'USDT' },
                      '3150'
                    )
                  }
                  symbol="USDT"
                  value="$3,150"
                />
                <Card className="flex h-full flex-col items-center justify-center border-dashed p-6">
                  <Button
                    className="mb-4 h-12 w-12 rounded-full"
                    variant="outline"
                  >
                    +
                  </Button>
                  <p className="text-muted-foreground">
                    Emprunter un nouvel actif
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InterestRatesChart
              baseVariableBorrowRate={0.01}
              optimalUtilizationRate={0.8}
              utilizationRate={0.72}
              variableRateSlope1={0.04}
              variableRateSlope2={0.75}
            />

            <div className="space-y-4">
              <h2 className="font-bold text-2xl">
                Historique des Transactions
              </h2>
              <TransactionHistory />
            </div>
          </div>
        </div>
      )}
      {transactionModal.isOpen && (
        <TransactionModal
          asset={transactionModal.asset}
          isOpen={transactionModal.isOpen}
          maxAmount={transactionModal.maxAmount}
          onClose={closeTransactionModal}
          type={transactionModal.type}
        />
      )}
    </div>
  );
}
