import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingBorrowingFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingBorrowingFactoryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'GOVERNOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LENDING_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LIQUIDATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'borrowings',
    outputs: [
      { name: '', internalType: 'contract Borrowing', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collateralToken', internalType: 'address', type: 'address' },
      { name: '_borrowToken', internalType: 'address', type: 'address' },
      {
        name: '_collateralPriceFeed',
        internalType: 'address',
        type: 'address',
      },
      { name: '_borrowPriceFeed', internalType: 'address', type: 'address' },
      {
        name: '_interestRatePerSecond',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_maxBorrowPercentage',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_liquidationThreshold',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_liquidationIncentive',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'createBorrowing',
    outputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    name: 'getBorrowing',
    outputs: [
      { name: '', internalType: 'contract Borrowing', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'borrowingAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'collateralToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'borrowToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'BorrowingCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingDepositTokenFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingDepositTokenFactoryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'GOVERNOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LENDING_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LIQUIDATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'underlyingToken', internalType: 'address', type: 'address' },
      { name: 'liquidityPool', internalType: 'address', type: 'address' },
    ],
    name: 'createDepositToken',
    outputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'depositTokens',
    outputs: [
      { name: '', internalType: 'contract DepositToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    name: 'getDepositToken',
    outputs: [
      { name: '', internalType: 'contract DepositToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'liquidityPool',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DepositTokenCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingLendingPoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingLendingPoolFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_depositTokenFactory',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'GOVERNOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LENDING_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LIQUIDATOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_underlyingToken', internalType: 'address', type: 'address' },
      {
        name: '_interestRatePerSecond',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'createLendingPool',
    outputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositTokenFactory',
    outputs: [
      {
        name: '',
        internalType: 'contract DepositTokenFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'string', type: 'string' }],
    name: 'getLendingPool',
    outputs: [
      { name: '', internalType: 'contract LendingPool', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'lendingPools',
    outputs: [
      { name: '', internalType: 'contract LendingPool', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lendingPoolAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'underlyingToken',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'depositTokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'id', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'interestRatePerSecond',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LendingPoolCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__
 */
export const useReadLendingBorrowingFactory =
  /*#__PURE__*/ createUseReadContract({ abi: lendingBorrowingFactoryAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadLendingBorrowingFactoryDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"GOVERNOR_ROLE"`
 */
export const useReadLendingBorrowingFactoryGovernorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'GOVERNOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"LENDING_ROLE"`
 */
export const useReadLendingBorrowingFactoryLendingRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'LENDING_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"LIQUIDATOR_ROLE"`
 */
export const useReadLendingBorrowingFactoryLiquidatorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'LIQUIDATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"borrowings"`
 */
export const useReadLendingBorrowingFactoryBorrowings =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'borrowings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"getBorrowing"`
 */
export const useReadLendingBorrowingFactoryGetBorrowing =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'getBorrowing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadLendingBorrowingFactoryGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadLendingBorrowingFactoryHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLendingBorrowingFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__
 */
export const useWriteLendingBorrowingFactory =
  /*#__PURE__*/ createUseWriteContract({ abi: lendingBorrowingFactoryAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"createBorrowing"`
 */
export const useWriteLendingBorrowingFactoryCreateBorrowing =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'createBorrowing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteLendingBorrowingFactoryGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteLendingBorrowingFactoryRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteLendingBorrowingFactoryRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__
 */
export const useSimulateLendingBorrowingFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: lendingBorrowingFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"createBorrowing"`
 */
export const useSimulateLendingBorrowingFactoryCreateBorrowing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'createBorrowing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateLendingBorrowingFactoryGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateLendingBorrowingFactoryRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateLendingBorrowingFactoryRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingBorrowingFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__
 */
export const useWatchLendingBorrowingFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lendingBorrowingFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `eventName` set to `"BorrowingCreated"`
 */
export const useWatchLendingBorrowingFactoryBorrowingCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingBorrowingFactoryAbi,
    eventName: 'BorrowingCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchLendingBorrowingFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingBorrowingFactoryAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchLendingBorrowingFactoryRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingBorrowingFactoryAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingBorrowingFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchLendingBorrowingFactoryRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingBorrowingFactoryAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__
 */
export const useReadLendingDepositTokenFactory =
  /*#__PURE__*/ createUseReadContract({ abi: lendingDepositTokenFactoryAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadLendingDepositTokenFactoryDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"GOVERNOR_ROLE"`
 */
export const useReadLendingDepositTokenFactoryGovernorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'GOVERNOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"LENDING_ROLE"`
 */
export const useReadLendingDepositTokenFactoryLendingRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'LENDING_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"LIQUIDATOR_ROLE"`
 */
export const useReadLendingDepositTokenFactoryLiquidatorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'LIQUIDATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"depositTokens"`
 */
export const useReadLendingDepositTokenFactoryDepositTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"getDepositToken"`
 */
export const useReadLendingDepositTokenFactoryGetDepositToken =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'getDepositToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadLendingDepositTokenFactoryGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadLendingDepositTokenFactoryHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLendingDepositTokenFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__
 */
export const useWriteLendingDepositTokenFactory =
  /*#__PURE__*/ createUseWriteContract({ abi: lendingDepositTokenFactoryAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"createDepositToken"`
 */
export const useWriteLendingDepositTokenFactoryCreateDepositToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'createDepositToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteLendingDepositTokenFactoryGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteLendingDepositTokenFactoryRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteLendingDepositTokenFactoryRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__
 */
export const useSimulateLendingDepositTokenFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingDepositTokenFactoryAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"createDepositToken"`
 */
export const useSimulateLendingDepositTokenFactoryCreateDepositToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'createDepositToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateLendingDepositTokenFactoryGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateLendingDepositTokenFactoryRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateLendingDepositTokenFactoryRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingDepositTokenFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__
 */
export const useWatchLendingDepositTokenFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingDepositTokenFactoryAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `eventName` set to `"DepositTokenCreated"`
 */
export const useWatchLendingDepositTokenFactoryDepositTokenCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingDepositTokenFactoryAbi,
    eventName: 'DepositTokenCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchLendingDepositTokenFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingDepositTokenFactoryAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchLendingDepositTokenFactoryRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingDepositTokenFactoryAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingDepositTokenFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchLendingDepositTokenFactoryRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingDepositTokenFactoryAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__
 */
export const useReadLendingLendingPoolFactory =
  /*#__PURE__*/ createUseReadContract({ abi: lendingLendingPoolFactoryAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadLendingLendingPoolFactoryDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"GOVERNOR_ROLE"`
 */
export const useReadLendingLendingPoolFactoryGovernorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'GOVERNOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"LENDING_ROLE"`
 */
export const useReadLendingLendingPoolFactoryLendingRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'LENDING_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"LIQUIDATOR_ROLE"`
 */
export const useReadLendingLendingPoolFactoryLiquidatorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'LIQUIDATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"depositTokenFactory"`
 */
export const useReadLendingLendingPoolFactoryDepositTokenFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'depositTokenFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"getLendingPool"`
 */
export const useReadLendingLendingPoolFactoryGetLendingPool =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'getLendingPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadLendingLendingPoolFactoryGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadLendingLendingPoolFactoryHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"lendingPools"`
 */
export const useReadLendingLendingPoolFactoryLendingPools =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'lendingPools',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLendingLendingPoolFactorySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__
 */
export const useWriteLendingLendingPoolFactory =
  /*#__PURE__*/ createUseWriteContract({ abi: lendingLendingPoolFactoryAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"createLendingPool"`
 */
export const useWriteLendingLendingPoolFactoryCreateLendingPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'createLendingPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteLendingLendingPoolFactoryGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteLendingLendingPoolFactoryRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteLendingLendingPoolFactoryRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__
 */
export const useSimulateLendingLendingPoolFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: lendingLendingPoolFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"createLendingPool"`
 */
export const useSimulateLendingLendingPoolFactoryCreateLendingPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'createLendingPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateLendingLendingPoolFactoryGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateLendingLendingPoolFactoryRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateLendingLendingPoolFactoryRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingLendingPoolFactoryAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__
 */
export const useWatchLendingLendingPoolFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingLendingPoolFactoryAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `eventName` set to `"LendingPoolCreated"`
 */
export const useWatchLendingLendingPoolFactoryLendingPoolCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingLendingPoolFactoryAbi,
    eventName: 'LendingPoolCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchLendingLendingPoolFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingLendingPoolFactoryAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchLendingLendingPoolFactoryRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingLendingPoolFactoryAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingLendingPoolFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchLendingLendingPoolFactoryRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingLendingPoolFactoryAbi,
    eventName: 'RoleRevoked',
  })
