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
        depositTokenFactory = new DepositTokenFactory(
            address(protocolAccessControl)
        );

        // Deploy the LendingPoolFactory contract
        factory = new LendingPoolFactory(
            address(depositTokenFactory),
            address(protocolAccessControl)
        );

        // Deploy a mock ERC20 token
        mockToken = new MockERC20("Mock Token", "MOCK");

        // Grant the GOVERNOR_ROLE to the test contract and factory
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            governor
        );
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            address(factory)
        );
        // Grant DEFAULT_ADMIN_ROLE to factory so it can grant LENDING_ROLE to pools
        protocolAccessControl.grantRole(
            protocolAccessControl.DEFAULT_ADMIN_ROLE(),
            address(factory)
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
        address lendingPoolAddress = factory.getLendingPool("MOCK");
        assertTrue(lendingPoolAddress != address(0));

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

    function testGetLendingPoolsPaginated() public {
        vm.startPrank(governor);

        // Create multiple lending pools
        MockERC20 token1 = new MockERC20("Token1", "TOK1");
        MockERC20 token2 = new MockERC20("Token2", "TOK2");
        MockERC20 token3 = new MockERC20("Token3", "TOK3");

        factory.createLendingPool(address(token1), interestRatePerSecond);
        factory.createLendingPool(address(token2), interestRatePerSecond);
        factory.createLendingPool(address(token3), interestRatePerSecond);

        // Test pagination
        (
            LendingPoolFactory.LendingPoolInfo[] memory result,
            uint256 total
        ) = factory.getLendingPoolsPaginated(0, 2);

        assertEq(total, 3);
        assertEq(result.length, 2);
        assertEq(result[0].id, "TOK1");
        assertEq(result[1].id, "TOK2");

        // Test second page
        (result, total) = factory.getLendingPoolsPaginated(2, 2);
        assertEq(total, 3);
        assertEq(result.length, 1);
        assertEq(result[0].id, "TOK3");

        vm.stopPrank();
    }

    function testGetLendingPoolsPaginatedWithLimit100() public {
        vm.startPrank(governor);

        // Test that limit of 100 is accepted
        (
            LendingPoolFactory.LendingPoolInfo[] memory result,
            uint256 total
        ) = factory.getLendingPoolsPaginated(0, 100);
        assertEq(total, 0);
        assertEq(result.length, 0);

        // Test that limit > 100 is rejected
        vm.expectRevert("Limit exceeds maximum of 100");
        factory.getLendingPoolsPaginated(0, 101);

        vm.stopPrank();
    }

    function testGetLendingPoolsPaginatedInvalidParameters() public {
        vm.startPrank(governor);

        // Test limit = 0
        vm.expectRevert("Limit must be greater than 0");
        factory.getLendingPoolsPaginated(0, 0);

        vm.stopPrank();
    }

    function testGetLendingPoolsCount() public {
        vm.startPrank(governor);

        // Initially should be 0
        assertEq(factory.getLendingPoolsCount(), 0);

        // Create one lending pool
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        // Should be 1 now
        assertEq(factory.getLendingPoolsCount(), 1);

        vm.stopPrank();
    }

    function testGetLendingPoolByIndex() public {
        vm.startPrank(governor);

        // Create lending pool
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        // Get by index
        LendingPoolFactory.LendingPoolInfo memory info = factory
            .getLendingPoolByIndex(0);
        assertEq(info.id, "MOCK");
        assertEq(info.underlyingToken, address(mockToken));
        assertEq(info.interestRatePerSecond, interestRatePerSecond);

        // Test out of bounds
        vm.expectRevert("Index out of bounds");
        factory.getLendingPoolByIndex(1);

        vm.stopPrank();
    }

    function testLendingPoolExistsById() public {
        vm.startPrank(governor);

        // Should not exist initially
        assertFalse(factory.lendingPoolExistsById("MOCK"));

        // Create lending pool
        factory.createLendingPool(address(mockToken), interestRatePerSecond);

        // Should exist now
        assertTrue(factory.lendingPoolExistsById("MOCK"));

        vm.stopPrank();
    }
}
