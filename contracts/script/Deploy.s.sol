// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {ProtocolAccessControl} from "../src/ProtocolAccessControl.sol";
import {DepositTokenFactory} from "../src/DepositTokenFactory.sol";
import {LendingPoolFactory} from "../src/LendingPoolFactory.sol";
import {BorrowingFactory} from "../src/BorrowingFactory.sol";

contract Deploy is Script {
    // Core contracts
    ProtocolAccessControl public protocolAccessControl;
    DepositTokenFactory public depositTokenFactory;
    LendingPoolFactory public lendingPoolFactory;
    BorrowingFactory public borrowingFactory;

    // Chain-specific variables
    uint256 public chainId = block.chainid;

    // Example token addresses and Chainlink price feeds (to be replaced with actual addresses)
    address public collateralToken; // e.g., DAI
    address public borrowToken; // e.g., USDC
    address public collateralPriceFeed; // Chainlink price feed for collateral token
    address public borrowPriceFeed; // Chainlink price feed for borrow token

    // Protocol parameters
    uint256 public interestRatePerSecond = 3170979198; // ~10% annual interest rate (scaled to 1e18)
    uint256 public maxBorrowPercentage = 75; // 75% of collateral value
    uint256 public liquidationThreshold = 15000; // 150% collateralization threshold (in basis points)
    uint256 public liquidationIncentive = 500; // 5% liquidation bonus (in basis points)

    // Chainlink Data Feed -> https://docs.chain.link/data-feeds/price-feeds/addresses?page=1
    function setUp() public {
        if (chainId == 11155111) {
            // Sepolia Testnet
            collateralToken = 0x68194a729C2450ad26072b3D33ADaCbcef39D574; // Replace with actual DAI address on Sepolia
            borrowToken = 0xf08A50178dfcDe18524640EA6618a1f965821715; // Replace with actual USDC address on Sepolia
            collateralPriceFeed = 0x14866185B1962B63C3Ea9E03Bc1da838bab34C19; // Replace with Chainlink DAI/USD price feed on Sepolia
            borrowPriceFeed = 0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E; // Replace with Chainlink USDC/USD price feed on Sepolia
        } else if (chainId == 1) {
            // Ethereum Mainnet
            collateralToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // DAI
            borrowToken = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // USDC
            collateralPriceFeed = 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9; // Chainlink DAI/USD price feed
            borrowPriceFeed = 0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6; // Chainlink USDC/USD price feed
        } else {
            revert("Unsupported network");
        }
    }

    function run() public {
        vm.startBroadcast();
        console.log("Wallet deployer address:", msg.sender);

        // Deploy shared ProtocolAccessControl
        protocolAccessControl = new ProtocolAccessControl();
        console.log(
            "ProtocolAccessControl deployed at:",
            address(protocolAccessControl)
        );

        // Deploy DepositTokenFactory
        depositTokenFactory = new DepositTokenFactory(
            address(protocolAccessControl)
        );
        console.log(
            "DepositTokenFactory deployed at:",
            address(depositTokenFactory)
        );

        // Deploy LendingPoolFactory
        lendingPoolFactory = new LendingPoolFactory(
            address(depositTokenFactory),
            address(protocolAccessControl)
        );
        console.log(
            "LendingPoolFactory deployed at:",
            address(lendingPoolFactory)
        );

        // Deploy BorrowingFactory
        borrowingFactory = new BorrowingFactory(address(protocolAccessControl));
        console.log("BorrowingFactory deployed at:", address(borrowingFactory));

        // Granting roles to the factories
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            address(lendingPoolFactory)
        );
        protocolAccessControl.grantRole(
            protocolAccessControl.DEFAULT_ADMIN_ROLE(),
            address(lendingPoolFactory)
        );
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            address(borrowingFactory)
        );

        // Example: Create a LendingPool for the collateral token
        string memory lendingPoolId = lendingPoolFactory.createLendingPool(
            collateralToken,
            interestRatePerSecond
        );
        console.log("LendingPool created with ID:", lendingPoolId);

        // Example: Create a Borrowing contract for the collateral and borrow token pair
        string memory borrowingId = borrowingFactory.createBorrowing(
            collateralToken,
            borrowToken,
            collateralPriceFeed,
            borrowPriceFeed,
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );
        console.log("Borrowing contract created with ID:", borrowingId);
        vm.stopPrank();
        vm.stopBroadcast();
    }
}
