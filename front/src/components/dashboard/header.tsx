import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../theme-provider';
import { Button } from '../ui/button';
import { WalletConnect } from '../wallet-connect';

export const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link className="flex items-center gap-2 font-bold text-xl" href="/">
          <Wallet className="h-6 w-6" />
          <span>DeFi Lending</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/app">Explore</Link>
          </Button>
          <Button asChild>
            <Link href="/app/dashboard">Dashboard</Link>
          </Button>
          <WalletConnect />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
