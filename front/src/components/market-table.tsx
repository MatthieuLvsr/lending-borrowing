import Image from 'next/image';
import { SupplyDialog } from '@/components/supply';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Pools } from '@/lib/pool.action';

interface MarketTableProps {
  filter?: string;
  pools: Pools;
}

export function MarketTable({ pools }: MarketTableProps) {
  // const filteredMarkets = filter === "all" ? pools : pools.filter((pool) => pool.category === filter)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Wallet Balance</TableHead>
            <TableHead>Lending APY</TableHead>
            <TableHead>Borrowing APY</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.map((pool) => (
            <TableRow key={pool.lendingPoolAddress}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt={pool.id}
                    className="rounded-full"
                    height={24}
                    src={'/placeholder.svg'}
                    width={24}
                  />
                  <div>
                    <div className="font-medium">{pool.id}</div>
                    <div className="text-muted-foreground text-xs">
                      {pool.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{'Balance'}</TableCell>
              <TableCell className="text-green-500">
                {pool.interestRatePerSecond}
              </TableCell>
              <TableCell className="text-green-500">
                {pool.interestRatePerSecond}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <SupplyDialog pool={pool} />
                  <Button size="sm">Borrow</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
