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
    /// @notice Mapping that associates an identifier (e.g., "DAI") with its corresponding `DepositToken` contract instance.
    mapping(string => DepositToken) public depositTokens;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Event emitted when a new `DepositToken` is created.
    /// @param tokenAddress Address of the newly deployed `DepositToken` contract.
    /// @param name Name of the `DepositToken`.
    /// @param symbol Symbol of the `DepositToken`.
    /// @param liquidityPool Address of the liquidity pool that owns the `DepositToken`.
    /// @param id Identifier derived from the underlying token's symbol.
    event DepositTokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        address indexed liquidityPool,
        string id
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
     * @notice Deploys a new `DepositToken` contract for a given underlying ERC20 token.
     * @dev Ensures that no `DepositToken` already exists for the given identifier.
     * @param underlyingToken Address of the underlying ERC20 token (e.g., DAI).
     * @param liquidityPool Address of the liquidity pool contract that will own the `DepositToken`
     *                      (authorized to mint and burn tokens).
     * @return id The identifier generated (e.g., "DAI") for the newly created `DepositToken`.
     */
    function createDepositToken(
        address underlyingToken,
        address liquidityPool
    )
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
        require(
            address(depositTokens[id]) == address(0),
            "DepositToken already exists"
        );

        // Construct name and symbol for the `DepositToken`
        string memory depositTokenName = string(
            abi.encodePacked("Deposit ", tokenName)
        );
        string memory depositTokenSymbol = string(
            abi.encodePacked("d", tokenSymbol)
        );

        // Deploy the `DepositToken` contract
        DepositToken dt = new DepositToken(
            depositTokenName,
            depositTokenSymbol,
            address(protocolAccessControl)
        );
        depositTokens[id] = dt;

        // Emit event after successful deployment
        emit DepositTokenCreated(
            address(dt),
            depositTokenName,
            depositTokenSymbol,
            liquidityPool,
            id
        );
    }

    /**
     * @notice Returns the address of the `DepositToken` associated with the given identifier.
     * @param id Identifier derived from the symbol of the underlying token.
     * @return The `DepositToken` contract instance.
     */
    function getDepositToken(
        string memory id
    ) external view returns (DepositToken) {
        return depositTokens[id];
    }
}
