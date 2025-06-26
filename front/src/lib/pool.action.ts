'use server';

import { readContract } from '@wagmi/core';
import { lendingPoolAbi, lendingPoolFactoryAbi } from '@/generated';
import { config } from './wallet';

export const getPoolInformation = async (asset: string) => {
  const poolAddress = await readContract(config, {
    address: process.env
      .NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
    abi: lendingPoolFactoryAbi,
    functionName: 'getLendingPool',
    args: [asset],
  });

  const interestRatePerSecond = await readContract(config, {
    address: poolAddress,
    abi: lendingPoolAbi,
    functionName: 'interestRatePerSecond',
  });

  return {
    asset,
    interestRatePerSecond,
  };
};

export const getPoolsCount = async () => {
  const count = await readContract(config, {
    address: process.env
      .NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
    abi: lendingPoolFactoryAbi,
    functionName: 'getLendingPoolsCount',
  });

  return count;
};

export const getPools = async (offset = 0) => {
  const [pools, _] = await readContract(config, {
    address: process.env
      .NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
    abi: lendingPoolFactoryAbi,
    functionName: 'getLendingPoolsPaginated',
    args: [BigInt(offset), BigInt(100)],
  });

  return pools.map((pool) => ({
    lendingPoolAddress: pool.lendingPoolAddress,
    underlyingToken: pool.underlyingToken,
    depositTokenAddress: pool.depositTokenAddress,
    id: pool.id,
    interestRatePerSecond: pool.interestRatePerSecond,
  }));
};

export type Pools = Required<Awaited<ReturnType<typeof getPools>>>;

// Deprecated, now using array instead of mappings and events
// export const publicClient = createPublicClient({
// 	chain: sepolia,
// 	transport: http(),
// });
// export const getPoolsUsingEvents = async () => {
// 	const blockNumber = await publicClient.getBlockNumber();
// 	const logs = await publicClient.getContractEvents({
// 		address: process.env
// 			.NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
// 		abi: lendingPoolFactoryAbi,
// 		eventName: "LendingPoolCreated",
// 		fromBlock: blockNumber - BigInt(9999),
// 		toBlock: blockNumber,
// 	});
// 	return logs.map((log) => {
// 		if (
// 			!log.args.lendingPoolAddress ||
// 			!log.args.underlyingToken ||
// 			!log.args.depositTokenAddress ||
// 			!log.args.id ||
// 			!log.args.interestRatePerSecond
// 		) {
// 			throw new Error("Missing required fields in log args");
// 		}

// 		return {
// 			lendingPoolAddress: log.args.lendingPoolAddress,
// 			underlyingToken: log.args.underlyingToken,
// 			depositTokenAddress: log.args.depositTokenAddress,
// 			id: log.args.id,
// 			interestRatePerSecond: log.args.interestRatePerSecond,
// 		};
// 	});
// };

// export type DeprecatedPools = Required<Awaited<ReturnType<typeof getPools>>>;
