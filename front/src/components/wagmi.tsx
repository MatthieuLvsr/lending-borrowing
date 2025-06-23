"use client";

import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "@wagmi/core/chains";
import type { ReactNode } from "react";
import { type Config, cookieToInitialState, WagmiProvider } from "wagmi";
import { projectId, wagmiAdapter } from "../lib/wallet";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
	throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
	name: "lending-borrowing",
	description: "AppKit Example",
	url: "https://reown.com/appkit", // origin must match your domain & subdomain
	icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
export const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [sepolia],
	defaultNetwork: sepolia,
	metadata: metadata,
	allowUnsupportedChain: true,
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
	},
});

function ContextProvider({
	children,
	cookies,
}: {
	children: ReactNode;
	cookies: string | null;
}) {
	const initialState = cookieToInitialState(
		wagmiAdapter.wagmiConfig as Config,
		cookies,
	);

	return (
		<WagmiProvider
			config={wagmiAdapter.wagmiConfig as Config}
			initialState={initialState}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}

export default ContextProvider;
