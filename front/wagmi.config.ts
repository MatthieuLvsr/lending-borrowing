import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
	out: "src/generated.ts",
	plugins: [
		react(),
		foundry({
			forge: {
				clean: true,
				build: true,
				rebuild: true,
			},
			project: "../contracts",
			namePrefix: "Lending",
			include: [
				"BorrowingFactory.json",
				"DepositTokenFactory.json",
				"LendingPoolFactory.json",
			],
			deployments: {
				DepositTokenFactory: process.env
					.NEXT_PUBLIC_DEPOSIT_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
				LendingPoolFactory: process.env
					.NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
				BorrowingFactory: process.env
					.NEXT_PUBLIC_BORROWING_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
			},
		}),
	],
});
