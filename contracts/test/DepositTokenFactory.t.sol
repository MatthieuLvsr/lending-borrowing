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
        DepositToken existing = factory.getDepositToken(tokenId);
        assertEq(address(existing), address(0));

        // Create a new DepositToken
        string memory returnedId = factory.createDepositToken(
            address(mockToken),
            liquidityPool
        );

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
        vm.expectRevert("AccessControl: caller does not have required role");
        factory.createDepositToken(address(mockToken), liquidityPool);

        vm.stopPrank();
    }
}
