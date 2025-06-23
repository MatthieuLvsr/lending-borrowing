import { readContract } from "@wagmi/core";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { lendingPoolAbi, lendingPoolFactoryAbi } from "@/generated";
import { config } from "./wallet";

export const getPoolInformation = async (asset: string) => {
	const poolAddress = await readContract(config, {
		address: process.env
			.NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
		abi: lendingPoolFactoryAbi,
		functionName: "getLendingPool",
		args: [asset],
	});

	const interestRatePerSecond = await readContract(config, {
		address: poolAddress,
		abi: lendingPoolAbi,
		functionName: "interestRatePerSecond",
	});

	return {
		asset: asset,
		interestRatePerSecond,
	};
};

export const publicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
});

export const getPools = async () => {
	const blockNumber = await publicClient.getBlockNumber();
	const logs = await publicClient.getContractEvents({
		address: process.env
			.NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
		abi: lendingPoolFactoryAbi,
		eventName: "LendingPoolCreated",
		fromBlock: blockNumber - BigInt(9999),
		toBlock: blockNumber,
	});
	return logs.map((log) => {
		if (
			!log.args.lendingPoolAddress ||
			!log.args.underlyingToken ||
			!log.args.depositTokenAddress ||
			!log.args.id ||
			!log.args.interestRatePerSecond
		) {
			throw new Error("Missing required fields in log args");
		}

		return {
			lendingPoolAddress: log.args.lendingPoolAddress,
			underlyingToken: log.args.underlyingToken,
			depositTokenAddress: log.args.depositTokenAddress,
			id: log.args.id,
			interestRatePerSecond: log.args.interestRatePerSecond,
		};
	});
};

export type Pools = Required<Awaited<ReturnType<typeof getPools>>>;
