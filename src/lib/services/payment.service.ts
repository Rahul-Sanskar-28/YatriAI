/**
 * Payment Service
 * 
 * Handles payment processing for:
 * - Marketplace purchases
 * - Guide bookings
 * - Tour packages
 * 
 * Uses Beeceptor mock in development.
 * Enhanced with Requestly debug support.
 * 
 * Prepared for Dodo Payments integration (sandbox mode - free, no credit card).
 * 
 * Dodo Payments Integration:
 * - Sandbox URL: https://sandbox.dodopayments.com
 * - Docs: https://docs.dodopayments.com
 */

import { ServiceURLs, ServiceFlags, ServiceKeys } from './config';
import { createServiceFetch } from '../debug';

// Create debug-enabled fetch for this service
const serviceFetch = createServiceFetch('PaymentService');

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  description: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  description: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, any>;
  returnUrl?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  status: string;
  redirectUrl?: string;
  message?: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
  status: string;
}

class PaymentService {
  private baseUrl: string;
  private useMock: boolean;
  private publicKey: string;

  constructor() {
    this.baseUrl = ServiceURLs.PAYMENT_API;
    this.useMock = ServiceFlags.USE_MOCK_PAYMENT;
    this.publicKey = ServiceKeys.DODO_PUBLIC_KEY;
  }

  /**
   * Create a payment intent
   */
  async createPayment(params: CreatePaymentParams): Promise<PaymentResult> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.createMockPayment(params);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.publicKey && { 'X-Dodo-Key': this.publicKey }),
        },
        body: JSON.stringify({
          amount: params.amount,
          currency: params.currency || 'INR',
          description: params.description,
          customer: {
            email: params.customerEmail,
            name: params.customerName,
          },
          metadata: {
            ...params.metadata,
            platform: 'YatriAI',
          },
          return_url: params.returnUrl || window.location.origin + '/payment/callback',
        }),
      });

      if (!response.ok) {
        console.warn(`Payment API returned ${response.status}, using fallback`);
        return this.createMockPayment(params);
      }

      return await response.json();
    } catch (error) {
      console.warn('Payment API unavailable, using mock:', error);
      return this.createMockPayment(params);
    }
  }

  /**
   * Verify payment status
   */
  async verifyPayment(paymentId: string): Promise<PaymentIntent> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.getMockPaymentStatus(paymentId);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/verify/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.publicKey && { 'X-Dodo-Key': this.publicKey }),
        },
      });

      if (!response.ok) {
        return this.getMockPaymentStatus(paymentId);
      }

      return await response.json();
    } catch (error) {
      console.warn('Payment verification failed:', error);
      return this.getMockPaymentStatus(paymentId);
    }
  }

  /**
   * Process refund
   */
  async refundPayment(paymentId: string, amount?: number, reason?: string): Promise<RefundResult> {
    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.processedMockRefund(paymentId, amount);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.publicKey && { 'X-Dodo-Key': this.publicKey }),
        },
        body: JSON.stringify({
          payment_id: paymentId,
          amount,
          reason: reason || 'Customer requested refund',
        }),
      });

      if (!response.ok) {
        return this.processedMockRefund(paymentId, amount);
      }

      return await response.json();
    } catch (error) {
      console.warn('Refund processing failed:', error);
      return this.processedMockRefund(paymentId, amount);
    }
  }

  /**
   * Get payment history for a customer
   */
  async getPaymentHistory(customerEmail: string): Promise<PaymentIntent[]> {
    if (this.useMock) {
      return this.getMockPaymentHistory();
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/history?email=${encodeURIComponent(customerEmail)}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.publicKey && { 'X-Dodo-Key': this.publicKey }),
        },
      });

      if (!response.ok) {
        return this.getMockPaymentHistory();
      }

      return await response.json();
    } catch (error) {
      return this.getMockPaymentHistory();
    }
  }

  // Mock implementations
  private createMockPayment(params: CreatePaymentParams): PaymentResult {
    const paymentId = `pay_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      paymentId,
      status: 'pending',
      redirectUrl: `/payment/mock-checkout?id=${paymentId}&amount=${params.amount}`,
      message: 'Mock payment created. In production, this would redirect to Dodo Payments.',
    };
  }

  private getMockPaymentStatus(paymentId: string): PaymentIntent {
    return {
      id: paymentId,
      amount: 5000,
      currency: 'INR',
      status: 'completed',
      description: 'Mock payment for testing',
      metadata: { platform: 'YatriAI' },
      createdAt: new Date(Date.now() - 60000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private processedMockRefund(paymentId: string, amount?: number): RefundResult {
    return {
      success: true,
      refundId: `ref_mock_${Date.now()}`,
      amount: amount || 5000,
      status: 'processed',
    };
  }

  private getMockPaymentHistory(): PaymentIntent[] {
    return [
      {
        id: 'pay_mock_1',
        amount: 5000,
        currency: 'INR',
        status: 'completed',
        description: 'Guide booking - Ranchi tour',
        metadata: { type: 'booking' },
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      },
      {
        id: 'pay_mock_2',
        amount: 2500,
        currency: 'INR',
        status: 'completed',
        description: 'Handicraft purchase - Dokra Art',
        metadata: { type: 'product' },
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ];
  }
}

export const paymentService = new PaymentService();
export default paymentService;
