# Web3 Quick Start Guide

This guide will help you quickly set up and deploy Web3 features for YatriAI.

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install ethers@^6.13.0
```

### Step 2: Configure Environment Variables

Add to `.env.local`:

```bash
# Enable Web3 features
VITE_USE_REAL_BLOCKCHAIN=true
VITE_ETH_NETWORK=sepolia

# Contract addresses (after deployment)
VITE_CONTRACT_HERITAGE_NFT=0x...
VITE_CONTRACT_ESCROW=0x...
VITE_CONTRACT_DONATION=0x...
```

### Step 3: Deploy Contracts (Using Remix IDE)

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create new files:
   - `HeritageNFT.sol` (copy from `contracts/HeritageNFT.sol`)
   - `MarketplaceEscrow.sol` (copy from `contracts/MarketplaceEscrow.sol`)
   - `DonationContract.sol` (copy from `contracts/DonationContract.sol`)

3. Install OpenZeppelin contracts:
   - In Remix, go to "File Explorer"
   - Click "Create new file" → `@openzeppelin/contracts`
   - Or use npm: `npm install @openzeppelin/contracts`

4. Compile contracts:
   - Select Solidity compiler (0.8.19)
   - Click "Compile"

5. Deploy:
   - Connect MetaMask (Sepolia testnet)
   - Select contract
   - Click "Deploy"
   - Copy contract addresses to `.env.local`

### Step 4: Initialize Contracts Service

In your component:

```typescript
import { contractsService } from '@/lib/services/contracts.service';
import { blockchainService } from '@/lib/services/blockchain.service';

// After wallet connects
await blockchainService.connectWallet();
await contractsService.initialize();
```

## 📝 Usage Examples

### Mint Heritage NFT

```typescript
import { contractsService } from '@/lib/services/contracts.service';

const mintNFT = async () => {
  try {
    await contractsService.initialize();
    
    const result = await contractsService.mintHeritageNFT({
      locationId: 'loc-001',
      locationName: 'Victoria Memorial',
      category: 'Monument',
      rarity: 'Legendary',
      points: 100,
      tokenURI: 'ipfs://Qm...' // IPFS metadata URI
    });
    
    console.log('NFT Minted! Token ID:', result.tokenId);
    console.log('Transaction:', result.txHash);
  } catch (error) {
    console.error('Failed to mint:', error);
  }
};
```

### Create Marketplace Escrow

```typescript
const purchaseProduct = async () => {
  try {
    await contractsService.initialize();
    
    const result = await contractsService.createEscrow({
      sellerAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      productId: 'prod-001',
      amount: '0.1' // 0.1 ETH
    });
    
    console.log('Escrow created! ID:', result.escrowId);
  } catch (error) {
    console.error('Failed to create escrow:', error);
  }
};
```

### Make Donation

```typescript
const donateToPandal = async () => {
  try {
    await contractsService.initialize();
    
    const result = await contractsService.donate({
      pandalId: 'pandal-001',
      amount: '0.05', // 0.05 ETH
      message: 'Thank you for preserving our culture!'
    });
    
    console.log('Donation made! ID:', result.donationId);
  } catch (error) {
    console.error('Failed to donate:', error);
  }
};
```

## 🔧 Component Integration

### Update HeritageNFT Component

Replace the simulated minting with:

```typescript
import { contractsService } from '@/lib/services/contracts.service';

const mintNFT = async (locationId: string) => {
  if (!walletConnected) {
    await connectWallet();
    await contractsService.initialize();
  }
  
  setIsMinting(true);
  
  try {
    // Prepare IPFS metadata (use Pinata or similar)
    const metadataURI = await uploadToIPFS({
      name: location.name,
      description: location.description,
      image: location.nftImage,
      attributes: [
        { trait_type: 'Category', value: location.category },
        { trait_type: 'Rarity', value: location.rarity },
        { trait_type: 'Points', value: location.points }
      ]
    });
    
    const result = await contractsService.mintHeritageNFT({
      locationId: location.id,
      locationName: location.name,
      category: location.category,
      rarity: location.rarity,
      points: location.points,
      tokenURI: metadataURI
    });
    
    // Update UI with real token ID
    setLocations(prev => prev.map(loc => 
      loc.id === locationId 
        ? { ...loc, minted: true, tokenId: result.tokenId.toString() }
        : loc
    ));
    
    setMintSuccess(true);
  } catch (error) {
    alert('Failed to mint NFT: ' + error.message);
  } finally {
    setIsMinting(false);
  }
};
```

### Update VerifiedMarketplace Component

Replace simulated purchase with:

```typescript
const handlePurchase = async () => {
  setIsPurchasing(true);
  
  try {
    await contractsService.initialize();
    
    const result = await contractsService.createEscrow({
      sellerAddress: product.artist.walletAddress, // Add to product data
      productId: product.id,
      amount: ethers.formatEther(product.price) // Convert to ETH
    });
    
    // Store escrow ID for tracking
    setPurchaseEscrowId(result.escrowId.toString());
    setPurchaseComplete(true);
  } catch (error) {
    alert('Purchase failed: ' + error.message);
  } finally {
    setIsPurchasing(false);
  }
};
```

### Update PandalDonations Component

Replace simulated donation with:

```typescript
const handleDonate = async () => {
  setIsDonating(true);
  
  try {
    await contractsService.initialize();
    
    // Convert INR to ETH (simplified - use oracle in production)
    const ethAmount = (donationAmount / 250000).toFixed(6); // Approx rate
    
    const result = await contractsService.donate({
      pandalId: selectedPandal.id,
      amount: ethAmount,
      message: `Donation of ₹${donationAmount}`
    });
    
    setDonationComplete(true);
    setDonationTxHash(result.txHash);
  } catch (error) {
    alert('Donation failed: ' + error.message);
  } finally {
    setIsDonating(false);
  }
};
```

## 🧪 Testing Checklist

- [ ] Wallet connects successfully
- [ ] Contracts initialize without errors
- [ ] Can mint Heritage NFT
- [ ] Can create marketplace escrow
- [ ] Can make donation
- [ ] Transactions appear on block explorer
- [ ] Error handling works correctly
- [ ] Gas estimation is reasonable

## 🐛 Troubleshooting

### "Contracts service not initialized"
- Ensure wallet is connected before calling contract functions
- Call `await contractsService.initialize()` after wallet connection

### "Contract not configured"
- Check contract addresses in `.env.local`
- Ensure contracts are deployed to the correct network

### "Transaction failed"
- Check you have enough testnet ETH
- Verify contract addresses are correct
- Check network matches (Sepolia/Holesky)

### "Gas estimation failed"
- Contract might not be deployed
- Check contract address is correct
- Verify you're on the right network

## 📚 Next Steps

1. Deploy contracts to testnet
2. Update components to use contract service
3. Test all features
4. Deploy to mainnet (after security audit)
5. Set up IPFS for NFT metadata
6. Implement price oracle for INR/ETH conversion

## 🔗 Resources

- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [Remix IDE](https://remix.ethereum.org)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [IPFS Pinata](https://www.pinata.cloud/) - For NFT metadata storage

