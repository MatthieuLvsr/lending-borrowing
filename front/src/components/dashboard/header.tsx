import { Wallet } from "lucide-react";
import Link from "next/link";
import { WalletConnect } from "../wallet-connect";

export const Header = () => {
  return (
    <header className="border-b flex flex-col justify-center items-center">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href='/' className="flex items-center gap-2 font-bold text-xl">
          <Wallet className="h-6 w-6" />
          <span>DeFi Lending</span>
        </Link>
        <div className="flex items-center gap-4">
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};
