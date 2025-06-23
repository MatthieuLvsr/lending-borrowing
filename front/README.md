# DeFi Lending Platform - Frontend

A modern, high-performance DeFi lending and borrowing platform built with Next.js 15, TypeScript, and Web3 technologies. This application provides a seamless interface for users to lend and borrow digital assets in a decentralized manner.

## 🚀 Features

- **Modern Web3 Integration** - Connect with multiple wallets using Reown AppKit
- **Responsive Design** - Built with Tailwind CSS and Radix UI components
- **Type-Safe** - Full TypeScript support with strict type checking
- **Performance Optimized** - Next.js 15 with Turbopack for fast development
- **Accessibility First** - WCAG compliant with 90%+ Lighthouse accessibility score
- **Real-time Data** - React Query for efficient data fetching and caching
- **Dark/Light Mode** - Theme switching with next-themes
- **Professional UI** - Polished interface with Lucide React icons and toast notifications

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Web3 & Blockchain
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Viem](https://viem.sh/)** - TypeScript interface for Ethereum
- **[Reown AppKit](https://reown.com/)** - Multi-wallet connection interface

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### Data Management
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Development Tools
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Performance monitoring
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size analysis

## 🏃‍♂️ Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** >= 1.0.0 (recommended) or Node.js >= 18
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lending-borrowing/front
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

### Development
```bash
bun dev          # Start development server with Turbopack
bun build        # Build for production
bun start        # Start production server
```

### Code Quality
```bash
bun run lint           # Check code with Biome
bun run lint:check     # Check without fixing
bun run format         # Format code with Biome
bun run format:check   # Check formatting without fixing
bun run type-check     # Run TypeScript type checking
bun run ci             # Run all CI checks
```

### Analysis & Monitoring
```bash
bun run analyze     # Analyze bundle size
bun run lighthouse  # Run Lighthouse performance audit
bun run wagmi       # Generate Wagmi hooks
```

## 🏗 Project Structure

```
front/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── biome.json            # Biome configuration
├── lighthouserc.json     # Lighthouse CI configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Wallet Connect Project ID (get from https://cloud.reown.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-key
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-key

# Contract Addresses
NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=0x...
```

### Biome Configuration

Code formatting and linting rules are configured in `biome.json`:
- Tab indentation
- Double quotes for JavaScript
- Strict TypeScript rules
- React domain recommendations

### Performance Budgets

Lighthouse CI enforces performance standards:
- **Performance**: 80% minimum score
- **Accessibility**: 90% minimum score (enforced)
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1

## 🚦 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/ci-front.yml`):

### Pipeline Stages
1. **Lint & Format Check** - Biome CI with GitHub reporter
2. **TypeScript Check** - Strict type validation
3. **Build** - Production build verification
4. **Security Audit** - Dependency vulnerability scanning
5. **Bundle Analysis** - Size monitoring on PRs
6. **Lighthouse CI** - Performance and accessibility testing

### Quality Gates
- All linting and formatting must pass
- TypeScript compilation must succeed
- Build must complete without errors
- Security vulnerabilities are flagged
- Bundle size increases are monitored
- Performance scores must meet thresholds

## 🎯 Performance Monitoring

### Bundle Analysis
Monitor JavaScript bundle sizes and identify optimization opportunities:
```bash
bun run analyze
```

### Lighthouse Audits
Automated performance, accessibility, and SEO testing:
```bash
bun run lighthouse
```

Key metrics tracked:
- Core Web Vitals (LCP, FID, CLS)
- Accessibility compliance
- Best practices adherence
- SEO optimization

## 🧪 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write type-safe TypeScript code
   - Follow component patterns established in the codebase
   - Add proper error handling for Web3 interactions

3. **Test your changes**
   ```bash
   bun run type-check  # Verify TypeScript
   bun run lint        # Check code quality
   bun run build       # Ensure build success
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new lending feature"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - CI pipeline will automatically run
   - Bundle analysis and Lighthouse reports will be generated
   - All quality gates must pass before merging

## 🔐 Security Considerations

- All smart contract interactions are type-safe with Wagmi
- Environment variables are properly scoped (NEXT_PUBLIC_ prefix for client-side)
- Dependencies are regularly audited with `bun audit`
- GitHub's dependency review action checks for vulnerabilities
- No private keys or sensitive data in client-side code

## 📊 Key Dependencies

### Production Dependencies
- **Next.js 15.3.1** - React framework
- **React 19.1.0** - UI library
- **Wagmi 2.15.6** - Ethereum React hooks
- **Viem 2.31.4** - Ethereum client
- **@reown/appkit 1.7.10** - Wallet connection
- **@tanstack/react-query 5.81.2** - Data fetching
- **Tailwind CSS 4.1.10** - Styling

### Development Dependencies
- **TypeScript 5.8.3** - Type checking
- **@biomejs/biome 2.0.4** - Linting & formatting
- **@lhci/cli 0.15.0** - Lighthouse CI
- **@next/bundle-analyzer 15.3.4** - Bundle analysis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the development workflow above
4. Ensure all CI checks pass
5. Submit a pull request with a clear description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Next.js documentation: https://nextjs.org/docs
- Review Wagmi documentation: https://wagmi.sh/
- Consult Tailwind CSS docs: https://tailwindcss.com/docs

---

Built with ❤️ using modern web technologies for the decentralized future.