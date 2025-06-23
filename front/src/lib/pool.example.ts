import {
	getAllPools,
	getPoolInformation,
	getPools,
	getPoolsCount,
} from "./pool.action";

/**
 * Example usage of the new pagination-based pool functions
 * This file demonstrates how to use the updated pool.action.ts functions
 * instead of the old event-based approach.
 */

// Example 1: Get pools with pagination
export const exampleGetPoolsPaginated = async () => {
	console.log("=== Example: Get Pools with Pagination ===");

	try {
		// Get first page of pools (limit 10)
		const firstPage = await getPools(0, 10);
		console.log(`Total pools: ${firstPage.total}`);
		console.log(`Pools on page 1: ${firstPage.pools.length}`);

		firstPage.pools.forEach((pool, index) => {
			console.log(`Pool ${index + 1}:`);
			console.log(`  ID: ${pool.id}`);
			console.log(`  Lending Pool Address: ${pool.lendingPoolAddress}`);
			console.log(`  Underlying Token: ${pool.underlyingToken}`);
			console.log(`  Deposit Token: ${pool.depositTokenAddress}`);
			console.log(`  Interest Rate: ${pool.interestRatePerSecond.toString()}`);
		});

		// Get second page if there are more pools
		if (firstPage.total > 10) {
			const secondPage = await getPools(10, 10);
			console.log(`\nPools on page 2: ${secondPage.pools.length}`);
		}

		return firstPage;
	} catch (error) {
		console.error("Error getting paginated pools:", error);
		throw error;
	}
};

// Example 2: Get all pools at once
export const exampleGetAllPools = async () => {
	console.log("\n=== Example: Get All Pools ===");

	try {
		const allPools = await getAllPools();
		console.log(`Total pools retrieved: ${allPools.length}`);

		// Group pools by underlying token type
		const poolsByToken = allPools.reduce(
			(acc, pool) => {
				if (!acc[pool.id]) {
					acc[pool.id] = [];
				}
				acc[pool.id].push(pool);
				return acc;
			},
			{} as Record<string, typeof allPools>,
		);

		console.log("Pools grouped by token:");
		Object.entries(poolsByToken).forEach(([tokenId, pools]) => {
			console.log(`  ${tokenId}: ${pools.length} pool(s)`);
		});

		return allPools;
	} catch (error) {
		console.error("Error getting all pools:", error);
		throw error;
	}
};

// Example 3: Get pool count
export const exampleGetPoolsCount = async () => {
	console.log("\n=== Example: Get Pools Count ===");

	try {
		const count = await getPoolsCount();
		console.log(`Total number of pools: ${count}`);
		return count;
	} catch (error) {
		console.error("Error getting pools count:", error);
		throw error;
	}
};

// Example 4: Get detailed pool information
export const exampleGetPoolInformation = async (poolId: string) => {
	console.log(`\n=== Example: Get Pool Information for ${poolId} ===`);

	try {
		const poolInfo = await getPoolInformation(poolId);
		console.log(`Asset: ${poolInfo.asset}`);
		console.log(
			`Interest Rate Per Second: ${poolInfo.interestRatePerSecond.toString()}`,
		);

		// Calculate APY from interest rate per second
		const secondsPerYear = 365 * 24 * 60 * 60;
		const annualRate = Number(poolInfo.interestRatePerSecond) * secondsPerYear;
		const apy = (annualRate / 1e18) * 100; // Convert from wei and to percentage
		console.log(`Approximate APY: ${apy.toFixed(2)}%`);

		return poolInfo;
	} catch (error) {
		console.error(`Error getting pool information for ${poolId}:`, error);
		throw error;
	}
};

// Example 5: Comprehensive pool analysis
export const examplePoolAnalysis = async () => {
	console.log("\n=== Example: Comprehensive Pool Analysis ===");

	try {
		// Get all pools
		const allPools = await getAllPools();

		if (allPools.length === 0) {
			console.log("No pools found.");
			return;
		}

		console.log(`Analyzing ${allPools.length} pools...`);

		// Get detailed information for each pool
		const poolAnalysis = await Promise.all(
			allPools.map(async (pool) => {
				try {
					const poolInfo = await getPoolInformation(pool.id);
					return {
						...pool,
						detailedInfo: poolInfo,
					};
				} catch (error) {
					console.warn(
						`Failed to get detailed info for pool ${pool.id}:`,
						error,
					);
					return {
						...pool,
						detailedInfo: null,
					};
				}
			}),
		);

		// Find pool with highest interest rate
		const poolWithHighestRate = poolAnalysis.reduce((highest, current) => {
			if (!highest.detailedInfo || !current.detailedInfo) return highest;
			return current.detailedInfo.interestRatePerSecond >
				highest.detailedInfo.interestRatePerSecond
				? current
				: highest;
		});

		if (poolWithHighestRate.detailedInfo) {
			console.log(`\nPool with highest interest rate:`);
			console.log(`  ID: ${poolWithHighestRate.id}`);
			console.log(
				`  Rate: ${poolWithHighestRate.detailedInfo.interestRatePerSecond.toString()}`,
			);
		}

		// Summary statistics
		const totalPools = poolAnalysis.length;
		const poolsWithInfo = poolAnalysis.filter(
			(p) => p.detailedInfo !== null,
		).length;

		console.log(`\nSummary:`);
		console.log(`  Total pools: ${totalPools}`);
		console.log(`  Pools with detailed info: ${poolsWithInfo}`);
		console.log(
			`  Success rate: ${((poolsWithInfo / totalPools) * 100).toFixed(1)}%`,
		);

		return poolAnalysis;
	} catch (error) {
		console.error("Error in pool analysis:", error);
		throw error;
	}
};

// Example 6: Real-time pool monitoring with pagination
export const examplePoolMonitoring = async (pageSize: number = 20) => {
	console.log(`\n=== Example: Pool Monitoring (Page Size: ${pageSize}) ===`);

	try {
		let offset = 0;
		let totalProcessed = 0;
		let hasMore = true;

		while (hasMore) {
			const { pools, total } = await getPools(offset, pageSize);

			console.log(`\nProcessing page ${Math.floor(offset / pageSize) + 1}:`);
			console.log(`  Pools in this page: ${pools.length}`);
			console.log(`  Total pools: ${total}`);

			// Process each pool in the current page
			for (const pool of pools) {
				console.log(`  Processing pool: ${pool.id}`);
				// Here you could add monitoring logic, alerts, etc.
			}

			totalProcessed += pools.length;
			offset += pageSize;
			hasMore = offset < total;

			// Add a small delay to avoid overwhelming the network
			if (hasMore) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}

		console.log(`\nMonitoring complete. Processed ${totalProcessed} pools.`);
		return totalProcessed;
	} catch (error) {
		console.error("Error in pool monitoring:", error);
		throw error;
	}
};

// Example usage function that runs all examples
export const runAllExamples = async () => {
	console.log("🚀 Running all pool action examples...\n");

	try {
		await exampleGetPoolsCount();
		await exampleGetPoolsPaginated();
		await exampleGetAllPools();

		// Try to get information for a specific pool if any exist
		const { pools } = await getPools(0, 1);
		if (pools.length > 0) {
			await exampleGetPoolInformation(pools[0].id);
		}

		await examplePoolAnalysis();
		await examplePoolMonitoring(5); // Small page size for demo

		console.log("\n✅ All examples completed successfully!");
	} catch (error) {
		console.error("\n❌ Error running examples:", error);
	}
};

// Export types for convenience
export type { Pool, Pools } from "./pool.action";
