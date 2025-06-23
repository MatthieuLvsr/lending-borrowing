# 🌟 Lending and Borrowing Protocol

Welcome to the **Lending and Borrowing Protocol**! This decentralized protocol allows users to deposit ERC20 tokens as collateral, borrow other tokens, and earn interest on their deposits. The protocol ensures security through collateralization ratios, interest accrual, and liquidation mechanisms.

---

## 🚀 Features

- **Deposit & Borrow**: Deposit supported ERC20 tokens as collateral and borrow other tokens based on their value.
- **Interest Accrual**: Earn interest on deposits or pay interest on borrowed amounts.
- **Liquidation Mechanism**: Protect the protocol by liquidating undercollateralized loans.
- **Customizable Parameters**: Governed by roles to adjust interest rates, collateralization thresholds, and more.
- **Chainlink Integration**: Uses Chainlink price feeds for accurate and reliable token pricing.

---

## 📂 Contract Overview

### 1. **Core Contracts**
- **`Borrowing.sol`**: Manages borrowing, repayment, and liquidation of loans.
- **`LendingPool.sol`**: Handles deposits and withdrawals, with interest accrual via `exchangeRate`.

### 2. **Factory Contracts**
- **`BorrowingFactory.sol`**: Deploys `Borrowing` contracts for specific token pairs (e.g., ETH-DAI).
- **`LendingPoolFactory.sol`**: Deploys `LendingPool` contracts for specific ERC20 tokens.

### 3. **Token Contracts**
- **`DepositToken.sol`**: ERC20 token representing user shares in a liquidity pool.
- **`DepositTokenFactory.sol`**: Deploys `DepositToken` contracts for liquidity pools.

### 4. **Access Control**
- **`ProtocolAccessControl.sol`**: Centralized role-based access control for governance, liquidation, and lending.

---

## 🛠️ How It Works

1. **Deposit Collateral**: Users deposit ERC20 tokens into a `LendingPool` and receive `DepositToken` as proof of their share.
2. **Borrow Funds**: Borrow tokens based on the value of deposited collateral, up to a maximum borrow percentage.
3. **Repay Loans**: Repay borrowed tokens to reduce debt and reclaim collateral.
4. **Liquidation**: If collateral value falls below the liquidation threshold, loans can be liquidated by liquidators.

---

## 📜 Deployment Instructions

### Clone the Repository
```bash
git clone https://github.com/MatthieuLvsr/lending-borrowing.git
cd lending-borrowing/contracts
```

### Install Dependencies
```bash
forge install
```

### Run Tests
```bash
forge test -vv
```

### Check Coverage
```bash
forge coverage --ir-minimum
forge coverage --report debug > report.log --ir-minimum
```

### Deploy Contracts
1. Set up your `.env` file with the following variables:
   ```env
   RPC_URL=<Your Ethereum RPC URL>
   PUBLIC_WALLET_ADDRESS=<Your Wallet Address>
   PRIVATE_KEY=<Your Private Key>
   ```
2. Deploy the contracts:
   ```bash
   source .env
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --sender $PUBLIC_WALLET_ADDRESS --private-key $PRIVATE_KEY -vvvv --broadcast
   ```
   > **Note**: Remove `--broadcast` to simulate the deployment without broadcasting transactions.

---

## 🧩 Understanding the Contracts

### **Borrowing**
- **Collateral Management**: Deposit and track collateral.
- **Borrowing Logic**: Borrow tokens based on collateral value.
- **Repayment**: Repay loans partially or fully.
- **Liquidation**: Liquidate undercollateralized loans with a liquidation bonus.

### **LendingPool**
- **Deposits**: Users deposit ERC20 tokens and receive `DepositToken`.
- **Withdrawals**: Burn `DepositToken` to withdraw underlying tokens.
- **Interest Accrual**: Updates `exchangeRate` to reflect interest earned.

### **Factories**
- **BorrowingFactory**: Deploys `Borrowing` contracts for token pairs.
- **LendingPoolFactory**: Deploys `LendingPool` and `DepositToken` contracts for ERC20 tokens.

---

## 📜 Governance Roles

- **`GOVERNOR_ROLE`**: Adjust protocol parameters (e.g., interest rates, thresholds).
- **`LIQUIDATOR_ROLE`**: Execute liquidations on undercollateralized loans.
- **`LENDING_ROLE`**: Manage minting and burning of `DepositToken`.

---

## 📖 Example Workflow

1. **Deploy a Lending Pool**:
   - Use `LendingPoolFactory` to create a new pool for an ERC20 token.
   - Automatically deploys a `DepositToken` for the pool.

2. **Deposit Tokens**:
   - Users deposit tokens into the pool and receive `DepositToken`.

3. **Borrow Funds**:
   - Users borrow tokens based on their collateral value.

4. **Repay Loans**:
   - Borrowers repay loans to reduce debt and reclaim collateral.

5. **Liquidate Loans**:
   - Liquidators repay undercollateralized loans and seize collateral.

---

## 🛡️ Security Features

- **Collateralization Ratios**: Ensures loans are overcollateralized.
- **Liquidation Mechanism**: Protects the protocol from bad debt.
- **Role-Based Access Control**: Restricts sensitive actions to authorized roles.
- **Chainlink Oracles**: Provides accurate and tamper-resistant price feeds.

---

## 🤝 Contributing

We welcome contributions to improve the protocol! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

---

## 📬 Contact

For questions or support, feel free to reach out:

- **GitHub**: [MatthieuLvsr](https://github.com/MatthieuLvsr)
- **Email**: [Your Email Address]

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](../LICENSE) file for details.

---

## 🌟 Acknowledgments

Special thanks to:
- **OpenZeppelin**: For their robust and secure smart contract libraries.
- **Chainlink**: For providing reliable price feeds.

---

🎉 **Happy Lending & Borrowing!**
```
