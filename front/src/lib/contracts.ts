export const CONTRACT_ADDRESSES = {
  // Protocol Access Control contract
  PROTOCOL_ACCESS_CONTROL: process.env
    .NEXT_PUBLIC_PROTOCOL_ACCESS_CONTROL_CONTRACT_ADDRESS as `0x${string}`,

  // Factory contracts
  LENDING_POOL_FACTORY: process.env
    .NEXT_PUBLIC_LENDING_POOL_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
  DEPOSIT_TOKEN_FACTORY: process.env
    .NEXT_PUBLIC_DEPOSIT_TOKEN_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
  BORROWING_FACTORY: process.env
    .NEXT_PUBLIC_BORROWING_FACTORY_CONTRACT_ADDRESS as `0x${string}`,
} as const;

// Export individual addresses for convenience
export const {
  PROTOCOL_ACCESS_CONTROL,
  LENDING_POOL_FACTORY,
  DEPOSIT_TOKEN_FACTORY,
  BORROWING_FACTORY,
} = CONTRACT_ADDRESSES;
