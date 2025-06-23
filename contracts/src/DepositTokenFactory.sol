// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./DepositToken.sol";
import "./ProtocolAccessControl.sol";

/**
 * @title DepositTokenFactory
 * @notice Factory contract for deploying `DepositToken` contracts, representing users' shares in a liquidity pool.
 *         The identifier for each `DepositToken` is derived from the underlying token's symbol.
 * @dev This contract uses a shared ProtocolAccessControl for access management.
 */
contract DepositTokenFactory {
    struct DepositTokenInfo {
        string id;
        address tokenAddress;
        string name;
        string symbol;
        address liquidityPool;
    }

    /// @notice Array that stores all deposit token information.
    DepositTokenInfo[] public depositTokens;

    /// @notice Mapping for quick ID lookup to array index.
    mapping(string => uint256) private depositTokenIdToIndex;

    /// @notice Mapping to track if an ID exists (needed because index 0 is valid).
    mapping(string => bool) private depositTokenExists;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Event emitted when a new `DepositToken` is created.
    /// @param tokenAddress Address of the newly deployed `DepositToken` contract.
    /// @param name Name of the `DepositToken`.
    /// @param symbol Symbol of the `DepositToken`.
    /// @param liquidityPool Address of the liquidity pool that owns the `DepositToken`.
    /// @param id Identifier derived from the underlying token's symbol.
    /// @param index Index in the depositTokens array.
    event DepositTokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        address indexed liquidityPool,
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
        require(protocolAccessControl.hasRole(role, msg.sender), "AccessControl: caller does not have required role");
        _;
    }

    /**
     * @notice Deploys a new `DepositToken` contract for a given underlying ERC20 token.
     * @dev Ensures that no `DepositToken` already exists for the given identifier.
     * @param underlyingToken Address of the underlying ERC20 token (e.g., DAI).
     * @param liquidityPool Address of the liquidity pool contract that will own the `DepositToken`
     *                      (authorized to mint and burn tokens).
     * @return id The identifier generated (e.g., "DAI") for the newly created `DepositToken`.
     */
    function createDepositToken(address underlyingToken, address liquidityPool)
        external
        onlyRole(protocolAccessControl.GOVERNOR_ROLE())
        returns (string memory id)
    {
        // Retrieve metadata (symbol and name) of the underlying ERC20 token
        IERC20Metadata token = IERC20Metadata(underlyingToken);
        string memory tokenSymbol = token.symbol();
        string memory tokenName = token.name();

        // Use the token symbol as the unique identifier
        id = tokenSymbol;
        require(!depositTokenExists[id], "DepositToken already exists");

        // Construct name and symbol for the `DepositToken`
        string memory depositTokenName = string(abi.encodePacked("Deposit ", tokenName));
        string memory depositTokenSymbol = string(abi.encodePacked("d", tokenSymbol));

        // Deploy the `DepositToken` contract
        DepositToken dt = new DepositToken(depositTokenName, depositTokenSymbol, address(protocolAccessControl));

        // Store deposit token information
        uint256 index = depositTokens.length;
        depositTokens.push(
            DepositTokenInfo({
                id: id,
                tokenAddress: address(dt),
                name: depositTokenName,
                symbol: depositTokenSymbol,
                liquidityPool: liquidityPool
            })
        );
        depositTokenIdToIndex[id] = index;
        depositTokenExists[id] = true;

        // Emit event after successful deployment
        emit DepositTokenCreated(address(dt), depositTokenName, depositTokenSymbol, liquidityPool, id, index);

        return id;
    }

    /**
     * @notice Returns the address of the `DepositToken` associated with the given identifier.
     * @param id Identifier derived from the symbol of the underlying token.
     * @return The `DepositToken` contract address.
     */
    function getDepositToken(string memory id) external view returns (address) {
        require(depositTokenExists[id], "DepositToken not found");
        uint256 index = depositTokenIdToIndex[id];
        return depositTokens[index].tokenAddress;
    }

    /**
     * @notice Returns paginated deposit token information.
     * @param offset Starting index for pagination.
     * @param limit Maximum number of items to return (max 50).
     * @return result Array of DepositTokenInfo structs.
     * @return total Total number of deposit tokens.
     */
    function getDepositTokensPaginated(uint256 offset, uint256 limit)
        external
        view
        returns (DepositTokenInfo[] memory result, uint256 total)
    {
        require(limit <= 100, "Limit exceeds maximum of 100");
        require(limit > 0, "Limit must be greater than 0");

        total = depositTokens.length;
        if (offset >= total) {
            return (new DepositTokenInfo[](0), total);
        }

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        result = new DepositTokenInfo[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = depositTokens[i];
        }

        return (result, total);
    }

    /**
     * @notice Returns the total number of deposit tokens.
     * @return The total count of deposit tokens.
     */
    function getDepositTokensCount() external view returns (uint256) {
        return depositTokens.length;
    }

    /**
     * @notice Returns deposit token information by index.
     * @param index Index in the depositTokens array.
     * @return DepositTokenInfo struct at the specified index.
     */
    function getDepositTokenByIndex(uint256 index) external view returns (DepositTokenInfo memory) {
        require(index < depositTokens.length, "Index out of bounds");
        return depositTokens[index];
    }

    /**
     * @notice Checks if a deposit token with the given ID exists.
     * @param id Unique identifier to check.
     * @return True if deposit token exists, false otherwise.
     */
    function depositTokenExistsById(string memory id) external view returns (bool) {
        return depositTokenExists[id];
    }
}
