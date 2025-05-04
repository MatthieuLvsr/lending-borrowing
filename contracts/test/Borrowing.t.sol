// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "../src/Borrowing.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./Mocks/MockPriceFeed.sol";
import "./Mocks/MockERC20.sol";

contract BorrowingTest is Test {
    Borrowing public borrowing;
    MockERC20 public collateralToken;
    MockERC20 public borrowToken;
    MockPriceFeed public collateralPriceFeed;
    MockPriceFeed public borrowPriceFeed;
    address public borrower = address(0x123);
    address public liquidator = address(0x456);
    address public governor = address(0x789);

    // Parameters
    uint256 public interestRatePerSecond = 1e16; // 1e16, pour les tests
    uint256 public maxBorrowPercentage = 75; // 75%
    uint256 public liquidationThreshold = 15000; // 150% (en basis points)
    uint256 public liquidationIncentive = 500; // 5% bonus (en basis points)

    function setUp() public {
        // Déployer les tokens mocks
        collateralToken = new MockERC20("Collateral Token", "COL");
        borrowToken = new MockERC20("Borrow Token", "BOR");
        // Déployer les agrégateurs mocks avec un prix initial de 1e18
        collateralPriceFeed = new MockPriceFeed(1e18);
        borrowPriceFeed = new MockPriceFeed(1e18);
        // Déployer le contrat Borrowing
        borrowing = new Borrowing(
            address(collateralToken),
            address(borrowToken),
            address(collateralPriceFeed),
            address(borrowPriceFeed),
            interestRatePerSecond,
            maxBorrowPercentage,
            liquidationThreshold,
            liquidationIncentive
        );
        // Accordez explicitement le rôle LIQUIDATOR_ROLE au liquidateur pour les tests de liquidation
        borrowing.grantRole(borrowing.LIQUIDATOR_ROLE(), liquidator);
        borrowing.grantRole(borrowing.GOVERNOR_ROLE(), governor);
    }

    function testDepositCollateral() public {
        uint256 depositAmount = 1000 * 1e18;
        // Minter des tokens de collatéral au borrower
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        vm.stopPrank();

        // Vérifier que le loan du borrower a bien été mis à jour
        (uint256 collateralAmount, uint256 borrowedAmount,) = borrowing.loans(borrower);
        assertEq(collateralAmount, depositAmount);
        assertEq(borrowedAmount, 0);
    }

    function testDepositCollateralFailsWrongAmount() public {
        uint256 depositAmount = 0;
        // Minter des tokens de collatéral au borrower
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        vm.expectRevert("Amount must be greater than zero");
        borrowing.depositCollateral(depositAmount);
        vm.stopPrank();
    }

    function testDepositCollateralFailsTransfer() public {
        uint256 depositAmount = 1000 * 1e18;
        // Minter des tokens de collatéral au borrower
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        collateralToken.setFailMode(true);
        vm.expectRevert("Collateral transfer failed");
        borrowing.depositCollateral(depositAmount);
        vm.stopPrank();
    }

    function testBorrow() public {
        uint256 depositAmount = 1000 * 1e18;
        // La valeur du collatéral = depositAmount (price = 1e18)
        // Max borrowable = depositAmount * 75/100
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        // Pour simuler la liquidité, minter des tokens empruntés au contrat Borrowing
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        (, uint256 borrowedAmount,) = borrowing.loans(borrower);
        assertEq(borrowedAmount, borrowAmount);
        // Vérifier que le borrower reçoit bien les tokens empruntés
        assertEq(borrowToken.balanceOf(borrower), borrowAmount);
    }

    function testBorrowFailsWrongAmount() public {
        uint256 depositAmount = 1000 * 1e18;
        // La valeur du collatéral = depositAmount (price = 1e18)
        // Max borrowable = depositAmount * 75/100
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        // Pour simuler la liquidité, minter des tokens empruntés au contrat Borrowing
        borrowToken.mint(address(borrowing), borrowAmount);
        vm.expectRevert("Amount must be greater than zero");
        borrowing.borrow(0);
        vm.stopPrank();
    }

    function testBorrowFailsTransfer() public {
        uint256 depositAmount = 1000 * 1e18;
        // La valeur du collatéral = depositAmount (price = 1e18)
        // Max borrowable = depositAmount * 75/100
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        // Pour simuler la liquidité, minter des tokens empruntés au contrat Borrowing
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowToken.setFailMode(true);
        vm.expectRevert("Borrow transfer failed");
        borrowing.borrow(borrowAmount);
        vm.stopPrank();
    }

    function testBorrowFailsWithInsufficientCollateral() public {
        uint256 depositAmount = 1000 * 1e18;
        // Essayer d'emprunter un montant supérieur au maximum autorisé
        uint256 borrowAmount = ((depositAmount * maxBorrowPercentage) / 100) + 1;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        vm.expectRevert("Insufficient collateral");
        borrowing.borrow(borrowAmount);
        vm.stopPrank();
    }

    function testRepayFull() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        // Minter des tokens empruntés pour le remboursement
        borrowToken.mint(borrower, borrowAmount);
        borrowToken.approve(address(borrowing), borrowAmount);
        borrowing.repay(borrowAmount);
        vm.stopPrank();
        (, uint256 borrowedAmount,) = borrowing.loans(borrower);
        assertEq(borrowedAmount, 0);
    }

    function testRepayPartial() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        uint256 repayAmount = borrowAmount / 2;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        // Minter des tokens pour le remboursement partiel
        borrowToken.mint(borrower, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        borrowing.repay(repayAmount);
        vm.stopPrank();
        (, uint256 borrowedAmount,) = borrowing.loans(borrower);
        assertEq(borrowedAmount, borrowAmount - repayAmount);
    }

    function testRepayFailsAmount() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        // Minter des tokens empruntés pour le remboursement
        borrowToken.mint(borrower, borrowAmount);
        borrowToken.approve(address(borrowing), borrowAmount);
        vm.expectRevert("Amount must be greater than zero");
        borrowing.repay(0);
        vm.stopPrank();
    }

    function testRepayFailsNoBorrow() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        borrowToken.mint(borrower, borrowAmount);
        borrowToken.approve(address(borrowing), borrowAmount);
        vm.expectRevert("No active loan");
        borrowing.repay(borrowAmount);
        vm.stopPrank();
    }

    function testRepayFailsTransfer() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        // Minter des tokens empruntés pour le remboursement
        borrowToken.mint(borrower, borrowAmount);
        borrowToken.approve(address(borrowing), borrowAmount);
        borrowToken.setFailMode(true);
        vm.expectRevert("Repayment transfer failed");
        borrowing.repay(borrowAmount);
        vm.stopPrank();
    }

    function testLiquidateLoanPartial() public {
        uint256 depositAmount = 1000 * 1e18;
        // Emprunter un montant raisonnable (maxBorrowable = depositAmount*75/100)
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix du collatéral pour déclencher la sous-collatéralisation.
        collateralPriceFeed.setPrice(5e17); // 50% du prix initial

        // Effectuer une liquidation partielle.
        uint256 repayAmount = 100 * 1e18; // montant à rembourser
        // Calcul attendu: computedCollateralToSeize = 100e18 * 10500/10000 = 105e18.
        uint256 expectedCollateralSeized = (repayAmount * (10000 + liquidationIncentive)) / 10000;
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        borrowing.liquidateLoan(borrower, repayAmount);
        vm.stopPrank();

        (uint256 collateralRemaining, uint256 borrowedRemaining,) = borrowing.loans(borrower);
        assertEq(borrowedRemaining, borrowAmount - repayAmount);
        assertEq(collateralRemaining, depositAmount - expectedCollateralSeized);
    }

    function testLiquidateLoanFailsRepayAmount() public {
        uint256 depositAmount = 1000 * 1e18;
        // Emprunter un montant raisonnable (maxBorrowable = depositAmount*75/100)
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix du collatéral pour déclencher la sous-collatéralisation.
        collateralPriceFeed.setPrice(5e17); // 50% du prix initial

        // Effectuer une liquidation partielle.
        uint256 repayAmount = 100 * 1e18; // montant à rembourser
        // Calcul attendu: computedCollateralToSeize = 100e18 * 10500/10000 = 105e18.
        // uint256 expectedCollateralSeized = (repayAmount * (10000 + liquidationIncentive)) / 10000;
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        vm.expectRevert("Repayment amount must be greater than zero");
        borrowing.liquidateLoan(borrower, 0);
        vm.stopPrank();
    }

    function testLiquidateLoanFailsNoActiveLoan() public {
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, 1);
        borrowToken.approve(address(borrowing), 1);
        vm.expectRevert("No active loan");
        borrowing.liquidateLoan(borrower, 1);
        vm.stopPrank();
    }

    function testLiquidateLoanFailsBorrowTokenTranfser() public {
        uint256 depositAmount = 1000 * 1e18;
        // Emprunter un montant raisonnable (maxBorrowable = depositAmount*75/100)
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix du collatéral pour déclencher la sous-collatéralisation.
        collateralPriceFeed.setPrice(5e17); // 50% du prix initial

        // Effectuer une liquidation partielle.
        uint256 repayAmount = 100 * 1e18; // montant à rembourser
        // Calcul attendu: computedCollateralToSeize = 100e18 * 10500/10000 = 105e18.
        // uint256 expectedCollateralSeized = (repayAmount * (10000 + liquidationIncentive)) / 10000;
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        borrowToken.setFailMode(true);
        vm.expectRevert("Repayment transfer failed");
        borrowing.liquidateLoan(borrower, repayAmount);
        vm.stopPrank();
    }

    function testLiquidateLoanFailsCollateralTokenTranfser() public {
        uint256 depositAmount = 1000 * 1e18;
        // Emprunter un montant raisonnable (maxBorrowable = depositAmount*75/100)
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix du collatéral pour déclencher la sous-collatéralisation.
        collateralPriceFeed.setPrice(5e17); // 50% du prix initial

        // Effectuer une liquidation partielle.
        uint256 repayAmount = 100 * 1e18; // montant à rembourser
        // Calcul attendu: computedCollateralToSeize = 100e18 * 10500/10000 = 105e18.
        // uint256 expectedCollateralSeized = (repayAmount * (10000 + liquidationIncentive)) / 10000;
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        collateralToken.setFailMode(true);
        vm.expectRevert("Collateral transfer failed");
        borrowing.liquidateLoan(borrower, repayAmount);
        vm.stopPrank();
    }

    function testLiquidateLoanFull() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix du collatéral de façon significative pour forcer la liquidation complète.
        collateralPriceFeed.setPrice(1e17); // 10% du prix initial

        // Choisir un repayAmount qui, selon la formule, donnerait un collateralToSeize supérieur au collatéral disponible.
        uint256 repayAmount = 1000 * 1e18; // Ce montant devrait forcer une liquidation complète.
        vm.startPrank(liquidator);
        borrowToken.mint(liquidator, repayAmount);
        borrowToken.approve(address(borrowing), repayAmount);
        borrowing.liquidateLoan(borrower, repayAmount);
        vm.stopPrank();

        (uint256 collateralRemaining, uint256 borrowedRemaining,) = borrowing.loans(borrower);
        // Après liquidation complète, le collatéral doit être épuisé.
        assertEq(collateralRemaining, 0);
        // Le montant de la dette devrait être réduit d'un montant équivalent à la valeur du collatéral saisi.
        // Calcul de l'ajustement de repayAmount: adjustedRepay = (depositAmount * 10000) / (10000 + liquidationIncentive)
        uint256 adjustedRepay = (depositAmount * 10000) / (10000 + liquidationIncentive);
        if (adjustedRepay >= borrowAmount) {
            assertEq(borrowedRemaining, 0);
        } else {
            assertEq(borrowedRemaining, borrowAmount - adjustedRepay);
        }
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

    function testLiquidateFailsWithoutRole() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        uint256 repayAmount = 100 * 1e18;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        vm.stopPrank();

        // Baisser le prix pour rendre la position liquidable.
        collateralPriceFeed.setPrice(5e17);
        address unauthorizedAddress = address(0x789);
        vm.startPrank(unauthorizedAddress);
        vm.expectRevert(
            abi.encodePacked(
                "AccessControl: account ",
                toHexString(uint256(uint160(unauthorizedAddress)), 20),
                " is missing role ",
                toHexString(uint256(borrowing.LIQUIDATOR_ROLE()), 32)
            )
        );
        borrowing.liquidateLoan(borrower, repayAmount);
        vm.stopPrank();
    }

    function testGetLatestPrice() public view {
        uint256 price = borrowing.getLatestPrice(collateralPriceFeed);
        assertEq(price, 1e18);
    }

    function testGetLatestPriceFailsInvalidPrice() public {
        collateralPriceFeed.setPrice(0);
        vm.expectRevert("Invalid price");
        borrowing.getLatestPrice(collateralPriceFeed);
    }

    function testAccrueInterestOverTime() public {
        uint256 depositAmount = 1000 * 1e18;
        uint256 borrowAmount = (depositAmount * maxBorrowPercentage) / 100;
        collateralToken.mint(borrower, depositAmount);
        vm.startPrank(borrower);
        collateralToken.approve(address(borrowing), depositAmount);
        borrowing.depositCollateral(depositAmount);
        borrowToken.mint(address(borrowing), borrowAmount);
        borrowing.borrow(borrowAmount);
        (, uint256 initialDebt,) = borrowing.loans(borrower);
        // Avancer le temps de 1000 secondes
        vm.warp(block.timestamp + 1000);
        // Déclencher l'accrual d'intérêts
        vm.startPrank(governor);
        borrowing.triggerAccrual(borrower);
        vm.startPrank(borrower);
        (, uint256 newDebt,) = borrowing.loans(borrower);
        assertGt(newDebt, initialDebt);
        vm.stopPrank();
    }
}
