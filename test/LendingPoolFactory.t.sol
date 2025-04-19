// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/LendingPoolFactory.sol";
import "../src/LendingPool.sol";
import "../src/DepositToken.sol";
import "../src/DepositTokenFactory.sol";

import "./Mocks/MockERC20.sol";

error AccessControlUnauthorizedAccount(address account, bytes32 needed);

contract LendingPoolFactoryTest is Test {
    LendingPoolFactory factory;
    DepositTokenFactory depositTokenFactory;
    MockERC20 mockToken;
    address owner;
    address governor;
    uint256 interestRatePerSecond = 1e16; // 1% per second (for testing)

    function setUp() public {
        owner = address(this);
        governor = address(0x123);

        // Deploy a mock DepositTokenFactory
        depositTokenFactory = new DepositTokenFactory();

        // Deploy the LendingPoolFactory contract
        factory = new LendingPoolFactory(address(depositTokenFactory));

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");

        // Grant the GOVERNOR_ROLE to the test contract
        factory.grantRole(factory.GOVERNOR_ROLE(), governor);
        depositTokenFactory.grantRole(depositTokenFactory.GOVERNOR_ROLE(), address(factory));
    }

    function testCreateLendingPool() public {
        vm.startPrank(governor);

        // Create LendingPool
        string memory tokenId = factory.createLendingPool(
            address(mockToken),
            interestRatePerSecond
        );

        // Check that the token ID is correct
        assertEq(tokenId, "MOCK");

        // Check that LendingPool has been created
        LendingPool lendingPool = factory.getLendingPool("MOCK");
        assertTrue(address(lendingPool) != address(0));

        vm.stopPrank();
    }

    function testCreateLendingPoolFailsIfAlreadyExists() public {
        vm.startPrank(governor);

        // Create LendingPool
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        // Try creating another LendingPool with the same token
        vm.expectRevert("LendingPool already exists");
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        vm.stopPrank();
    }

    function testOnlyGovernorCanCreateLendingPool() public {
        address attacker = address(0x999);
        vm.startPrank(attacker);

        // Expect revert when non-governor tries to create LendingPool
        vm.expectRevert(abi.encodeWithSelector(AccessControlUnauthorizedAccount.selector, attacker, factory.GOVERNOR_ROLE()));
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        vm.stopPrank();
    }
}
