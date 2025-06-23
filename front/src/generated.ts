import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Borrowing
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const borrowingAbi = [
  {
    type: 'constructor',
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
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'borrowPriceFeed',
    outputs: [
      {
        name: '',
        internalType: 'contract AggregatorV3Interface',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'borrowToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralPriceFeed',
    outputs: [
      {
        name: '',
        internalType: 'contract AggregatorV3Interface',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'priceFeed',
        internalType: 'contract AggregatorV3Interface',
        type: 'address',
      },
    ],
    name: 'getLatestPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'interestRatePerSecond',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'repayAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'liquidateLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidationIncentive',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'liquidationThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'loans',
    outputs: [
      { name: 'collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'borrowedAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'lastAccrued', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxBorrowPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_borrower', internalType: 'address', type: 'address' }],
    name: 'triggerAccrual',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Borrowed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CollateralDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'liquidator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'repayAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'collateralSeized',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Liquidated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Repaid',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BorrowingFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const borrowingFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DepositToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const depositTokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DepositTokenFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const depositTokenFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_underlyingToken', internalType: 'address', type: 'address' },
      { name: '_depositToken', internalType: 'address', type: 'address' },
      {
        name: '_interestRatePerSecond',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'depositToken',
    outputs: [
      { name: '', internalType: 'contract DepositToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'exchangeRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'interestRatePerSecond',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastAccrualTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setInterestRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'underlyingToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'underlyingAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'underlyingAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingPoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingPoolFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_depositTokenFactory',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_protocolAccessControl',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'lendingPools',
    outputs: [
      { name: '', internalType: 'contract LendingPool', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolAccessControl',
    outputs: [
      {
        name: '',
        internalType: 'contract ProtocolAccessControl',
        type: 'address',
      },
    ],
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProtocolAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const protocolAccessControlAbi = [
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__
 */
export const useReadBorrowing = /*#__PURE__*/ createUseReadContract({
  abi: borrowingAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"borrowPriceFeed"`
 */
export const useReadBorrowingBorrowPriceFeed =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'borrowPriceFeed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"borrowToken"`
 */
export const useReadBorrowingBorrowToken = /*#__PURE__*/ createUseReadContract({
  abi: borrowingAbi,
  functionName: 'borrowToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"collateralPriceFeed"`
 */
export const useReadBorrowingCollateralPriceFeed =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'collateralPriceFeed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"collateralToken"`
 */
export const useReadBorrowingCollateralToken =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'collateralToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"getLatestPrice"`
 */
export const useReadBorrowingGetLatestPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'getLatestPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"interestRatePerSecond"`
 */
export const useReadBorrowingInterestRatePerSecond =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'interestRatePerSecond',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"liquidationIncentive"`
 */
export const useReadBorrowingLiquidationIncentive =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'liquidationIncentive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"liquidationThreshold"`
 */
export const useReadBorrowingLiquidationThreshold =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'liquidationThreshold',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"loans"`
 */
export const useReadBorrowingLoans = /*#__PURE__*/ createUseReadContract({
  abi: borrowingAbi,
  functionName: 'loans',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"maxBorrowPercentage"`
 */
export const useReadBorrowingMaxBorrowPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'maxBorrowPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadBorrowingProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__
 */
export const useWriteBorrowing = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"borrow"`
 */
export const useWriteBorrowingBorrow = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingAbi,
  functionName: 'borrow',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"depositCollateral"`
 */
export const useWriteBorrowingDepositCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingAbi,
    functionName: 'depositCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"liquidateLoan"`
 */
export const useWriteBorrowingLiquidateLoan =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingAbi,
    functionName: 'liquidateLoan',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"repay"`
 */
export const useWriteBorrowingRepay = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingAbi,
  functionName: 'repay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"triggerAccrual"`
 */
export const useWriteBorrowingTriggerAccrual =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingAbi,
    functionName: 'triggerAccrual',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__
 */
export const useSimulateBorrowing = /*#__PURE__*/ createUseSimulateContract({
  abi: borrowingAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"borrow"`
 */
export const useSimulateBorrowingBorrow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingAbi,
    functionName: 'borrow',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"depositCollateral"`
 */
export const useSimulateBorrowingDepositCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingAbi,
    functionName: 'depositCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"liquidateLoan"`
 */
export const useSimulateBorrowingLiquidateLoan =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingAbi,
    functionName: 'liquidateLoan',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"repay"`
 */
export const useSimulateBorrowingRepay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingAbi,
    functionName: 'repay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingAbi}__ and `functionName` set to `"triggerAccrual"`
 */
export const useSimulateBorrowingTriggerAccrual =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingAbi,
    functionName: 'triggerAccrual',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingAbi}__
 */
export const useWatchBorrowingEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: borrowingAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingAbi}__ and `eventName` set to `"Borrowed"`
 */
export const useWatchBorrowingBorrowedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingAbi,
    eventName: 'Borrowed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingAbi}__ and `eventName` set to `"CollateralDeposited"`
 */
export const useWatchBorrowingCollateralDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingAbi,
    eventName: 'CollateralDeposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingAbi}__ and `eventName` set to `"Liquidated"`
 */
export const useWatchBorrowingLiquidatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingAbi,
    eventName: 'Liquidated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingAbi}__ and `eventName` set to `"Repaid"`
 */
export const useWatchBorrowingRepaidEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingAbi,
    eventName: 'Repaid',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingFactoryAbi}__
 */
export const useReadBorrowingFactory = /*#__PURE__*/ createUseReadContract({
  abi: borrowingFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `functionName` set to `"borrowings"`
 */
export const useReadBorrowingFactoryBorrowings =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingFactoryAbi,
    functionName: 'borrowings',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `functionName` set to `"getBorrowing"`
 */
export const useReadBorrowingFactoryGetBorrowing =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingFactoryAbi,
    functionName: 'getBorrowing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadBorrowingFactoryProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: borrowingFactoryAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingFactoryAbi}__
 */
export const useWriteBorrowingFactory = /*#__PURE__*/ createUseWriteContract({
  abi: borrowingFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `functionName` set to `"createBorrowing"`
 */
export const useWriteBorrowingFactoryCreateBorrowing =
  /*#__PURE__*/ createUseWriteContract({
    abi: borrowingFactoryAbi,
    functionName: 'createBorrowing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingFactoryAbi}__
 */
export const useSimulateBorrowingFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: borrowingFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `functionName` set to `"createBorrowing"`
 */
export const useSimulateBorrowingFactoryCreateBorrowing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: borrowingFactoryAbi,
    functionName: 'createBorrowing',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingFactoryAbi}__
 */
export const useWatchBorrowingFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: borrowingFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link borrowingFactoryAbi}__ and `eventName` set to `"BorrowingCreated"`
 */
export const useWatchBorrowingFactoryBorrowingCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: borrowingFactoryAbi,
    eventName: 'BorrowingCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__
 */
export const useReadDepositToken = /*#__PURE__*/ createUseReadContract({
  abi: depositTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadDepositTokenAllowance = /*#__PURE__*/ createUseReadContract(
  { abi: depositTokenAbi, functionName: 'allowance' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadDepositTokenBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: depositTokenAbi, functionName: 'balanceOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadDepositTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: depositTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadDepositTokenName = /*#__PURE__*/ createUseReadContract({
  abi: depositTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadDepositTokenProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: depositTokenAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadDepositTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: depositTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadDepositTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: depositTokenAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__
 */
export const useWriteDepositToken = /*#__PURE__*/ createUseWriteContract({
  abi: depositTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteDepositTokenApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: depositTokenAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteDepositTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: depositTokenAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteDepositTokenDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: depositTokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteDepositTokenIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: depositTokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteDepositTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: depositTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteDepositTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: depositTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteDepositTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: depositTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__
 */
export const useSimulateDepositToken = /*#__PURE__*/ createUseSimulateContract({
  abi: depositTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateDepositTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateDepositTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateDepositTokenDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateDepositTokenIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateDepositTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateDepositTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateDepositTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link depositTokenAbi}__
 */
export const useWatchDepositTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: depositTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link depositTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchDepositTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: depositTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link depositTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchDepositTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: depositTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__
 */
export const useReadDepositTokenFactory = /*#__PURE__*/ createUseReadContract({
  abi: depositTokenFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `functionName` set to `"depositTokens"`
 */
export const useReadDepositTokenFactoryDepositTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: depositTokenFactoryAbi,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `functionName` set to `"getDepositToken"`
 */
export const useReadDepositTokenFactoryGetDepositToken =
  /*#__PURE__*/ createUseReadContract({
    abi: depositTokenFactoryAbi,
    functionName: 'getDepositToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadDepositTokenFactoryProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: depositTokenFactoryAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__
 */
export const useWriteDepositTokenFactory = /*#__PURE__*/ createUseWriteContract(
  { abi: depositTokenFactoryAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `functionName` set to `"createDepositToken"`
 */
export const useWriteDepositTokenFactoryCreateDepositToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: depositTokenFactoryAbi,
    functionName: 'createDepositToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__
 */
export const useSimulateDepositTokenFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: depositTokenFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `functionName` set to `"createDepositToken"`
 */
export const useSimulateDepositTokenFactoryCreateDepositToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: depositTokenFactoryAbi,
    functionName: 'createDepositToken',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link depositTokenFactoryAbi}__
 */
export const useWatchDepositTokenFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: depositTokenFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link depositTokenFactoryAbi}__ and `eventName` set to `"DepositTokenCreated"`
 */
export const useWatchDepositTokenFactoryDepositTokenCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: depositTokenFactoryAbi,
    eventName: 'DepositTokenCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useReadLendingPool = /*#__PURE__*/ createUseReadContract({
  abi: lendingPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"depositToken"`
 */
export const useReadLendingPoolDepositToken =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'depositToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"exchangeRate"`
 */
export const useReadLendingPoolExchangeRate =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'exchangeRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"interestRatePerSecond"`
 */
export const useReadLendingPoolInterestRatePerSecond =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'interestRatePerSecond',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"lastAccrualTimestamp"`
 */
export const useReadLendingPoolLastAccrualTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'lastAccrualTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadLendingPoolProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"underlyingToken"`
 */
export const useReadLendingPoolUnderlyingToken =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    functionName: 'underlyingToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useWriteLendingPool = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteLendingPoolDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setInterestRate"`
 */
export const useWriteLendingPoolSetInterestRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    functionName: 'setInterestRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLendingPoolWithdraw = /*#__PURE__*/ createUseWriteContract(
  { abi: lendingPoolAbi, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useSimulateLendingPool = /*#__PURE__*/ createUseSimulateContract({
  abi: lendingPoolAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateLendingPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setInterestRate"`
 */
export const useSimulateLendingPoolSetInterestRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    functionName: 'setInterestRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLendingPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useWatchLendingPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lendingPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchLendingPoolDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchLendingPoolWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__
 */
export const useReadLendingPoolFactory = /*#__PURE__*/ createUseReadContract({
  abi: lendingPoolFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"depositTokenFactory"`
 */
export const useReadLendingPoolFactoryDepositTokenFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'depositTokenFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"getLendingPool"`
 */
export const useReadLendingPoolFactoryGetLendingPool =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'getLendingPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"lendingPools"`
 */
export const useReadLendingPoolFactoryLendingPools =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'lendingPools',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"protocolAccessControl"`
 */
export const useReadLendingPoolFactoryProtocolAccessControl =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'protocolAccessControl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__
 */
export const useWriteLendingPoolFactory = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"createLendingPool"`
 */
export const useWriteLendingPoolFactoryCreateLendingPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'createLendingPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__
 */
export const useSimulateLendingPoolFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: lendingPoolFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `functionName` set to `"createLendingPool"`
 */
export const useSimulateLendingPoolFactoryCreateLendingPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolFactoryAbi,
    functionName: 'createLendingPool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolFactoryAbi}__
 */
export const useWatchLendingPoolFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lendingPoolFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolFactoryAbi}__ and `eventName` set to `"LendingPoolCreated"`
 */
export const useWatchLendingPoolFactoryLendingPoolCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolFactoryAbi,
    eventName: 'LendingPoolCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__
 */
export const useReadProtocolAccessControl = /*#__PURE__*/ createUseReadContract(
  { abi: protocolAccessControlAbi },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadProtocolAccessControlDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"GOVERNOR_ROLE"`
 */
export const useReadProtocolAccessControlGovernorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'GOVERNOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"LENDING_ROLE"`
 */
export const useReadProtocolAccessControlLendingRole =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'LENDING_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"LIQUIDATOR_ROLE"`
 */
export const useReadProtocolAccessControlLiquidatorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'LIQUIDATOR_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadProtocolAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadProtocolAccessControlHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadProtocolAccessControlSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolAccessControlAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link protocolAccessControlAbi}__
 */
export const useWriteProtocolAccessControl =
  /*#__PURE__*/ createUseWriteContract({ abi: protocolAccessControlAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteProtocolAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: protocolAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteProtocolAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: protocolAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteProtocolAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: protocolAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link protocolAccessControlAbi}__
 */
export const useSimulateProtocolAccessControl =
  /*#__PURE__*/ createUseSimulateContract({ abi: protocolAccessControlAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateProtocolAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: protocolAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateProtocolAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: protocolAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateProtocolAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: protocolAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link protocolAccessControlAbi}__
 */
export const useWatchProtocolAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: protocolAccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchProtocolAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: protocolAccessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchProtocolAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: protocolAccessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link protocolAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchProtocolAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: protocolAccessControlAbi,
    eventName: 'RoleRevoked',
  })
