// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/DepositTokenFactory.sol";
import "../src/DepositToken.sol";

import "./Mocks/MockERC20.sol";

error AccessControlUnauthorizedAccount(address account, bytes32 needed);

contract DepositTokenFactoryTest is Test {
    DepositTokenFactory factory;
    MockERC20 mockToken;
    address owner;
    address liquidityPool;

    function setUp() public {
        owner = address(this);
        liquidityPool = address(0x123456);

        // Deploy the factory contract
        factory = new DepositTokenFactory();

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");
    }

    function testCreateDepositToken() public {
        vm.startPrank(owner);

        string memory tokenId = mockToken.symbol();

        // Ensure that no DepositToken exists before creation
        DepositToken existing = factory.getDepositToken(tokenId);
        assertEq(address(existing), address(0));

        // Create a new DepositToken
        string memory returnedId = factory.createDepositToken(address(mockToken), liquidityPool);

        // Check if the returned ID is correct
        assertEq(returnedId, "MOCK");

        // Check that the DepositToken has been created
        DepositToken dt = factory.getDepositToken("MOCK");
        assertTrue(address(dt) != address(0));

        // Validate token metadata
        assertEq(dt.name(), "Deposit Mock Token");
        assertEq(dt.symbol(), "dMOCK");

        vm.stopPrank();
    }

    function testCreateDepositTokenTwiceFails() public {
        vm.startPrank(owner);

        // string memory tokenId = mockToken.symbol();

        // First creation should succeed
        factory.createDepositToken(address(mockToken), liquidityPool);

        // Second creation with the same token should fail
        vm.expectRevert("DepositToken already exists");
        factory.createDepositToken(address(mockToken), liquidityPool);

        vm.stopPrank();
    }

    function testOnlyOwnerCanCreateDepositToken() public {
        address attacker = address(0x999);
        vm.startPrank(attacker);

        // Expect the call to fail because attacker is not the owner
        vm.expectRevert(
            abi.encodeWithSelector(AccessControlUnauthorizedAccount.selector, attacker, factory.GOVERNOR_ROLE())
        );
        factory.createDepositToken(address(mockToken), liquidityPool);

        vm.stopPrank();
    }
}
