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
    /// @notice Address of the `DepositTokenFactory` used to deploy `DepositToken` instances.
    DepositTokenFactory public depositTokenFactory;

    /// @notice Mapping that associates an identifier (e.g., "DAI") with its corresponding `LendingPool` contract instance.
    mapping(string => LendingPool) public lendingPools;

    /// @notice Reference to the shared protocol access control contract.
    ProtocolAccessControl public protocolAccessControl;

    /// @notice Event emitted when a new `LendingPool` is created.
    /// @param lendingPoolAddress Address of the newly deployed `LendingPool` contract.
    /// @param underlyingToken Address of the underlying ERC20 token.
    /// @param depositTokenAddress Address of the corresponding `DepositToken`.
    /// @param id Identifier derived from the symbol of the underlying token.
    /// @param interestRatePerSecond Interest rate applied per second (scaled to 1e18 precision).
    event LendingPoolCreated(
        address indexed lendingPoolAddress,
        address indexed underlyingToken,
        address depositTokenAddress,
        string id,
        uint256 interestRatePerSecond
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
        require(address(lendingPools[id]) == address(0), "LendingPool already exists");

        // Deploy `DepositToken` via `DepositTokenFactory`
        string memory depositTokenId = depositTokenFactory.createDepositToken(_underlyingToken, address(this));
        DepositToken depositToken = depositTokenFactory.depositTokens(depositTokenId);

        // Deploy `LendingPool`, linking it with the underlying token, `DepositToken`, and interest rate
        LendingPool pool = new LendingPool(
            _underlyingToken, address(depositToken), _interestRatePerSecond, address(protocolAccessControl)
        );
        lendingPools[id] = pool;

        // Grant the LENDING_ROLE to the `LendingPool` in the shared access control contract
        protocolAccessControl.grantRole(protocolAccessControl.LENDING_ROLE(), address(pool));

        emit LendingPoolCreated(address(pool), _underlyingToken, address(depositToken), id, _interestRatePerSecond);
        return id;
    }

    /**
     * @notice Returns the `LendingPool` associated with the given identifier.
     * @param id Identifier derived from the symbol of the underlying token.
     * @return The `LendingPool` contract instance.
     */
    function getLendingPool(string memory id) external view returns (LendingPool) {
        return lendingPools[id];
    }
}
