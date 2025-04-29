# Lending and Borrowing Protocol Contract

This contract allows users to deposit collateral and borrow tokens on the Ethereum network. Users can deposit supported ERC20 tokens as collateral and borrow other tokens based on the value of their collateral. The protocol enforces collateralization ratios to ensure loans are secure and liquidations occur when necessary.
Users can also repay their loans to reclaim their collateral or face liquidation if their collateral value falls below the required threshold.
The contract collects fees from borrowing and repaying activities, which can be used to incentivize liquidity providers or fund protocol operations.

## Quick Start

```bash
git clone https://github.com/MatthieuLvsr/lending-borrowing.git
cd lending-borrowing/contracts
```

Test the contract

```bash
forge install
forge test -vv
forge coverage
forge coverage --report debug > report.log
```

Deploy the contract on the Ethereum network

```bash
source .env
forge script script/Deploy.s.sol --rpc-url $RPC_URL --sender $PUBLIC_WALLET_ADDRESS --private-key $PRIVATE_KEY -vvvv --broadcast
```

You can delete --broadcast if you just want to see if the deployment script is correct
