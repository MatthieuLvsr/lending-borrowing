# 🏦 DeFi Lending & Borrowing Protocol

A comprehensive decentralized finance (DeFi) lending and borrowing platform built with modern Web3 technologies. This full-stack protocol enables users to deposit ERC20 tokens as collateral, borrow assets, earn interest on deposits, and participate in a secure, overcollateralized lending ecosystem.

## 🌟 Features

### 🔐 **Smart Contract Protocol**
- **Collateralized Lending** - Deposit ERC20 tokens and borrow against their value
- **Interest Accrual** - Earn competitive yields on deposits and pay fair rates on loans
- **Automated Liquidations** - Protect the protocol through liquidation mechanisms
- **Oracle Integration** - Chainlink price feeds for accurate asset pricing
- **Role-Based Governance** - Secure access control for protocol parameters

### 🎨 **Modern Frontend**
- **Multi-Wallet Support** - Connect with MetaMask, WalletConnect, and more
- **Real-Time Data** - Live interest rates, collateral ratios, and market data
- **Responsive Design** - Optimized for desktop and mobile trading
- **Type-Safe** - Full TypeScript integration with Web3 libraries
- **Performance Optimized** - Sub-2s load times with 90%+ accessibility score

## 🏗 Project Structure

```
lending-borrowing/
├── contracts/              # Smart contract protocol
│   ├── src/               # Solidity contracts
│   ├── test/              # Contract tests
│   ├── script/            # Deployment scripts
│   └── README.md          # Contract documentation
├── front/                 # Frontend application
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Web3 integrations
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Bun** >= 1.0.0 (recommended for frontend)
- **Foundry** (for smart contracts)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/MatthieuLvsr/lending-borrowing.git
cd lending-borrowing
```

### 2. Smart Contracts Setup

```bash
cd contracts

# Install Foundry dependencies
forge install

# Run tests
forge test -vv

# Check coverage
forge coverage

# Deploy (after setting up .env)
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
```

### 3. Frontend Setup

```bash
cd front

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Core Protocol Contracts

### **Primary Contracts**
- **`Borrowing.sol`** - Manages loans, collateral, and liquidations
- **`LendingPool.sol`** - Handles deposits, withdrawals, and interest accrual
- **`ProtocolAccessControl.sol`** - Role-based access control and governance

### **Factory Contracts**
- **`BorrowingFactory.sol`** - Deploys borrowing contracts for token pairs
- **`LendingPoolFactory.sol`** - Creates lending pools for ERC20 tokens
- **`DepositTokenFactory.sol`** - Deploys deposit receipt tokens

### **Token Standards**
- **`DepositToken.sol`** - ERC20 representing user shares in lending pools

## 🔄 How It Works

### **For Lenders:**
1. **Deposit** ERC20 tokens into lending pools
2. **Receive** deposit tokens representing your pool share
3. **Earn** interest on your deposits over time
4. **Withdraw** anytime by burning deposit tokens

### **For Borrowers:**
1. **Deposit** collateral tokens into the protocol
2. **Borrow** up to your maximum borrowing capacity
3. **Pay** interest on borrowed amounts
4. **Repay** loans to unlock collateral

### **For Liquidators:**
1. **Monitor** loan health and collateral ratios
2. **Liquidate** undercollateralized positions
3. **Earn** liquidation bonuses for protecting the protocol

## 🛠 Technology Stack

### **Smart Contracts**
- **Solidity ^0.8.19** - Smart contract language
- **Foundry** - Development framework and testing
- **OpenZeppelin** - Security-audited contract libraries
- **Chainlink** - Decentralized oracle network

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum client
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### **Development & CI/CD**
- **Biome** - Fast linting and formatting
- **GitHub Actions** - Automated testing and deployment
- **Lighthouse CI** - Performance and accessibility monitoring
- **Bundle Analysis** - JavaScript optimization tracking

## 🧪 Testing & Quality Assurance

### **Smart Contract Testing**
```bash
cd contracts
forge test -vv                    # Run all tests
forge coverage                    # Generate coverage report
forge test --match-test testName  # Run specific test
```

### **Frontend Testing**
```bash
cd front
bun run type-check    # TypeScript validation
bun run lint          # Code quality checks
bun run build         # Production build test
bun run lighthouse    # Performance audit
```

## 🔐 Security Features

- **Overcollateralization** - Loans must maintain healthy collateral ratios
- **Price Oracle Integration** - Chainlink feeds for accurate asset pricing
- **Liquidation Protection** - Automated liquidation prevents protocol losses
- **Role-Based Access** - Governance and operational role separation
- **Comprehensive Testing** - Full test coverage for critical functions
- **Security Audits** - Following OpenZeppelin security patterns

## 📊 Performance Standards

### **Smart Contracts**
- **Gas Optimization** - Efficient contract execution
- **Test Coverage** - >95% line coverage requirement
- **Security Patterns** - Industry-standard security practices

### **Frontend**
- **Performance** - 80%+ Lighthouse performance score
- **Accessibility** - 90%+ accessibility compliance (enforced)
- **Bundle Size** - Monitored and optimized for fast loading
- **Core Web Vitals** - Meets Google's performance standards

## 🚦 CI/CD Pipeline

### **Automated Quality Checks**
- ✅ Smart contract compilation and testing
- ✅ Frontend linting and type checking
- ✅ Security vulnerability scanning
- ✅ Performance benchmarking
- ✅ Bundle size analysis
- ✅ Accessibility compliance testing

### **Deployment Process**
- **Contracts**: Foundry deployment scripts with verification
- **Frontend**: Optimized production builds with performance monitoring

## 🤝 Contributing

We welcome contributions to improve the protocol! Please follow these guidelines:

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the code style and testing requirements
4. **Ensure** all CI checks pass
5. **Submit** a pull request with clear description

### **Code Standards**
- **Smart Contracts**: Follow Solidity style guide and OpenZeppelin patterns
- **Frontend**: Use TypeScript, follow Biome formatting, maintain accessibility
- **Testing**: Comprehensive test coverage for new features
- **Documentation**: Update relevant README files

## 📜 Governance & Roles

### **Protocol Roles**
- **`GOVERNOR_ROLE`** - Adjust protocol parameters and upgrade contracts
- **`LIQUIDATOR_ROLE`** - Execute liquidations on undercollateralized loans
- **`LENDING_ROLE`** - Manage deposit token minting and burning

### **Governance Parameters**
- Interest rates and risk parameters
- Collateralization thresholds
- Liquidation bonuses and penalties
- Supported asset additions

## 📞 Support & Community

- **Documentation**: Comprehensive guides in `/contracts` and `/front` README files
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions
- **Contact**: [MatthieuLvsr](https://github.com/MatthieuLvsr)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to the amazing open-source communities:

- **OpenZeppelin** - Secure and tested smart contract libraries
- **Chainlink** - Reliable decentralized oracle infrastructure
- **Next.js Team** - Modern React framework
- **Foundry** - Fast and flexible Ethereum development
- **Wagmi & Viem** - Excellent Web3 developer experience

---

## 🎯 Getting Help

### **Smart Contract Questions**
See [contracts/README.md](contracts/README.md) for detailed contract documentation.

### **Frontend Development**
See [front/README.md](front/README.md) for frontend setup and development guide.

### **General Questions**
Open an issue with the `question` label and we'll help you get started!

---

**Built with ❤️ for the decentralized future**

🌟 **Star this repository if you found it helpful!**
