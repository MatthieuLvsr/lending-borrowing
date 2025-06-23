// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./LendingPool.sol";
import "./DepositToken.sol";
import "./DepositTokenFactory.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./ProtocolAccessControl.sol";

/**
 * @title LendingPoolFactory
 * @notice Factory contract responsible for deploying both `DepositToken` and `LendingPool`
 *         for a given underlying ERC20 token. The identifier (`id`) is generated based on
 *         the symbol of the underlying token.
 * @dev Uses a `DepositTokenFactory` to deploy `DepositToken` before creating the `LendingPool`.
 */
contract LendingPoolFactory {
    struct LendingPoolInfo {
        string id;
        address lendingPoolAddress;
        address underlyingToken;
        address depositTokenAddress;
        uint256 interestRatePerSecond;
    }

    /// @notice Address of the `DepositTokenFactory` used to deploy `DepositToken` instances.
    DepositTokenFactory public depositTokenFactory;

    /// @notice Array that stores all lending pool information.
    LendingPoolInfo[] public lendingPools;

    /// @notice Mapping for quick ID lookup to array index.
    mapping(string => uint256) private lendingPoolIdToIndex;

    /// @notice Mapping to track if an ID exists (needed because index 0 is valid).
    mapping(string => bool) private lendingPoolExists;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Event emitted when a new `LendingPool` is created.
    /// @param lendingPoolAddress Address of the newly deployed `LendingPool` contract.
    /// @param underlyingToken Address of the underlying ERC20 token.
    /// @param depositTokenAddress Address of the corresponding `DepositToken`.
    /// @param id Identifier derived from the symbol of the underlying token.
    /// @param interestRatePerSecond Interest rate applied per second (scaled to 1e18 precision).
    /// @param index Index in the lendingPools array.
    event LendingPoolCreated(
        address indexed lendingPoolAddress,
        address indexed underlyingToken,
        address depositTokenAddress,
        string id,
        uint256 interestRatePerSecond,
        uint256 index
    );

    /**
     * @notice Initializes the factory with the address of the `DepositTokenFactory`.
     * @param _depositTokenFactory Address of the `DepositTokenFactory` contract.
     * @param _protocolAccessControl Address of the shared protocol access control contract.
     */
    constructor(address _depositTokenFactory, address _protocolAccessControl) {
        depositTokenFactory = DepositTokenFactory(_depositTokenFactory);
        protocolAccessControl = ProtocolAccessControl(_protocolAccessControl);
    }

    /**
     * @dev Modifier to check if the caller has the specified role.
     * @param role The role to check.
     */
    modifier onlyRole(bytes32 role) {
        require(protocolAccessControl.hasRole(role, msg.sender), "AccessControl: caller does not have required role");
        _;
    }

    /**
     * @notice Deploys a new `LendingPool` for the specified underlying ERC20 token.
     * @dev This function:
     *      - Retrieves the name and symbol of the underlying token.
     *      - Generates an identifier (`id`) from the token's symbol.
     *      - Deploys the corresponding `DepositToken` via the `DepositTokenFactory`.
     *      - Deploys the `LendingPool`, linking it with the `DepositToken`.
     *      - Transfers ownership of the `DepositToken` to the `LendingPool`, enabling minting and burning.
     * @param _underlyingToken Address of the underlying ERC20 token (e.g., DAI).
     * @param _interestRatePerSecond Interest rate per second (scaled to 1e18 precision).
     * @return id The generated identifier (derived from the underlying token's symbol) for the newly created `LendingPool`.
     */
    function createLendingPool(address _underlyingToken, uint256 _interestRatePerSecond)
        external
        onlyRole(protocolAccessControl.GOVERNOR_ROLE())
        returns (string memory id)
    {
        // Retrieve metadata of the underlying token
        IERC20Metadata underlying = IERC20Metadata(_underlyingToken);
        string memory tokenSymbol = underlying.symbol();

        // Use the token's symbol as the unique identifier
        id = tokenSymbol;
        require(!lendingPoolExists[id], "LendingPool already exists");

        // Deploy `DepositToken` via `DepositTokenFactory`
        string memory depositTokenId = depositTokenFactory.createDepositToken(_underlyingToken, address(this));
        address depositTokenAddress = depositTokenFactory.getDepositToken(depositTokenId);

        // Deploy `LendingPool`, linking it with the underlying token, `DepositToken`, and interest rate
        LendingPool pool = new LendingPool(
            _underlyingToken, depositTokenAddress, _interestRatePerSecond, address(protocolAccessControl)
        );

        // Store lending pool information
        uint256 index = lendingPools.length;
        lendingPools.push(
            LendingPoolInfo({
                id: id,
                lendingPoolAddress: address(pool),
                underlyingToken: _underlyingToken,
                depositTokenAddress: depositTokenAddress,
                interestRatePerSecond: _interestRatePerSecond
            })
        );
        lendingPoolIdToIndex[id] = index;
        lendingPoolExists[id] = true;

        // Grant the LENDING_ROLE to the `LendingPool` in the shared access control contract
        protocolAccessControl.grantRole(protocolAccessControl.LENDING_ROLE(), address(pool));

        emit LendingPoolCreated(address(pool), _underlyingToken, depositTokenAddress, id, _interestRatePerSecond, index);
        return id;
    }

    /**
     * @notice Returns the `LendingPool` address associated with the given identifier.
     * @param id Identifier derived from the symbol of the underlying token.
     * @return The `LendingPool` contract address.
     */
    function getLendingPool(string memory id) external view returns (address) {
        require(lendingPoolExists[id], "LendingPool not found");
        uint256 index = lendingPoolIdToIndex[id];
        return lendingPools[index].lendingPoolAddress;
    }

    /**
     * @notice Returns paginated lending pool information.
     * @param offset Starting index for pagination.
     * @param limit Maximum number of items to return (max 50).
     * @return result Array of LendingPoolInfo structs.
     * @return total Total number of lending pools.
     */
    function getLendingPoolsPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (LendingPoolInfo[] memory result, uint256 total)
    {
        require(limit <= 100, "Limit exceeds maximum of 100");
        require(limit > 0, "Limit must be greater than 0");

        total = lendingPools.length;
        if (offset >= total) {
            return (new LendingPoolInfo[](0), total);
        }

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        result = new LendingPoolInfo[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = lendingPools[i];
        }

        return (result, total);
    }

    /**
     * @notice Returns the total number of lending pools.
     * @return The total count of lending pools.
     */
    function getLendingPoolsCount() external view returns (uint256) {
        return lendingPools.length;
    }

    /**
     * @notice Returns lending pool information by index.
     * @param index Index in the lendingPools array.
     * @return LendingPoolInfo struct at the specified index.
     */
    function getLendingPoolByIndex(uint256 index) external view returns (LendingPoolInfo memory) {
        require(index < lendingPools.length, "Index out of bounds");
        return lendingPools[index];
    }

    /**
     * @notice Checks if a lending pool with the given ID exists.
     * @param id Unique identifier to check.
     * @return True if lending pool exists, false otherwise.
     */
    function lendingPoolExistsById(string memory id) external view returns (bool) {
        return lendingPoolExists[id];
    }
}
