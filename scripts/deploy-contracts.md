# Contract Deployment Guide

## Quick Deploy with Remix IDE

### Step 1: Open Remix IDE
Go to [https://remix.ethereum.org](https://remix.ethereum.org)

### Step 2: Install OpenZeppelin Contracts
1. In Remix, go to "File Explorer"
2. Right-click and select "New Folder" → name it `@openzeppelin`
3. Or use npm in Remix terminal:
   ```
   npm install @openzeppelin/contracts
   ```

### Step 3: Copy Contracts
Copy each contract from `contracts/` directory to Remix:
- `HeritageNFT.sol`
- `MarketplaceEscrow.sol`
- `DonationContract.sol`
- `GuideCertificationNFT.sol`
- `BookingEscrow.sol`
- `ProductAuthenticityNFT.sol`

### Step 4: Compile
1. Select Solidity compiler version 0.8.19
2. Click "Compile [ContractName].sol"
3. Fix any import errors

### Step 5: Deploy
1. Go to "Deploy & Run Transactions"
2. Connect MetaMask (ensure you're on Sepolia testnet)
3. Select the contract
4. For contracts requiring constructor parameters:
   - **MarketplaceEscrow**: `_platformWallet` (your wallet address)
   - **DonationContract**: `_platformWallet` (your wallet address)
   - **BookingEscrow**: `_platformWallet` (your wallet address)
5. Click "Deploy"
6. Copy the contract address

### Step 6: Update Environment Variables
Add to `.env.local`:
```bash
VITE_CONTRACT_HERITAGE_NFT=0x...
VITE_CONTRACT_ESCROW=0x...
VITE_CONTRACT_DONATION=0x...
VITE_CONTRACT_GUIDE_NFT=0x...
VITE_CONTRACT_BOOKING=0x...
VITE_CONTRACT_PRODUCT_NFT=0x...
```

## Deploy with Hardhat (Advanced)

### Setup Hardhat
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

### Create `hardhat.config.js`
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
    }
  }
};
```

### Create `scripts/deploy.js`
```javascript
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy HeritageNFT
  const HeritageNFT = await hre.ethers.getContractFactory("HeritageNFT");
  const heritageNFT = await HeritageNFT.deploy();
  await heritageNFT.waitForDeployment();
  console.log("HeritageNFT deployed to:", await heritageNFT.getAddress());

  // Deploy MarketplaceEscrow
  const MarketplaceEscrow = await hre.ethers.getContractFactory("MarketplaceEscrow");
  const marketplaceEscrow = await MarketplaceEscrow.deploy(deployer.address);
  await marketplaceEscrow.waitForDeployment();
  console.log("MarketplaceEscrow deployed to:", await marketplaceEscrow.getAddress());

  // Deploy DonationContract
  const DonationContract = await hre.ethers.getContractFactory("DonationContract");
  const donationContract = await DonationContract.deploy(deployer.address);
  await donationContract.waitForDeployment();
  console.log("DonationContract deployed to:", await donationContract.getAddress());

  // Deploy GuideCertificationNFT
  const GuideCertificationNFT = await hre.ethers.getContractFactory("GuideCertificationNFT");
  const guideCertificationNFT = await GuideCertificationNFT.deploy();
  await guideCertificationNFT.waitForDeployment();
  console.log("GuideCertificationNFT deployed to:", await guideCertificationNFT.getAddress());

  // Deploy BookingEscrow
  const BookingEscrow = await hre.ethers.getContractFactory("BookingEscrow");
  const bookingEscrow = await BookingEscrow.deploy(deployer.address);
  await bookingEscrow.waitForDeployment();
  console.log("BookingEscrow deployed to:", await bookingEscrow.getAddress());

  // Deploy ProductAuthenticityNFT
  const ProductAuthenticityNFT = await hre.ethers.getContractFactory("ProductAuthenticityNFT");
  const productAuthenticityNFT = await ProductAuthenticityNFT.deploy();
  await productAuthenticityNFT.waitForDeployment();
  console.log("ProductAuthenticityNFT deployed to:", await productAuthenticityNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Deploy
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Post-Deployment Steps

1. **Register Pandals** (for DonationContract):
   ```javascript
   await donationContract.registerPandal(
     "pandal-001",
     "Bagbazar Sarbojanin",
     "0x..." // Pandal wallet address
   );
   ```

2. **Verify Sellers** (for ProductAuthenticityNFT):
   ```javascript
   await productAuthenticityNFT.verifySeller(
     "0x...", // Seller address
     true
   );
   ```

3. **Add Admins** (for GuideCertificationNFT):
   ```javascript
   await guideCertificationNFT.addAdmin("0x..."); // Admin address
   ```

## Testing

After deployment, test each contract:
1. Mint a test Heritage NFT
2. Create a test escrow
3. Make a test donation
4. Verify transactions on Sepolia Etherscan

## Security Notes

- Never commit private keys to git
- Use environment variables for sensitive data
- Test thoroughly on testnet before mainnet
- Consider security audits before mainnet deployment


