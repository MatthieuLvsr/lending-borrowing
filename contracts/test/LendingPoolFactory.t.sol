// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/LendingPoolFactory.sol";
import "../src/LendingPool.sol";
import "../src/DepositToken.sol";
import "../src/DepositTokenFactory.sol";
import "../src/ProtocolAccessControl.sol";

import "./Mocks/MockERC20.sol";

contract LendingPoolFactoryTest is Test {
    LendingPoolFactory factory;
    DepositTokenFactory depositTokenFactory;
    ProtocolAccessControl protocolAccessControl;
    MockERC20 mockToken;
    address owner;
    address governor;
    uint256 interestRatePerSecond = 1e16; // 1% per second (for testing)

    function setUp() public {
        owner = address(this);
        governor = address(0x123);

        // Deploy shared protocol access control
        protocolAccessControl = new ProtocolAccessControl();

        // Deploy a mock DepositTokenFactory
        depositTokenFactory = new DepositTokenFactory(address(protocolAccessControl));

        // Deploy the LendingPoolFactory contract
        factory = new LendingPoolFactory(address(depositTokenFactory), address(protocolAccessControl));

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");

        // Grant the GOVERNOR_ROLE to the test contract and factory
        protocolAccessControl.grantRole(protocolAccessControl.GOVERNOR_ROLE(), governor);
        protocolAccessControl.grantRole(protocolAccessControl.GOVERNOR_ROLE(), address(factory));
        // Grant DEFAULT_ADMIN_ROLE to factory so it can grant LENDING_ROLE to pools
        protocolAccessControl.grantRole(protocolAccessControl.DEFAULT_ADMIN_ROLE(), address(factory));
    }

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
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

    function testCreateLendingPool() public {
        vm.startPrank(governor);

        // Create LendingPool
        string memory tokenId = factory.createLendingPool(address(mockToken), interestRatePerSecond);

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
        vm.expectRevert("AccessControl: caller does not have required role");
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        vm.stopPrank();
    }
}
