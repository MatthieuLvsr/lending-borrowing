// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/DepositTokenFactory.sol";
import "../src/DepositToken.sol";
import "../src/ProtocolAccessControl.sol";
import "./Mocks/MockERC20.sol";

contract DepositTokenFactoryTest is Test {
    DepositTokenFactory factory;
    ProtocolAccessControl protocolAccessControl;
    MockERC20 mockToken;
    address owner;
    address liquidityPool;

    function setUp() public {
        owner = address(this);
        liquidityPool = address(0x123456);

        // Deploy shared protocol access control
        protocolAccessControl = new ProtocolAccessControl();

        // Deploy the factory contract
        factory = new DepositTokenFactory(address(protocolAccessControl));

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");

        // Grant the GOVERNOR_ROLE to the test contract
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            owner
        );
    }

    function toHexString(
        uint256 value,
        uint256 length
    ) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = bytes1(uint8(48 + (value % 16)));
            if (uint8(buffer[i]) > 57) {
                buffer[i] = bytes1(uint8(buffer[i]) + 39);
            }
            value /= 16;
        }
        require(value == 0, "Hex length insufficient");
        return string(buffer);
    }

    function testCreateDepositToken() public {
        vm.startPrank(owner);

        string memory tokenId = mockToken.symbol();

        // Ensure that no DepositToken exists before creation
        vm.expectRevert("DepositToken not found");
        factory.getDepositToken(tokenId);

        // Create a new DepositToken
        string memory returnedId = factory.createDepositToken(
            address(mockToken),
            liquidityPool
        );

        // Check if the returned ID is correct
        assertEq(returnedId, "MOCK");

        // Check that the DepositToken has been created
        address dtAddress = factory.getDepositToken("MOCK");
        assertTrue(dtAddress != address(0));

        // Validate token metadata
        DepositToken dt = DepositToken(dtAddress);
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
        vm.expectRevert("AccessControl: caller does not have required role");
        factory.createDepositToken(address(mockToken), liquidityPool);

        vm.stopPrank();
    }

    function testGetDepositTokensPaginated() public {
        vm.startPrank(owner);

        // Create multiple deposit tokens
        MockERC20 token1 = new MockERC20("Token1", "TOK1");
        MockERC20 token2 = new MockERC20("Token2", "TOK2");
        MockERC20 token3 = new MockERC20("Token3", "TOK3");

        factory.createDepositToken(address(token1), liquidityPool);
        factory.createDepositToken(address(token2), liquidityPool);
        factory.createDepositToken(address(token3), liquidityPool);

        // Test pagination
        (
            DepositTokenFactory.DepositTokenInfo[] memory result,
            uint256 total
        ) = factory.getDepositTokensPaginated(0, 2);

        assertEq(total, 3);
        assertEq(result.length, 2);
        assertEq(result[0].id, "TOK1");
        assertEq(result[1].id, "TOK2");

        // Test second page
        (result, total) = factory.getDepositTokensPaginated(2, 2);
        assertEq(total, 3);
        assertEq(result.length, 1);
        assertEq(result[0].id, "TOK3");

        vm.stopPrank();
    }

    function testGetDepositTokensPaginatedWithLimit100() public {
        vm.startPrank(owner);

        // Test that limit of 100 is accepted
        (
            DepositTokenFactory.DepositTokenInfo[] memory result,
            uint256 total
        ) = factory.getDepositTokensPaginated(0, 100);
        assertEq(total, 0);
        assertEq(result.length, 0);

        // Test that limit > 100 is rejected
        vm.expectRevert("Limit exceeds maximum of 100");
        factory.getDepositTokensPaginated(0, 101);

        vm.stopPrank();
    }

    function testGetDepositTokensPaginatedInvalidParameters() public {
        vm.startPrank(owner);

        // Test limit = 0
        vm.expectRevert("Limit must be greater than 0");
        factory.getDepositTokensPaginated(0, 0);

        vm.stopPrank();
    }

    function testGetDepositTokensCount() public {
        vm.startPrank(owner);

        // Initially should be 0
        assertEq(factory.getDepositTokensCount(), 0);

        // Create one deposit token
        factory.createDepositToken(address(mockToken), liquidityPool);

        // Should be 1 now
        assertEq(factory.getDepositTokensCount(), 1);

        vm.stopPrank();
    }

    function testGetDepositTokenByIndex() public {
        vm.startPrank(owner);

        // Create deposit token
        factory.createDepositToken(address(mockToken), liquidityPool);

        // Get by index
        DepositTokenFactory.DepositTokenInfo memory info = factory
            .getDepositTokenByIndex(0);
        assertEq(info.id, "MOCK");
        assertEq(info.name, "Deposit Mock Token");
        assertEq(info.symbol, "dMOCK");

        // Test out of bounds
        vm.expectRevert("Index out of bounds");
        factory.getDepositTokenByIndex(1);

        vm.stopPrank();
    }

    function testDepositTokenExistsById() public {
        vm.startPrank(owner);

        // Should not exist initially
        assertFalse(factory.depositTokenExistsById("MOCK"));

        // Create deposit token
        factory.createDepositToken(address(mockToken), liquidityPool);

        // Should exist now
        assertTrue(factory.depositTokenExistsById("MOCK"));

        vm.stopPrank();
    }
}
