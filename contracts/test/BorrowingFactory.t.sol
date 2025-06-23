// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/BorrowingFactory.sol";
import "../src/Borrowing.sol";
import "../src/ProtocolAccessControl.sol";
import "./Mocks/MockERC20.sol";
import "./Mocks/MockPriceFeed.sol";

contract BorrowingFactoryTest is Test {
    BorrowingFactory factory;
    ProtocolAccessControl protocolAccessControl;
    MockERC20 collateralToken;
    MockERC20 borrowToken;
    MockPriceFeed collateralPriceFeed;
    MockPriceFeed borrowPriceFeed;
    address governor;
    address nonGovernor;
    uint256 interestRatePerSecond = 1e16; // 1% per second
    uint256 maxBorrowPercentage = 75;
    uint256 liquidationThreshold = 15000; // 150%
    uint256 liquidationIncentive = 500; // 5%

    function setUp() public {
        governor = address(this);
        nonGovernor = address(0x123);

        // Deploy shared protocol access control
        protocolAccessControl = new ProtocolAccessControl();

        // Deploy mock tokens
        collateralToken = new MockERC20("Collateral Token", "COLL");
        borrowToken = new MockERC20("Borrow Token", "BORR");

        // Deploy mock Chainlink price feeds
        collateralPriceFeed = new MockPriceFeed(1e18);
        borrowPriceFeed = new MockPriceFeed(1e18);

        // Deploy BorrowingFactory contract
        factory = new BorrowingFactory(address(protocolAccessControl));

        // Grant the GOVERNOR_ROLE to the test contract
        protocolAccessControl.grantRole(
            protocolAccessControl.GOVERNOR_ROLE(),
            governor
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

    function testCreateBorrowing() public {
        vm.startPrank(governor);

        // Create Borrowing instance
        string memory id = factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Check if the returned ID is correct
        assertEq(id, "COLL-BORR");

        // Check that Borrowing contract has been created
        address borrowingAddress = factory.getBorrowing("COLL-BORR");
        assertTrue(borrowingAddress != address(0));

        vm.stopPrank();
    }

    function testCreateBorrowingFailsIfAlreadyExists() public {
        vm.startPrank(governor);

        // Create Borrowing instance
        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Attempt to create a second Borrowing instance with the same tokens
        vm.expectRevert("Borrowing already exists");
        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        vm.stopPrank();
    }

    function testOnlyGovernorCanCreateBorrowing() public {
        vm.startPrank(nonGovernor);

        // Expect revert when non-governor tries to create a Borrowing instance
        vm.expectRevert("AccessControl: caller does not have required role");

        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        vm.stopPrank();
    }

    function testGetBorrowingsPaginated() public {
        vm.startPrank(governor);

        // Create multiple borrowing contracts
        MockERC20 token1 = new MockERC20("Token1", "TOK1");
        MockERC20 token2 = new MockERC20("Token2", "TOK2");
        MockERC20 token3 = new MockERC20("Token3", "TOK3");

        factory.createBorrowing(
            address(token1),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        factory.createBorrowing(
            address(token2),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        factory.createBorrowing(
            address(token3),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Test pagination
        (
            BorrowingFactory.BorrowingInfo[] memory result,
            uint256 total
        ) = factory.getBorrowingsPaginated(0, 2);

        assertEq(total, 3);
        assertEq(result.length, 2);
        assertEq(result[0].id, "TOK1-BORR");
        assertEq(result[1].id, "TOK2-BORR");

        // Test second page
        (result, total) = factory.getBorrowingsPaginated(2, 2);
        assertEq(total, 3);
        assertEq(result.length, 1);
        assertEq(result[0].id, "TOK3-BORR");

        vm.stopPrank();
    }

    function testGetBorrowingsPaginatedWithLimit100() public {
        vm.startPrank(governor);

        // Test that limit of 100 is accepted
        (
            BorrowingFactory.BorrowingInfo[] memory result,
            uint256 total
        ) = factory.getBorrowingsPaginated(0, 100);
        assertEq(total, 0);
        assertEq(result.length, 0);

        // Test that limit > 100 is rejected
        vm.expectRevert("Limit exceeds maximum of 100");
        factory.getBorrowingsPaginated(0, 101);

        vm.stopPrank();
    }

    function testGetBorrowingsPaginatedInvalidParameters() public {
        vm.startPrank(governor);

        // Test limit = 0
        vm.expectRevert("Limit must be greater than 0");
        factory.getBorrowingsPaginated(0, 0);

        vm.stopPrank();
    }

    function testGetBorrowingsCount() public {
        vm.startPrank(governor);

        // Initially should be 0
        assertEq(factory.getBorrowingsCount(), 0);

        // Create one borrowing
        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Should be 1 now
        assertEq(factory.getBorrowingsCount(), 1);

        vm.stopPrank();
    }

    function testGetBorrowingByIndex() public {
        vm.startPrank(governor);

        // Create borrowing
        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Get by index
        BorrowingFactory.BorrowingInfo memory info = factory
            .getBorrowingByIndex(0);
        assertEq(info.id, "COLL-BORR");
        assertEq(info.collateralToken, address(collateralToken));
        assertEq(info.borrowToken, address(borrowToken));

        // Test out of bounds
        vm.expectRevert("Index out of bounds");
        factory.getBorrowingByIndex(1);

        vm.stopPrank();
    }

    function testBorrowingExistsById() public {
        vm.startPrank(governor);

        // Should not exist initially
        assertFalse(factory.borrowingExistsById("COLL-BORR"));

        // Create borrowing
        factory.createBorrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );

        // Should exist now
        assertTrue(factory.borrowingExistsById("COLL-BORR"));

        vm.stopPrank();
    }
}
