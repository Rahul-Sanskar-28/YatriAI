# Complete Web3 Implementation Guide for YatriAI

This guide will help you convert YatriAI into a fully Web3-based platform with all features running on blockchain.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Smart Contracts Required](#smart-contracts-required)
4. [Setup & Installation](#setup--installation)
5. [Contract Deployment](#contract-deployment)
6. [Frontend Integration](#frontend-integration)
7. [Testing](#testing)
8. [Production Considerations](#production-considerations)

## 🎯 Overview

To make YatriAI fully Web3-based, we need to implement:

1. **Heritage NFT Minting** - Real ERC-721 NFTs for heritage locations
2. **Marketplace Escrow** - Smart contract escrow for product purchases
3. **Pandal Donations** - Direct blockchain donations with transparency
4. **Guide Certification NFTs** - ERC-721 certificates for verified guides
5. **Booking Escrow** - Payment escrow for guide bookings
6. **Product Authenticity NFTs** - ERC-721 certificates for artisan products

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ WalletConnect │  │ NFT Minting  │  │ Escrow UI    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│           Contract Interaction Service                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ NFT Service  │  │ Escrow Svc   │  │ Donation Svc  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│              Ethereum Blockchain (Sepolia)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ HeritageNFT  │  │ EscrowContract│  │ DonationContract│ │
│  │ ERC-721      │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 📦 Smart Contracts Required

### 1. HeritageNFT.sol
- **Purpose**: Mint NFTs for heritage locations visited
- **Standard**: ERC-721
- **Features**: 
  - Mint with metadata (location, timestamp, rarity)
  - Transferable NFTs
  - Royalty support

### 2. MarketplaceEscrow.sol
- **Purpose**: Escrow payments for marketplace purchases
- **Features**:
  - Lock funds until delivery confirmation
  - Automatic release after time period
  - Dispute resolution
  - Refund capability

### 3. DonationContract.sol
- **Purpose**: Transparent donations to Pandal committees
- **Features**:
  - Direct donations to committee wallets
  - Transparent tracking
  - Donor recognition (optional)
  - Withdrawal by committee

### 4. GuideCertificationNFT.sol
- **Purpose**: NFT certificates for verified guides
- **Standard**: ERC-721
- **Features**:
  - Mint by admin only
  - Verification status
  - Expiration dates

### 5. BookingEscrow.sol
- **Purpose**: Escrow for guide bookings
- **Features**:
  - Lock booking payment
  - Release after completion
  - Cancellation refunds

### 6. ProductAuthenticityNFT.sol
- **Purpose**: NFT certificates for artisan products
- **Standard**: ERC-721
- **Features**:
  - Mint by verified sellers
  - Link to product metadata
  - Transfer with product

## 🚀 Setup & Installation

### Step 1: Install Dependencies

```bash
npm install ethers@^6.0.0
npm install --save-dev @typechain/ethers-v6 @typechain/hardhat typechain hardhat @nomicfoundation/hardhat-toolbox
```

### Step 2: Install Hardhat (for contract development)

```bash
npm install --save-dev hardhat
npx hardhat init
```

### Step 3: Configure Hardhat

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111
    },
    holesky: {
      url: process.env.HOLESKY_RPC_URL || "https://ethereum-holesky.publicnode.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 17000
    }
  }
};
```

## 📝 Contract Deployment

### Step 1: Create Contracts Directory

```
contracts/
├── HeritageNFT.sol
├── MarketplaceEscrow.sol
├── DonationContract.sol
├── GuideCertificationNFT.sol
├── BookingEscrow.sol
└── ProductAuthenticityNFT.sol
```

### Step 2: Deploy Scripts

Create `scripts/deploy.js`:

```javascript
const hre = require("hardhat");

async function main() {
  // Deploy HeritageNFT
  const HeritageNFT = await hre.ethers.getContractFactory("HeritageNFT");
  const heritageNFT = await HeritageNFT.deploy();
  await heritageNFT.waitForDeployment();
  console.log("HeritageNFT deployed to:", await heritageNFT.getAddress());

  // Deploy other contracts...
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Step 3: Deploy to Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 💻 Frontend Integration

### Step 1: Create Contract Service

Create `src/lib/services/contracts.service.ts` that wraps ethers.js interactions.

### Step 2: Update Components

- **HeritageNFT.tsx**: Use `contractsService.mintHeritageNFT()`
- **VerifiedMarketplace.tsx**: Use `contractsService.createEscrow()`
- **PandalDonations.tsx**: Use `contractsService.donate()`
- **BookingSystem.tsx**: Use `contractsService.createBookingEscrow()`

### Step 3: Add Contract ABIs

Store compiled contract ABIs in `src/lib/contracts/abis/`

## 🧪 Testing

### Unit Tests

```bash
npx hardhat test
```

### Integration Tests

Test contract interactions from frontend:
1. Connect wallet
2. Mint test NFT
3. Create escrow
4. Complete transaction

## 🏭 Production Considerations

1. **Gas Optimization**: Use gas-efficient patterns
2. **Security Audits**: Audit all contracts before mainnet
3. **Upgradeability**: Consider proxy patterns for critical contracts
4. **Multi-sig**: Use multi-sig wallets for admin functions
5. **Rate Limiting**: Implement rate limits to prevent abuse
6. **Event Indexing**: Use The Graph or similar for efficient querying
7. **IPFS**: Store NFT metadata on IPFS
8. **Error Handling**: Comprehensive error handling and user feedback

## 📚 Next Steps

1. Review the smart contracts in `contracts/` directory
2. Deploy to testnet
3. Update frontend to use contract service
4. Test thoroughly
5. Deploy to mainnet (after audits)

## 🔗 Resources

- [Ethers.js Documentation](https://docs.ethers.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)



