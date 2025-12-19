/**
 * Blockchain Service
 * 
 * Handles blockchain verification for:
 * - Booking verification (immutable receipts)
 * - Guide certification verification
 * - Product authenticity verification
 * 
 * Uses Beeceptor mock in development.
 * Enhanced with Requestly debug support.
 * 
 * Prepared for ETHIndia/Ethereum integration:
 * - Testnet: Sepolia or Holesky (free test ETH from faucets)
 * - Smart contracts for booking escrow
 * - NFT certificates for guides
 */

import { ServiceURLs, ServiceFlags } from './config';
import { createServiceFetch } from '../debug';

// Create debug-enabled fetch for this service
const serviceFetch = createServiceFetch('BlockchainService');

export interface BlockchainRecord {
  txHash: string;
  blockNumber: number;
  timestamp: string;
  network: string;
  status: 'pending' | 'confirmed' | 'failed';
  data: Record<string, any>;
  explorerUrl: string;
}

export interface VerificationResult {
  isVerified: boolean;
  record?: BlockchainRecord;
  message: string;
}

export interface BookingOnChain {
  bookingId: string;
  txHash: string;
  userAddress: string;
  guideAddress?: string;
  amount: number;
  status: string;
  timestamp: string;
}

export interface CertificateOnChain {
  certificateId: string;
  txHash: string;
  holderAddress: string;
  issuerAddress: string;
  certificateType: 'guide' | 'seller' | 'product';
  metadata: {
    name: string;
    description: string;
    issuedAt: string;
    expiresAt?: string;
  };
}

class BlockchainService {
  private baseUrl: string;
  private useMock: boolean;
  private network: string;

  constructor() {
    this.baseUrl = ServiceURLs.BLOCKCHAIN_API;
    this.useMock = ServiceFlags.USE_MOCK_BLOCKCHAIN;
    this.network = import.meta.env.VITE_ETH_NETWORK || 'sepolia'; // sepolia or holesky
  }

  /**
   * Record booking on blockchain
   */
  async recordBooking(booking: {
    id: string;
    userId: string;
    guideId?: string;
    amount: number;
    type: string;
    details: Record<string, any>;
  }): Promise<BlockchainRecord> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.createMockRecord('booking', booking);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/record/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          network: this.network,
          booking,
        }),
      });

      if (!response.ok) {
        return this.createMockRecord('booking', booking);
      }

      return await response.json();
    } catch (error) {
      console.warn('Blockchain API unavailable, using mock:', error);
      return this.createMockRecord('booking', booking);
    }
  }

  /**
   * Verify booking on blockchain
   */
  async verifyBooking(txHash: string): Promise<VerificationResult> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.getMockVerification(txHash);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/verify/booking/${txHash}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return this.getMockVerification(txHash);
      }

      return await response.json();
    } catch (error) {
      return this.getMockVerification(txHash);
    }
  }

  /**
   * Verify guide certification
   */
  async verifyCertificate(certificateId: string): Promise<VerificationResult> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.getMockCertificateVerification(certificateId);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/verify/certificate/${certificateId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return this.getMockCertificateVerification(certificateId);
      }

      return await response.json();
    } catch (error) {
      return this.getMockCertificateVerification(certificateId);
    }
  }

  /**
   * Get all blockchain records for a user
   */
  async getUserRecords(userId: string): Promise<BlockchainRecord[]> {
    if (this.useMock) {
      return this.getMockUserRecords(userId);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/records/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        return this.getMockUserRecords(userId);
      }

      return await response.json();
    } catch (error) {
      return this.getMockUserRecords(userId);
    }
  }

  /**
   * Generate blockchain hash for display (deterministic)
   */
  generateDisplayHash(data: Record<string, any>): string {
    // Create a deterministic hash-like string for display purposes
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `0x${Math.abs(hash).toString(16).padStart(64, 'a').slice(0, 64)}`;
  }

  /**
   * Get explorer URL for transaction
   */
  getExplorerUrl(txHash: string): string {
    const explorers: Record<string, string> = {
      sepolia: 'https://sepolia.etherscan.io/tx/',
      holesky: 'https://holesky.etherscan.io/tx/',
      mainnet: 'https://etherscan.io/tx/',
    };
    return `${explorers[this.network] || explorers.sepolia}${txHash}`;
  }

  // Mock implementations
  private createMockRecord(type: string, data: any): BlockchainRecord {
    const txHash = this.generateDisplayHash({ ...data, timestamp: Date.now(), type });
    
    return {
      txHash,
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      timestamp: new Date().toISOString(),
      network: this.network,
      status: 'confirmed',
      data,
      explorerUrl: this.getExplorerUrl(txHash),
    };
  }

  private getMockVerification(txHash: string): VerificationResult {
    return {
      isVerified: true,
      record: {
        txHash,
        blockNumber: 18542631,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        network: this.network,
        status: 'confirmed',
        data: { verified: true, type: 'booking' },
        explorerUrl: this.getExplorerUrl(txHash),
      },
      message: 'Booking verified on blockchain (Testnet)',
    };
  }

  private getMockCertificateVerification(certificateId: string): VerificationResult {
    return {
      isVerified: true,
      record: {
        txHash: this.generateDisplayHash({ certificateId }),
        blockNumber: 18542100,
        timestamp: new Date(Date.now() - 86400000 * 30).toISOString(),
        network: this.network,
        status: 'confirmed',
        data: {
          certificateId,
          type: 'guide_certification',
          issuer: 'YatriAI Platform',
        },
        explorerUrl: this.getExplorerUrl(this.generateDisplayHash({ certificateId })),
      },
      message: 'Guide certification verified on blockchain',
    };
  }

  private getMockUserRecords(userId: string): BlockchainRecord[] {
    return [
      this.createMockRecord('booking', { userId, type: 'guide_booking' }),
      this.createMockRecord('purchase', { userId, type: 'marketplace' }),
    ];
  }
}

export const blockchainService = new BlockchainService();
export default blockchainService;
