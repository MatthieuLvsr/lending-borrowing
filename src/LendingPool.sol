// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DepositToken.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import "./ProtocolAccessControl.sol";

/**
 * @title LendingPool
 * @notice Manages a liquidity pool for an ERC20 token, allowing deposits and withdrawals.
 *         Users receive `DepositToken` representing their share in the pool.
 *         The value of `DepositToken` changes over time due to interest accrual via `exchangeRate`.
 * @dev The `DepositToken` contract is specified at deployment via the constructor.
 */
contract LendingPool is ProtocolAccessControl {
    /// @notice Token representing user shares in the pool.
    DepositToken public depositToken;

    /// @notice Underlying ERC20 token accepted for deposits (e.g., DAI).
    IERC20 public underlyingToken;

    /// @notice Conversion rate between `DepositToken` and the underlying token.
    /// @dev Scaled to 1e18 precision, initially set to 1.
    uint256 public exchangeRate;

    /// @notice Timestamp of the last interest accrual update.
    uint256 public lastAccrualTimestamp;

    /// @notice Interest rate applied per second, scaled to 1e18 precision.
    uint256 public interestRatePerSecond;

    /// @notice Emitted when a user deposits underlying tokens into the pool.
    event Deposit(
        address indexed user,
        uint256 underlyingAmount,
        uint256 tokenAmount
    );

    /// @notice Emitted when a user withdraws funds from the pool.
    event Withdraw(
        address indexed user,
        uint256 underlyingAmount,
        uint256 tokenAmount
    );

    /**
     * @notice Initializes the lending pool contract.
     * @param _underlyingToken Address of the underlying ERC20 token (e.g., DAI).
     * @param _depositToken Address of the associated `DepositToken`, deployed via `DepositTokenFactory`.
     * @param _interestRatePerSecond Interest rate applied per second, with 1e18 precision.
     */
    constructor(
        address _underlyingToken,
        address _depositToken,
        uint256 _interestRatePerSecond
    ) {
        underlyingToken = IERC20(_underlyingToken);
        depositToken = DepositToken(_depositToken);
        interestRatePerSecond = _interestRatePerSecond;
        exchangeRate = 1e18; // Initially, 1 DepositToken = 1 underlying unit
        lastAccrualTimestamp = block.timestamp;
    }

    /**
     * @notice Allows users to deposit ERC20 tokens into the pool.
     *         Users must approve the contract to transfer their tokens beforehand.
     * @param amount Amount of underlying tokens to deposit.
     */
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Transfer underlying tokens from the user to the contract
        require(
            underlyingToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        _accrueInterest();

        // Calculate the number of DepositTokens to mint: (amount * 1e18) / exchangeRate
        uint256 tokenAmount = (amount * 1e18) / exchangeRate;
        depositToken.mint(msg.sender, tokenAmount);

        emit Deposit(msg.sender, amount, tokenAmount);
    }

    /**
     * @notice Allows users to withdraw their deposited funds.
     *         The number of `DepositToken` burned determines the amount of underlying tokens received.
     * @param tokenAmount Amount of `DepositToken` to burn for withdrawal.
     */
    function withdraw(uint256 tokenAmount) external {
        require(tokenAmount > 0, "Token amount must be greater than zero");

        _accrueInterest();

        // Calculate the equivalent underlying token amount: (tokenAmount * exchangeRate) / 1e18
        uint256 underlyingAmount = (tokenAmount * exchangeRate) / 1e18;
        require(
            underlyingToken.balanceOf(address(this)) >= underlyingAmount,
            "Insufficient funds"
        );

        // Burn `DepositToken` and transfer the equivalent underlying tokens
        depositToken.burn(msg.sender, tokenAmount);
        require(
            underlyingToken.transfer(msg.sender, underlyingAmount),
            "Transfer failed"
        );

        emit Withdraw(msg.sender, underlyingAmount, tokenAmount);
    }

    /**
     * @dev Accrues interest by updating `exchangeRate` based on the time elapsed since the last update.
     *      Interest is calculated as: `exchangeRate += exchangeRate * interestRatePerSecond * timeElapsed / 1e18`.
     */
    function _accrueInterest() internal {
        uint256 currentTime = block.timestamp;
        if (currentTime > lastAccrualTimestamp) {
            uint256 timeElapsed = currentTime - lastAccrualTimestamp;
            uint256 interestAccrued = (exchangeRate *
                interestRatePerSecond *
                timeElapsed) / 1e18;
            exchangeRate += interestAccrued;
            lastAccrualTimestamp = currentTime;
        }
    }

    function setInterestRate(uint256 _value) external onlyRole(GOVERNOR_ROLE) {
        interestRatePerSecond = _value;
    }
}
