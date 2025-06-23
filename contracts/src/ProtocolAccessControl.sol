// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ProtocolAccessControl
 * @notice Centralized access control module for the protocol.
 * @dev Defines roles for administration, governance, and liquidation.
 *      This contract should be deployed once and referenced by other protocol contracts.
 */
contract ProtocolAccessControl is AccessControl {
    /// @notice Role for governance-related actions, such as modifying protocol parameters.
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    /// @notice Role for liquidators, allowing them to trigger liquidations.
    bytes32 public constant LIQUIDATOR_ROLE = keccak256("LIQUIDATOR_ROLE");
    bytes32 public constant LENDING_ROLE = keccak256("LENDING_ROLE");

    /**
     * @notice Initializes the contract, assigning the deployer all roles.
     * @dev The deployer is granted `DEFAULT_ADMIN_ROLE`, `GOVERNOR_ROLE`, and `LIQUIDATOR_ROLE`.
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNOR_ROLE, msg.sender);
        _grantRole(LIQUIDATOR_ROLE, msg.sender);
        _grantRole(LENDING_ROLE, msg.sender);
    }
}
