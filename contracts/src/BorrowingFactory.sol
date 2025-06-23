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
contract BorrowingFactory {
    struct BorrowingInfo {
        string id;
        address borrowingAddress;
        address collateralToken;
        address borrowToken;
    }

    /// @notice Array that stores all borrowing contract information.
    BorrowingInfo[] public borrowings;

    /// @notice Mapping for quick ID lookup to array index.
    mapping(string => uint256) private borrowingIdToIndex;

    /// @notice Mapping to track if an ID exists (needed because index 0 is valid).
    mapping(string => bool) private borrowingExists;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Event emitted when a new `Borrowing` contract is deployed.
    /// @param borrowingAddress Address of the newly deployed `Borrowing` contract.
    /// @param collateralToken Address of the ERC20 token used as collateral.
    /// @param borrowToken Address of the ERC20 token that will be borrowed.
    /// @param id Unique identifier for the borrowing pair (e.g., "ETH-DAI").
    /// @param index Index in the borrowings array.
    event BorrowingCreated(
        address indexed borrowingAddress,
        address indexed collateralToken,
        address indexed borrowToken,
        string id,
        uint256 index
    );

    constructor(address _protocolAccessControl) {
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
    )
        external
        onlyRole(protocolAccessControl.GOVERNOR_ROLE())
        returns (string memory id)
    {
        // Retrieve token symbols for identifier generation
        string memory collateralSymbol = IERC20Metadata(_collateralToken)
            .symbol();
        string memory borrowSymbol = IERC20Metadata(_borrowToken).symbol();

        // Generate a unique identifier from token symbols (e.g., "ETH-DAI")
        id = string(abi.encodePacked(collateralSymbol, "-", borrowSymbol));
        require(!borrowingExists[id], "Borrowing already exists");

        // Deploy `Borrowing` contract with specified parameters
        Borrowing borrowing = new Borrowing(
            _collateralToken,
            _borrowToken,
            _collateralPriceFeed,
            _borrowPriceFeed,
            _interestRatePerSecond,
            _maxBorrowPercentage,
            _liquidationThreshold,
            _liquidationIncentive,
            address(protocolAccessControl)
        );

        // Store borrowing information
        uint256 index = borrowings.length;
        borrowings.push(
            BorrowingInfo({
                id: id,
                borrowingAddress: address(borrowing),
                collateralToken: _collateralToken,
                borrowToken: _borrowToken
            })
        );
        borrowingIdToIndex[id] = index;
        borrowingExists[id] = true;

        emit BorrowingCreated(
            address(borrowing),
            _collateralToken,
            _borrowToken,
            id,
            index
        );

        return id;
    }

    /**
     * @notice Returns the `Borrowing` contract address associated with the given identifier.
     * @param id Unique identifier derived from the collateral and borrowed token symbols (e.g., "ETH-DAI").
     * @return The `Borrowing` contract address.
     */
    function getBorrowing(string memory id) external view returns (address) {
        require(borrowingExists[id], "Borrowing not found");
        uint256 index = borrowingIdToIndex[id];
        return borrowings[index].borrowingAddress;
    }

    /**
     * @notice Returns paginated borrowing information.
     * @param offset Starting index for pagination.
     * @param limit Maximum number of items to return (max 50).
     * @return result Array of BorrowingInfo structs.
     * @return total Total number of borrowings.
     */
    function getBorrowingsPaginated(
        uint256 offset,
        uint256 limit
    ) external view returns (BorrowingInfo[] memory result, uint256 total) {
        require(limit <= 100, "Limit exceeds maximum of 100");
        require(limit > 0, "Limit must be greater than 0");

        total = borrowings.length;
        if (offset >= total) {
            return (new BorrowingInfo[](0), total);
        }

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        result = new BorrowingInfo[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = borrowings[i];
        }

        return (result, total);
    }

    /**
     * @notice Returns the total number of borrowing contracts.
     * @return The total count of borrowings.
     */
    function getBorrowingsCount() external view returns (uint256) {
        return borrowings.length;
    }

    /**
     * @notice Returns borrowing information by index.
     * @param index Index in the borrowings array.
     * @return BorrowingInfo struct at the specified index.
     */
    function getBorrowingByIndex(
        uint256 index
    ) external view returns (BorrowingInfo memory) {
        require(index < borrowings.length, "Index out of bounds");
        return borrowings[index];
    }

    /**
     * @notice Checks if a borrowing with the given ID exists.
     * @param id Unique identifier to check.
     * @return True if borrowing exists, false otherwise.
     */
    function borrowingExistsById(
        string memory id
    ) external view returns (bool) {
        return borrowingExists[id];
    }
}
