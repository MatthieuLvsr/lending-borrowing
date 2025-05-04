// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// ====================================================================
// Region: Imports
// ====================================================================
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ProtocolAccessControl.sol";

// ====================================================================
// Region: Contract Definition - DepositToken
// ====================================================================
/**
 * @title DepositToken
 * @notice ERC20 token contract with mint and burn functionalities controlled by a designated role.
 * @dev Inherits from the ERC20 standard and ProtocolAccessControl for access control.
 */
contract DepositToken is ERC20, ProtocolAccessControl {
    // ====================================================================
    // Region: Constructor
    // ====================================================================
    /**
     * @notice Initializes the DepositToken contract with a specified name and symbol.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     */
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Constructor implementation remains unchanged.
    }

    // ====================================================================
    // Region: External Functions
    // ====================================================================
    /**
     * @notice Mints new tokens to a specified address.
     * @dev Restricted to accounts with the LENDING_ROLE.
     * @param to The recipient address for the minted tokens.
     * @param amount The number of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyRole(LENDING_ROLE) {
        _mint(to, amount);
    }

    /**
     * @notice Burns tokens from a specified address.
     * @dev Restricted to accounts with the LENDING_ROLE.
     * @param from The address from which tokens will be burned.
     * @param amount The number of tokens to burn.
     */
    function burn(address from, uint256 amount) external onlyRole(LENDING_ROLE) {
        _burn(from, amount);
    }
}
