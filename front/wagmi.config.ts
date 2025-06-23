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
			include: [
				"BorrowingFactory.json",
				"DepositTokenFactory.json",
				"LendingPoolFactory.json",
				"Borrowing.json",
				"DepositToken.json",
				"LendingPool.json",
				"ProtocolAccessControl.json",
			],
			deployments: {
				DepositTokenFactory: process.env
					.NEXT_PUBLIC_DEPOSIT_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
				LendingPoolFactory: process.env
					.NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
				BorrowingFactory: process.env
					.NEXT_PUBLIC_BORROWING_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
				ProtocolAccessControl: process.env
					.NEXT_PUBLIC_PROTOCOL_ACCESS_CONTROL_CONTRACT_ADDRESS as `0x${string}`,
			},
		}),
	],
});
