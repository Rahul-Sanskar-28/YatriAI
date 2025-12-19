# ETHIndia Blockchain Setup for YatriAI

This guide explains how to integrate Ethereum blockchain verification for bookings in the YatriAI platform using ETHIndia-compatible testnets.

## Overview

YatriAI uses blockchain technology to provide:
- **Immutable Booking Verification** - Bookings are recorded on-chain for transparency
- **Guide Certification NFTs** - Verified guides receive NFT certificates
- **Product Authenticity** - Marketplace products can be verified on-chain
- **Payment Escrow** - Smart contract-based payment protection

All features use **testnet** (free) ETH, so no real money is required.

## Supported Networks

| Network | Chain ID | Use Case |
|---------|----------|----------|
| Sepolia | 11155111 | Recommended testnet for development |
| Holesky | 17000 | Alternative Ethereum testnet |
| Mumbai | 80001 | Polygon L2 testnet (faster, cheaper) |

## Quick Start

### 1. Install MetaMask

1. Install MetaMask browser extension: [metamask.io/download](https://metamask.io/download/)
2. Create or import a wallet
3. Keep your seed phrase safe!

### 2. Get Free Testnet ETH

**Sepolia Faucet:**
- [sepoliafaucet.com](https://sepoliafaucet.com)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com)

**Holesky Faucet:**
- [holesky-faucet.pk910.de](https://holesky-faucet.pk910.de)

**Mumbai (Polygon) Faucet:**
- [faucet.polygon.technology](https://faucet.polygon.technology)

### 3. Configure Environment Variables

Create or update `.env.local` in your YatriAI project root:

```bash
# Enable real blockchain (requires MetaMask)
VITE_USE_REAL_BLOCKCHAIN=true
VITE_USE_MOCK_BLOCKCHAIN=false

# Select network: sepolia | holesky | mumbai
VITE_ETH_NETWORK=sepolia

# Optional: Custom RPC URLs (for faster performance)
VITE_SEPOLIA_RPC_URL=https://rpc.sepolia.org
VITE_HOLESKY_RPC_URL=https://ethereum-holesky.publicnode.com
VITE_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com

# Optional: Deploy your own smart contracts
VITE_CONTRACT_BOOKING=0x...your_booking_contract...
VITE_CONTRACT_GUIDE_NFT=0x...your_nft_contract...
VITE_CONTRACT_ESCROW=0x...your_escrow_contract...
```

### 4. Restart the Development Server

```bash
npm run dev
```

## Using Blockchain Features

### Connecting Your Wallet

1. Open the Booking System in the Tourist Dashboard
2. Click "Connect Wallet" in the top-right
3. Approve the MetaMask connection
4. Ensure you're on the correct network (Sepolia)

### Recording a Booking on Blockchain

1. Connect your wallet
2. Find a booking without blockchain verification
3. Click "Record on Sepolia"
4. Confirm the transaction in MetaMask
5. Wait for confirmation (usually 15-30 seconds)

### Viewing Verification

- All blockchain-verified bookings show a green shield badge
- Click the badge to expand verification details
- Click "View on Explorer" to see the transaction on Etherscan

## Component Reference

### WalletConnect

Wallet connection button with full/compact modes.

```tsx
import { WalletConnect } from './components/blockchain';

// Compact mode (dropdown)
<WalletConnect 
  compact 
  onConnect={(state) => console.log('Connected:', state.address)}
/>

// Full mode (card with details)
<WalletConnect />
```

### BlockchainVerification

Display verification status for a transaction.

```tsx
import { BlockchainVerification, VerificationBadge } from './components/blockchain';

// Full verification card
<BlockchainVerification
  txHash="0x123..."
  showDetails={true}
/>

// Compact badge
<VerificationBadge verified={true} txHash="0x123..." />
```

## Blockchain Service API

### Wallet Connection

```typescript
import { blockchainService } from './lib/services';

// Connect wallet
const walletState = await blockchainService.connectWallet();
console.log('Address:', walletState.address);
console.log('Balance:', walletState.balance);

// Check if wallet is connected
const isConnected = blockchainService.getWalletState().isConnected;

// Disconnect
blockchainService.disconnectWallet();

// Switch network
await blockchainService.switchNetwork('sepolia');
```

### Recording Bookings

```typescript
// Record booking on blockchain
const record = await blockchainService.recordBooking({
  id: 'booking-123',
  userId: 'user-456',
  guideId: 'guide-789',
  amount: 5000,
  type: 'guide_booking',
  details: {
    destination: 'Hundru Falls',
    dates: ['2024-03-15', '2024-03-16'],
  },
});

console.log('Transaction:', record.txHash);
console.log('Block:', record.blockNumber);
console.log('Explorer:', record.explorerUrl);
```

### Verification

```typescript
// Verify a booking
const result = await blockchainService.verifyBooking(txHash);

if (result.isVerified) {
  console.log('Verified!', result.message);
  console.log('Block:', result.record.blockNumber);
}

// Verify guide certificate
const certResult = await blockchainService.verifyCertificate(certificateId);
```

### Utility Functions

```typescript
// Get explorer URL
const url = blockchainService.getExplorerUrl(txHash);

// Shorten address for display
const short = blockchainService.shortenAddress('0x1234...5678');
// Returns: "0x1234...5678"

// Convert ETH to Wei
const wei = blockchainService.ethToWei(0.01);

// Get network info
const network = blockchainService.getNetworkInfo();
console.log(network.name, network.chainId);

// Get faucet URL
const faucet = blockchainService.getFaucetUrl();
```

## Smart Contract Development

### Booking Verification Contract

Here's a basic Solidity contract for booking verification:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract YatriAIBooking {
    struct Booking {
        string bookingId;
        address tourist;
        address guide;
        uint256 amount;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(bytes32 => Booking) public bookings;
    
    event BookingRecorded(
        bytes32 indexed hash,
        string bookingId,
        address tourist,
        address guide,
        uint256 amount
    );
    
    function recordBooking(
        string memory bookingId,
        address guide,
        uint256 amount
    ) external payable returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(
            bookingId,
            msg.sender,
            block.timestamp
        ));
        
        bookings[hash] = Booking({
            bookingId: bookingId,
            tourist: msg.sender,
            guide: guide,
            amount: amount,
            timestamp: block.timestamp,
            completed: false
        });
        
        emit BookingRecorded(hash, bookingId, msg.sender, guide, amount);
        return hash;
    }
    
    function verifyBooking(bytes32 hash) external view returns (
        string memory bookingId,
        address tourist,
        bool exists
    ) {
        Booking memory b = bookings[hash];
        return (b.bookingId, b.tourist, b.tourist != address(0));
    }
}
```

### Deploying Contracts

1. Use [Remix IDE](https://remix.ethereum.org) for quick deployment
2. Connect MetaMask with testnet ETH
3. Compile and deploy the contract
4. Copy the contract address to your `.env.local`

## Architecture

```
src/
├── lib/services/
│   ├── config.ts              # Ethereum networks, contracts config
│   └── blockchain.service.ts  # Main blockchain service
├── components/blockchain/
│   ├── index.ts               # Exports
│   ├── WalletConnect.tsx      # Wallet connection UI
│   └── BlockchainVerification.tsx  # Verification display
└── components/dashboard/
    └── components/
        └── BookingSystem.tsx  # Booking with blockchain
```

## Console Logs

When blockchain is properly configured:

```
⛓️ YatriAI Blockchain: Sepolia Testnet - ETHIndia
Network: Sepolia Testnet (Chain ID: 11155111)
Explorer: https://sepolia.etherscan.io
Faucet: https://sepoliafaucet.com
```

When MetaMask is available but not configured:

```
🦊 MetaMask detected! Set VITE_USE_REAL_BLOCKCHAIN=true to enable blockchain features
```

When in simulation mode:

```
⛓️ YatriAI Blockchain: Simulation mode (install MetaMask for real transactions)
```

## Fallback Behavior

The blockchain service has multiple fallback layers:

1. **Real Blockchain** - If wallet connected and configured
2. **Beeceptor Mock** - If `VITE_BEECEPTOR_URL` is set
3. **Local Simulation** - Generates deterministic hashes for demo

This ensures the app works even without MetaMask installed.

## Security Considerations

1. **Never expose private keys** in frontend code
2. **Use testnets** for development (free ETH)
3. **Validate transactions** on the backend before trusting
4. **Gas limits** are set conservatively to prevent stuck transactions
5. **Error handling** gracefully falls back to simulation

## Troubleshooting

### "MetaMask is not installed"
- Install MetaMask from [metamask.io](https://metamask.io/download/)
- Refresh the page after installation

### "Wrong network" 
- Click "Switch to Sepolia" in the wallet dropdown
- Or manually switch in MetaMask

### "Transaction failed"
- Check you have enough testnet ETH
- Try increasing gas limit in MetaMask
- Check the console for error details

### "Transaction pending too long"
- Testnets can be slow during high usage
- Check the explorer to see transaction status
- Try again with higher gas price

## Resources

- **ETHIndia**: [ethindia.co](https://ethindia.co)
- **Sepolia Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com)
- **MetaMask Docs**: [docs.metamask.io](https://docs.metamask.io)
- **Etherscan Sepolia**: [sepolia.etherscan.io](https://sepolia.etherscan.io)
- **Solidity Docs**: [docs.soliditylang.org](https://docs.soliditylang.org)

