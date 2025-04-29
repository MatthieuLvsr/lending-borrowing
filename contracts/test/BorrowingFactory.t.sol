// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/BorrowingFactory.sol";
import "../src/Borrowing.sol";
import "./Mocks/MockERC20.sol";
import "./Mocks/MockPriceFeed.sol";

contract BorrowingFactoryTest is Test {
    BorrowingFactory factory;
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

        // Deploy mock tokens
        collateralToken = new MockERC20("Collateral Token", "COLL");
        borrowToken = new MockERC20("Borrow Token", "BORR");

        // Deploy mock Chainlink price feeds
        collateralPriceFeed = new MockPriceFeed(1e18);
        borrowPriceFeed = new MockPriceFeed(1e18);

        // Deploy BorrowingFactory contract
        factory = new BorrowingFactory();

        // Grant the GOVERNOR_ROLE to the test contract
        factory.grantRole(factory.GOVERNOR_ROLE(), governor);
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
        Borrowing borrowing = factory.getBorrowing("COLL-BORR");
        assertTrue(address(borrowing) != address(0));

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
        vm.expectRevert(
            abi.encodePacked(
                "AccessControl: account ",
                toHexString(uint256(uint160(nonGovernor)), 20),
                " is missing role ",
                toHexString(uint256(factory.GOVERNOR_ROLE()), 32)
            )
        );

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
}
