# Dodo Payments Setup for YatriAI

This guide explains how to integrate Dodo Payments for marketplace checkout and transaction processing in the YatriAI platform.

## Overview

YatriAI uses Dodo Payments for:
- **Marketplace Checkout** - Purchase tribal handicrafts and products
- **Booking Payments** - Pay for guide bookings and tour packages
- **Transaction Verification** - Verify payment status
- **Refunds** - Process customer refunds
- **Split Payments** - Automatic seller payouts (marketplace)

**Key Features:**
- Sandbox mode (free, no credit card required)
- UPI, Cards, Net Banking, Wallets support
- India-focused payment methods
- Webhook notifications
- Easy refund processing

## Quick Start

### 1. Create a Dodo Payments Account

1. Go to [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
2. Sign up for a free account (no credit card required)
3. Access your sandbox credentials

### 2. Get Your API Keys

In the Dodo dashboard:
1. Navigate to **Settings** → **API Keys**
2. Copy your **Public Key** (starts with `pk_test_` for sandbox)
3. Copy your **Secret Key** (starts with `sk_test_` for sandbox)

### 3. Configure Environment Variables

Create or update `.env.local` in your YatriAI project root:

```bash
# Enable Dodo Payments (disable mock)
VITE_USE_MOCK_PAYMENT=false

# Dodo Payments API Keys (Sandbox)
VITE_DODO_PUBLIC_KEY=pk_test_your_public_key_here
VITE_DODO_SECRET_KEY=sk_test_your_secret_key_here

# Optional: Sandbox mode (default: true)
VITE_DODO_SANDBOX=true

# Optional: Custom API URL (defaults to sandbox)
# VITE_DODO_API_URL=https://sandbox.dodopayments.com/api
# VITE_DODO_CHECKOUT_URL=https://sandbox.dodopayments.com/checkout

# Optional: Webhook URL for payment notifications
# VITE_DODO_WEBHOOK_URL=https://your-backend.com/webhooks/dodo

# Optional: Platform fee for marketplace (default: 5%)
# VITE_DODO_PLATFORM_FEE=5

# Optional: Return URLs
# VITE_DODO_SUCCESS_URL=/payment/success
# VITE_DODO_CANCEL_URL=/payment/cancelled

# Optional: Enable split payments for sellers
# VITE_DODO_SPLIT_PAYMENTS=true
```

### 4. Restart the Development Server

```bash
npm run dev
```

## Testing Payments

### Test Cards (Sandbox)

Use these test card numbers in sandbox mode:

| Card Number | Result |
|-------------|--------|
| 4111 1111 1111 1111 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 3220 | 3D Secure Required |

**Expiry:** Any future date  
**CVV:** Any 3 digits

### Test UPI

In sandbox, use any UPI ID like `test@upi` for successful payment.

## Usage

### Marketplace Checkout

The Marketplace component includes a full checkout flow:

1. Browse products and add to cart
2. Click the cart icon to review items
3. Click "Checkout" to start the checkout process
4. Fill in customer information
5. Select payment method
6. Complete payment (redirects to Dodo checkout)

### Creating a Payment Programmatically

```typescript
import { paymentService } from './lib/services';

// Create a payment
const result = await paymentService.createPayment({
  amount: 2500,
  currency: 'INR',
  description: 'Dokra Art Elephant Figurine',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  customerPhone: '+919876543210',
  items: [
    { id: 'prod-1', name: 'Dokra Art Elephant', price: 2500, quantity: 1 }
  ],
  metadata: {
    orderId: 'order-123',
    type: 'marketplace'
  }
});

if (result.success && result.checkoutUrl) {
  // Redirect to Dodo checkout
  window.location.href = result.checkoutUrl;
}
```

### Verifying Payment Status

```typescript
// Verify a payment
const payment = await paymentService.verifyPayment(paymentId);

console.log('Status:', payment.status); // 'completed', 'pending', 'failed'
console.log('Amount:', payment.amount);
console.log('Receipt:', payment.receiptUrl);
```

### Processing Refunds

```typescript
// Full refund
const refund = await paymentService.refundPayment(paymentId);

// Partial refund
const partialRefund = await paymentService.refundPayment(paymentId, 500, 'Item returned');
```

### Getting Transaction Details

```typescript
const transaction = await paymentService.getTransactionDetails(orderId);

console.log('Items:', transaction.items);
console.log('Payment Method:', transaction.paymentMethod);
console.log('Receipt:', transaction.receiptUrl);
```

## Components

### CheckoutModal

Full checkout flow component with cart, customer info, and payment selection.

```tsx
import { CheckoutModal } from './components/payment';

<CheckoutModal
  isOpen={isCheckoutOpen}
  onClose={() => setIsCheckoutOpen(false)}
  items={cartItems}
  onUpdateQuantity={(itemId, quantity) => updateCart(itemId, quantity)}
  onRemoveItem={(itemId) => removeFromCart(itemId)}
  onCheckoutComplete={(result) => console.log('Order placed:', result)}
/>
```

## Configuration Options

### DodoPaymentsConfig

Available in `src/lib/services/config.ts`:

```typescript
export const DodoPaymentsConfig = {
  // API Endpoints
  API_URL: 'https://sandbox.dodopayments.com/api',
  CHECKOUT_URL: 'https://sandbox.dodopayments.com/checkout',
  
  // Sandbox mode
  IS_SANDBOX: true,
  
  // Supported currencies
  SUPPORTED_CURRENCIES: ['INR', 'USD', 'EUR', 'GBP'],
  
  // Default currency
  DEFAULT_CURRENCY: 'INR',
  
  // Platform fee (for marketplace)
  PLATFORM_FEE_PERCENT: 5,
  
  // Enabled payment methods
  PAYMENT_METHODS: {
    UPI: true,
    CARDS: true,
    NET_BANKING: true,
    WALLETS: true,
  },
};
```

## Webhook Integration

For production, set up webhooks to receive payment notifications:

### 1. Backend Endpoint

Create an endpoint to receive webhook events:

```typescript
// Express.js example
app.post('/webhooks/dodo', express.raw({ type: 'application/json' }), (req, res) => {
  const event = req.body;
  
  switch (event.event) {
    case 'payment.completed':
      // Handle successful payment
      console.log('Payment completed:', event.paymentId);
      break;
    case 'payment.failed':
      // Handle failed payment
      console.log('Payment failed:', event.paymentId);
      break;
    case 'refund.completed':
      // Handle refund
      console.log('Refund completed:', event.refundId);
      break;
  }
  
  res.status(200).send('OK');
});
```

### 2. Configure Webhook URL

Set `VITE_DODO_WEBHOOK_URL` in your environment:

```bash
VITE_DODO_WEBHOOK_URL=https://your-backend.com/webhooks/dodo
```

## Split Payments (Marketplace)

For marketplace transactions, enable split payments to automatically pay sellers:

### 1. Enable Split Payments

```bash
VITE_DODO_SPLIT_PAYMENTS=true
VITE_DODO_PLATFORM_FEE=5  # 5% platform fee
```

### 2. Include Seller ID

When creating payments, include the seller's Dodo account ID:

```typescript
await paymentService.createPayment({
  amount: 2500,
  // ...
  sellerId: 'seller_account_id',  // Seller's Dodo account
});
```

The payment will be split:
- 95% → Seller's account
- 5% → YatriAI platform (configurable)

## Fallback Behavior

The payment service has multiple fallback layers:

1. **Dodo Payments** - If configured and `VITE_USE_MOCK_PAYMENT=false`
2. **Beeceptor Mock** - If `VITE_BEECEPTOR_URL` is set
3. **Local Mock** - Built-in mock for development

This ensures the app works even without Dodo configured.

## Console Logs

When Dodo Payments is configured:

```
💳 YatriAI Payments: Dodo Payments (Sandbox)
Dodo Payments config: { isSandbox: true, ... }
```

When in mock mode:

```
💳 YatriAI Payments: Mock mode (add VITE_DODO_PUBLIC_KEY for real payments)
```

## Production Checklist

Before going live:

- [ ] Switch to production API keys (`pk_live_`, `sk_live_`)
- [ ] Set `VITE_DODO_SANDBOX=false`
- [ ] Configure production webhook URL
- [ ] Set up SSL for webhook endpoint
- [ ] Test end-to-end payment flow
- [ ] Enable split payments if using marketplace
- [ ] Set appropriate platform fee

## Troubleshooting

### "Payment creation failed"
- Check API keys are correct
- Verify sandbox mode matches keys (`pk_test_` for sandbox)
- Check browser console for detailed errors

### "Redirect not working"
- Ensure `VITE_DODO_SUCCESS_URL` and `VITE_DODO_CANCEL_URL` are valid routes
- Check popup blockers aren't blocking the redirect

### "Webhook not receiving events"
- Verify webhook URL is publicly accessible
- Check endpoint returns 200 status
- Review Dodo dashboard for failed webhook deliveries

### "Split payment not working"
- Ensure seller has a verified Dodo account
- Check `VITE_DODO_SPLIT_PAYMENTS=true`
- Verify seller account ID is correct

## Resources

- **Dodo Payments Dashboard**: [dashboard.dodopayments.com](https://dashboard.dodopayments.com)
- **API Documentation**: [docs.dodopayments.com](https://docs.dodopayments.com)
- **Test Cards**: [docs.dodopayments.com/testing](https://docs.dodopayments.com/testing)
- **Webhooks Guide**: [docs.dodopayments.com/webhooks](https://docs.dodopayments.com/webhooks)

