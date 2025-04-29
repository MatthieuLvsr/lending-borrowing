// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Borrowing.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./ProtocolAccessControl.sol";

/**
 * @title BorrowingFactory
 * @notice Factory contract for deploying `Borrowing` contracts with Chainlink price feed integration.
 *         Each instance is uniquely identified by a string derived from the collateral token symbol
 *         and the borrowed token symbol (e.g., "ETH-DAI").
 */
contract BorrowingFactory is ProtocolAccessControl {
    /// @notice Mapping that associates an identifier with its corresponding `Borrowing` contract instance.
    mapping(string => Borrowing) public borrowings;

    /// @notice Event emitted when a new `Borrowing` contract is deployed.
    /// @param borrowingAddress Address of the newly deployed `Borrowing` contract.
    /// @param collateralToken Address of the ERC20 token used as collateral.
    /// @param borrowToken Address of the ERC20 token that will be borrowed.
    /// @param id Unique identifier for the borrowing pair (e.g., "ETH-DAI").
    event BorrowingCreated(
        address indexed borrowingAddress, address indexed collateralToken, address indexed borrowToken, string id
    );

    constructor() {}

    /**
     * @notice Deploys a new `Borrowing` contract for a given token pair.
     * @dev Generates a unique identifier from the token symbols, then deploys a `Borrowing` contract.
     *      Ensures that no `Borrowing` contract exists for the given identifier before deployment.
     * @param _collateralToken Address of the ERC20 token used as collateral.
     * @param _borrowToken Address of the ERC20 token to be borrowed.
     * @param _collateralPriceFeed Address of the Chainlink price feed for the collateral token.
     * @param _borrowPriceFeed Address of the Chainlink price feed for the borrowed token.
     * @param _interestRatePerSecond Interest rate per second (scaled to 1e18 precision).
     * @param _maxBorrowPercentage Maximum borrowable percentage of collateral value (e.g., 75 for 75%).
     * @param _liquidationThreshold Minimum collateralization threshold in basis points (e.g., 15000 for 150%).
     * @param _liquidationIncentive Liquidation bonus in basis points (e.g., 500 for 5%).
     * @return id Unique identifier (derived from the collateral and borrowed token symbols) for the newly created `Borrowing` contract.
     */
    function createBorrowing(
        address _collateralToken,
        address _borrowToken,
        address _collateralPriceFeed,
        address _borrowPriceFeed,
        uint256 _interestRatePerSecond,
        uint256 _maxBorrowPercentage,
        uint256 _liquidationThreshold,
        uint256 _liquidationIncentive
    ) external onlyRole(GOVERNOR_ROLE) returns (string memory id) {
        // Retrieve token symbols for identifier generation
        string memory collateralSymbol = IERC20Metadata(_collateralToken).symbol();
        string memory borrowSymbol = IERC20Metadata(_borrowToken).symbol();

        // Generate a unique identifier from token symbols (e.g., "ETH-DAI")
        id = string(abi.encodePacked(collateralSymbol, "-", borrowSymbol));
        require(address(borrowings[id]) == address(0), "Borrowing already exists");

        // Deploy `Borrowing` contract with specified parameters
        Borrowing borrowing = new Borrowing(
            _collateralToken,
            _borrowToken,
            _collateralPriceFeed,
            _borrowPriceFeed,
            _interestRatePerSecond,
            _maxBorrowPercentage,
            _liquidationThreshold,
            _liquidationIncentive
        );
        borrowings[id] = borrowing;

        emit BorrowingCreated(address(borrowing), _collateralToken, _borrowToken, id);

        return id;
    }

    /**
     * @notice Returns the `Borrowing` contract instance associated with the given identifier.
     * @param id Unique identifier derived from the collateral and borrowed token symbols (e.g., "ETH-DAI").
     * @return The `Borrowing` contract instance.
     */
    function getBorrowing(string memory id) external view returns (Borrowing) {
        return borrowings[id];
    }
}
