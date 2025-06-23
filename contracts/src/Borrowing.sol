// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ProtocolAccessControl.sol";

/**
 * @title Borrowing
 * @notice Manages lending and borrowing with Chainlink price feed integration and role-based access control.
 *         Users can deposit collateral, borrow funds, repay loans, and face liquidation if undercollateralized.
 *         Price feeds are retrieved via Chainlink oracles.
 */
contract Borrowing {
    /// @notice ERC20 token used as collateral.
    IERC20 public collateralToken;

    /// @notice ERC20 token that can be borrowed.
    IERC20 public borrowToken;

    /// @notice Chainlink price feed for the collateral token.
    AggregatorV3Interface public collateralPriceFeed;

    /// @notice Chainlink price feed for the borrowed token.
    AggregatorV3Interface public borrowPriceFeed;

    /// @notice Maximum borrowable percentage of collateral value (e.g., 75 for 75%).
    uint256 public maxBorrowPercentage;

    /// @notice Interest rate per second (scaled to 1e18 precision).
    uint256 public interestRatePerSecond;

    /// @notice Minimum collateralization threshold in basis points (e.g., 15000 for 150%).
    uint256 public liquidationThreshold;

    /// @notice Liquidation bonus in basis points (e.g., 500 for 5%).
    uint256 public liquidationIncentive;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Struct to track loan details.
    struct Loan {
        uint256 collateralAmount; // Amount of collateral deposited.
        uint256 borrowedAmount; // Amount borrowed (including accrued interest).
        uint256 lastAccrued; // Timestamp of the last interest accrual.
    }

    /// @notice Mapping of user addresses to their loan details.
    mapping(address => Loan) public loans;

    /// @notice Event emitted when collateral is deposited.
    event CollateralDeposited(address indexed user, uint256 amount);

    /// @notice Event emitted when funds are borrowed.
    event Borrowed(address indexed user, uint256 amount);

    /// @notice Event emitted when a loan is repaid.
    event Repaid(address indexed user, uint256 amount);

    /// @notice Event emitted when a loan is liquidated.
    event Liquidated(
        address indexed liquidator,
        address indexed borrower,
        uint256 repayAmount,
        uint256 collateralSeized
    );

    /**
     * @notice Initializes the borrowing contract.
     * @param _collateralToken Address of the ERC20 token used as collateral.
     * @param _borrowToken Address of the ERC20 token to be borrowed.
     * @param _collateralPriceFeed Address of the Chainlink price feed for the collateral token.
     * @param _borrowPriceFeed Address of the Chainlink price feed for the borrowed token.
     * @param _interestRatePerSecond Interest rate per second (scaled to 1e18 precision).
     * @param _maxBorrowPercentage Maximum borrowable percentage of collateral value (e.g., 75 for 75%).
     * @param _liquidationThreshold Minimum collateralization threshold in basis points (e.g., 15000 for 150%).
     * @param _liquidationIncentive Liquidation bonus in basis points (e.g., 500 for 5%).
     */
    constructor(
        address _collateralToken,
        address _borrowToken,
        address _collateralPriceFeed,
        address _borrowPriceFeed,
        uint256 _interestRatePerSecond,
        uint256 _maxBorrowPercentage,
        uint256 _liquidationThreshold,
        uint256 _liquidationIncentive,
        address _protocolAccessControl
    ) {
        collateralToken = IERC20(_collateralToken);
        borrowToken = IERC20(_borrowToken);
        collateralPriceFeed = AggregatorV3Interface(_collateralPriceFeed);
        borrowPriceFeed = AggregatorV3Interface(_borrowPriceFeed);
        interestRatePerSecond = _interestRatePerSecond;
        maxBorrowPercentage = _maxBorrowPercentage;
        liquidationThreshold = _liquidationThreshold;
        liquidationIncentive = _liquidationIncentive;
        protocolAccessControl = ProtocolAccessControl(_protocolAccessControl);
    }

    /**
     * @dev Modifier to check if the caller has the specified role.
     * @param role The role to check.
     */
    modifier onlyRole(bytes32 role) {
        require(
            protocolAccessControl.hasRole(role, msg.sender),
            "AccessControl: caller does not have required role"
        );
        _;
    }

    /**
     * @notice Retrieves the latest price from a Chainlink price feed.
     * @param priceFeed The Chainlink aggregator contract.
     * @return Latest price with the feed's defined precision.
     */
    function getLatestPrice(
        AggregatorV3Interface priceFeed
    ) public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price);
    }

    /**
     * @dev Accrues interest on a user's loan.
     * @param user Address of the borrower.
     */
    function _accrueInterest(address user) internal {
        Loan storage loan = loans[user];
        if (loan.borrowedAmount > 0) {
            uint256 timeElapsed = block.timestamp - loan.lastAccrued;
            if (timeElapsed > 0) {
                uint256 interest = (loan.borrowedAmount *
                    interestRatePerSecond *
                    timeElapsed) / 1e18;
                loan.borrowedAmount += interest;
                loan.lastAccrued = block.timestamp;
            }
        } else {
            loan.lastAccrued = block.timestamp;
        }
    }

    /**
     * @notice Deposits collateral.
     * @param amount Amount of collateral tokens to deposit.
     */
    function depositCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(
            collateralToken.transferFrom(msg.sender, address(this), amount),
            "Collateral transfer failed"
        );
        _accrueInterest(msg.sender);
        loans[msg.sender].collateralAmount += amount;
        emit CollateralDeposited(msg.sender, amount);
    }

    /**
     * @notice Borrows funds based on the value of the deposited collateral.
     * @param amount Amount of borrowed tokens to receive.
     */
    function borrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        _accrueInterest(msg.sender);
        Loan storage loan = loans[msg.sender];

        uint256 collateralValue = (loan.collateralAmount *
            getLatestPrice(collateralPriceFeed)) / 1e18;
        uint256 maxBorrowable = (collateralValue * maxBorrowPercentage) / 100;
        require(
            loan.borrowedAmount + amount <= maxBorrowable,
            "Insufficient collateral"
        );

        loan.borrowedAmount += amount;
        loan.lastAccrued = block.timestamp;
        require(
            borrowToken.transfer(msg.sender, amount),
            "Borrow transfer failed"
        );
        emit Borrowed(msg.sender, amount);
    }

    /**
     * @notice Repays a portion or the full borrowed amount.
     * @param amount Amount of borrowed tokens to repay.
     */
    function repay(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        _accrueInterest(msg.sender);
        Loan storage loan = loans[msg.sender];
        require(loan.borrowedAmount > 0, "No active loan");
        require(
            borrowToken.transferFrom(msg.sender, address(this), amount),
            "Repayment transfer failed"
        );

        loan.borrowedAmount = amount >= loan.borrowedAmount
            ? 0
            : loan.borrowedAmount - amount;
        loan.lastAccrued = block.timestamp;
        emit Repaid(msg.sender, amount);
    }

    /**
     * @notice Liquidates an undercollateralized loan.
     *         If the computed collateral to seize exceeds the available collateral,
     *         the function adjusts to liquidate the entire collateral.
     * @param borrower Address of the borrower to be liquidated.
     * @param repayAmount Amount (in borrow tokens) the liquidator intends to repay.
     */
    function liquidateLoan(
        address borrower,
        uint256 repayAmount
    ) external onlyRole(protocolAccessControl.LIQUIDATOR_ROLE()) {
        require(repayAmount > 0, "Repayment amount must be greater than zero");
        _accrueInterest(borrower);
        Loan storage loan = loans[borrower];
        require(loan.borrowedAmount > 0, "No active loan");

        // Compute the collateral to seize using the current formula.
        uint256 computedCollateralToSeize = (repayAmount *
            (10000 + liquidationIncentive)) / 10000;
        uint256 collateralToSeize;
        // Si le montant calculé est supérieur au collatéral disponible, procéder à une liquidation complète.
        if (computedCollateralToSeize > loan.collateralAmount) {
            collateralToSeize = loan.collateralAmount;
            // Ajuster le repayAmount pour correspondre à la totalité du collatéral.
            repayAmount =
                (collateralToSeize * 10000) /
                (10000 + liquidationIncentive);
        } else {
            collateralToSeize = computedCollateralToSeize;
        }

        // Transférer le montant de remboursement depuis le liquidateur vers le contrat.
        require(
            borrowToken.transferFrom(msg.sender, address(this), repayAmount),
            "Repayment transfer failed"
        );

        // Mettre à jour la position de l'emprunteur.
        if (repayAmount >= loan.borrowedAmount) {
            loan.borrowedAmount = 0;
        } else {
            loan.borrowedAmount -= repayAmount;
        }
        loan.collateralAmount -= collateralToSeize;

        // Transférer le collatéral saisi au liquidateur.
        require(
            collateralToken.transfer(msg.sender, collateralToSeize),
            "Collateral transfer failed"
        );

        emit Liquidated(msg.sender, borrower, repayAmount, collateralToSeize);
    }

    /**
     * @notice Triggers interest accrual for the caller.
     * @dev This function calls the internal _accrueInterest function.
     */
    function triggerAccrual(
        address _borrower
    ) external onlyRole(protocolAccessControl.GOVERNOR_ROLE()) {
        _accrueInterest(_borrower);
    }
}
