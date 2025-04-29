// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/LendingPool.sol";
import "../src/DepositToken.sol";

import "./Mocks/MockERC20.sol";

error AccessControlUnauthorizedAccount(address account, bytes32 needed);

contract LendingPoolTest is Test {
    LendingPool pool;
    MockERC20 mockToken;
    DepositToken depositToken;
    address owner;
    address user;
    uint256 interestRatePerSecond = 1e16; // 1% per second (for testing)
    uint256 newInterestRatePerSecond = 1e15; // 10% per second (for testing)

    function setUp() public {
        owner = address(this);
        user = address(0x123);

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");

        // Deploy a mock DepositToken
        depositToken = new DepositToken("Deposit Mock Token", "dMOCK");

        // Deploy the LendingPool contract
        pool = new LendingPool(address(mockToken), address(depositToken), interestRatePerSecond);
        depositToken.grantRole(depositToken.LENDING_ROLE(), address(pool));

        // Set the test contract as the owner of the deposit token
        // vm.prank(owner);
    }

    function testDeposit() public {
        uint256 depositAmount = 1000 * 1e18;

        // Mint tokens to user and approve LendingPool
        mockToken.mint(user, depositAmount);
        vm.startPrank(user);
        mockToken.approve(address(pool), depositAmount);

        // Deposit tokens
        pool.deposit(depositAmount);

        // Check that DepositTokens were minted
        assertEq(depositToken.balanceOf(user), depositAmount);

        // Check that LendingPool received the underlying tokens
        assertEq(mockToken.balanceOf(address(pool)), depositAmount);

        vm.stopPrank();
    }

    function testWithdraw() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 tokenAmount = depositAmount; // Initially 1:1 exchange rate

        // Mint tokens to user and approve LendingPool
        mockToken.mint(user, depositAmount);
        vm.startPrank(user);
        mockToken.approve(address(pool), depositAmount);

        // Deposit tokens
        pool.deposit(depositAmount);

        // Withdraw tokens
        pool.withdraw(tokenAmount);

        // Check that user received underlying tokens back
        assertEq(mockToken.balanceOf(user), depositAmount);

        // Check that DepositTokens were burned
        assertEq(depositToken.balanceOf(user), 0);

        vm.stopPrank();
    }

    function testWithdrawFailsWithInsufficientFunds() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 tokenAmount = depositAmount;

        // Mint tokens to user and approve LendingPool
        mockToken.mint(user, depositAmount);
        vm.startPrank(user);
        mockToken.approve(address(pool), depositAmount);

        // Deposit tokens
        pool.deposit(depositAmount);

        // Expect revert
        vm.expectRevert("Insufficient funds");
        pool.withdraw(tokenAmount + 1);

        vm.stopPrank();
    }

    function testAccrueInterest() public {
        uint256 initialExchangeRate = pool.exchangeRate();
        uint256 depositAmount = 1000 * 1e18;

        // Mint tokens to user and approve LendingPool
        mockToken.mint(user, depositAmount + 1);
        vm.startPrank(user);
        mockToken.approve(address(pool), depositAmount);

        // Deposit tokens
        pool.deposit(depositAmount);

        // Fast forward time by 10 seconds
        vm.warp(block.timestamp + 10);
        mockToken.approve(address(pool), 1);
        pool.deposit(1); // Trigger interest accrual

        // Verify exchange rate has increased
        uint256 newExchangeRate = pool.exchangeRate();
        assertTrue(newExchangeRate > initialExchangeRate);

        vm.stopPrank();
    }

    function testOnlyOwnerCanSetInterestRate() public {
        address attacker = address(0x999);
        vm.startPrank(attacker);

        // Expect revert when non-owner tries to modify interest rate
        vm.expectRevert(
            abi.encodeWithSelector(AccessControlUnauthorizedAccount.selector, attacker, depositToken.GOVERNOR_ROLE())
        );
        pool.setInterestRate(newInterestRatePerSecond);

        vm.stopPrank();
    }
}
