# Dodo Payments Integration - Complete Guide

## ✅ Status: **DODO PAYMENTS FULLY INTEGRATED**

YatriAI now uses **Dodo Payments** as the primary payment gateway, with Crypto/Web3 as an alternative option.

---

## 🎯 Why Dodo Payments?

- ✅ **India-focused** - Best UPI support
- ✅ **Marketplace-ready** - Built-in split payments for sellers
- ✅ **Multiple payment methods** - UPI, Cards, Net Banking, Wallets
- ✅ **Sandbox mode** - Free testing, no credit card required
- ✅ **Webhook support** - Real-time payment notifications
- ✅ **Easy integration** - Simple API, well-documented

---

## 🚀 Quick Setup

### Step 1: Create Dodo Payments Account

1. Go to [Dodo Payments Dashboard](https://dashboard.dodopayments.com)
2. Sign up for a free account (no credit card required)
3. Access your sandbox credentials

### Step 2: Get API Keys

In the Dodo dashboard:
1. Navigate to **Settings** → **API Keys**
2. Copy your **Public Key** (starts with `pk_test_` for sandbox)
3. Copy your **Secret Key** (starts with `sk_test_` for sandbox)

### Step 3: Configure Environment

Add to `.env.local`:

```bash
# Enable Dodo Payments
VITE_USE_MOCK_PAYMENT=false

# Dodo Payments API Keys
VITE_DODO_PUBLIC_KEY=pk_test_your_public_key_here
VITE_DODO_SECRET_KEY=sk_test_your_secret_key_here

# Sandbox mode (default: true)
VITE_DODO_SANDBOX=true

# Optional: Custom API URLs
# VITE_DODO_API_URL=https://sandbox.dodopayments.com/api
# VITE_DODO_CHECKOUT_URL=https://sandbox.dodopayments.com/checkout

# Optional: Webhook URL
# VITE_DODO_WEBHOOK_URL=https://your-backend.com/webhooks/dodo

# Optional: Platform fee for marketplace (default: 5%)
# VITE_DODO_PLATFORM_FEE=5

# Optional: Return URLs
# VITE_DODO_SUCCESS_URL=/payment/success
# VITE_DODO_CANCEL_URL=/payment/cancelled
```

### Step 4: Test Payments

Dodo Payments provides test cards and UPI IDs for sandbox testing.

---

## 💳 Payment Methods Supported

### Dodo Payments
- ✅ **UPI** - GPay, PhonePe, Paytm, BHIM UPI
- ✅ **Credit/Debit Cards** - Visa, Mastercard, RuPay, Amex
- ✅ **Net Banking** - All major Indian banks
- ✅ **Wallets** - Paytm, Amazon Pay, Freecharge
- ✅ **Split Payments** - Automatic seller payouts (marketplace)

### Crypto/Web3 (Alternative)
- ✅ **Ethereum** - ETH payments
- ✅ **Stablecoins** - USDC, USDT

---

## 📊 Payment Flow

### Marketplace Purchases
```
User adds to cart
    ↓
Selects payment method (Dodo Payments or Crypto)
    ↓
If Dodo Payments:
    ├─ Create checkout session
    ├─ Redirect to Dodo checkout
    ├─ User completes payment
    └─ Webhook confirms payment
    ↓
If Crypto:
    ├─ Connect wallet
    ├─ Create escrow
    └─ Blockchain confirmation
```

### Donations
```
User selects amount
    ↓
Selects payment method
    ↓
Dodo Payments: Instant payment
Crypto: Blockchain donation
```

### Bookings
```
User books guide
    ↓
Payment via Dodo Payments
    ↓
Payment confirmed
    ↓
Booking activated
```

---

## 🔧 Integration Points

### VerifiedMarketplace
- **Payment**: Dodo Payments (default) or Crypto escrow
- **Features**: Split payments for sellers
- **Status**: ✅ Fully integrated

### PandalDonations
- **Payment**: Dodo Payments or Crypto
- **Features**: Transparent tracking
- **Status**: ✅ Fully integrated

### BookingSystem
- **Payment**: Dodo Payments
- **Features**: Payment verification
- **Status**: ✅ Fully integrated

---

## 💻 Code Usage

### Using Unified Payment Service

```typescript
import { unifiedPaymentService } from '@/lib/services/unified-payment.service';

// Automatic selection (prefers Dodo Payments)
const result = await unifiedPaymentService.processPayment({
  amount: 5000,
  currency: 'INR',
  description: 'Product purchase',
  customerEmail: 'customer@example.com',
  customerName: 'Customer Name',
  items: [{
    id: 'prod-001',
    name: 'Product Name',
    price: 5000,
    quantity: 1,
  }],
  metadata: {
    productId: 'prod-001',
    type: 'marketplace_purchase',
  },
});

// Force Dodo Payments
const result = await unifiedPaymentService.processPayment({
  amount: 5000,
  currency: 'INR',
  gateway: 'dodo', // Explicitly use Dodo Payments
  // ... other params
});
```

### Direct Dodo Payments Usage

```typescript
import { paymentService } from '@/lib/services/payment.service';

// Create payment
const result = await paymentService.createPayment({
  amount: 5000,
  currency: 'INR',
  description: 'Product purchase',
  customerEmail: 'customer@example.com',
  customerName: 'Customer Name',
  items: [/* ... */],
  sellerId: 'seller-123', // For split payments
});

// Verify payment
const status = await paymentService.verifyPayment(result.paymentId);
```

---

## 🎨 UI Components

### PaymentMethodSelector

```tsx
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';

<PaymentMethodSelector
  selectedMethod={selectedMethod} // 'gateway' | 'crypto'
  selectedGateway={selectedGateway} // 'dodo' | 'crypto'
  onMethodChange={setSelectedMethod}
  onGatewayChange={setSelectedGateway}
  amount={5000}
  currency="INR"
/>
```

---

## 🔐 Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Verify payments server-side** (webhook verification)
3. **Use webhooks** for payment status updates
4. **Store keys in environment variables** (never commit)
5. **Use sandbox mode** during development
6. **Enable HTTPS** in production

---

## 📝 Webhook Setup (Recommended)

### Backend Webhook Handler

```javascript
// POST /webhooks/dodo
app.post('/webhooks/dodo', (req, res) => {
  const signature = req.headers['x-dodo-signature'];
  const payload = req.body;
  
  // Verify webhook signature
  if (verifySignature(signature, payload)) {
    // Handle payment events
    switch (payload.event) {
      case 'payment.completed':
        // Update order status
        break;
      case 'payment.failed':
        // Handle failure
        break;
    }
  }
  
  res.status(200).send('OK');
});
```

---

## 🧪 Testing

### Test Cards (Sandbox)
Dodo Payments provides test cards in the dashboard.

### Test UPI IDs
Use test UPI IDs provided in Dodo dashboard.

### Test Flow
1. Create payment session
2. Use test card/UPI
3. Complete payment
4. Verify webhook received
5. Check payment status

---

## 📊 Features

### ✅ Split Payments (Marketplace)
- Automatic seller payouts
- Platform fee deduction
- Configurable fee percentage

### ✅ Payment Verification
- Real-time status checking
- Webhook notifications
- Receipt generation

### ✅ Refund Processing
- Full or partial refunds
- Automatic processing
- Status tracking

---

## 🆘 Troubleshooting

### "Dodo Payments not configured"
- Check `VITE_DODO_PUBLIC_KEY` is set
- Verify `VITE_USE_MOCK_PAYMENT=false`
- Check keys are correct format

### "Payment failed"
- Check test card numbers
- Verify sandbox mode is enabled
- Check browser console for errors

### "Webhook not received"
- Verify webhook URL is accessible
- Check signature verification
- Review Dodo dashboard logs

---

## 📚 Resources

- **Dodo Payments Dashboard**: https://dashboard.dodopayments.com
- **Dodo Payments Docs**: https://docs.dodopayments.com
- **API Reference**: Check Dodo dashboard for API docs
- **Support**: Contact Dodo Payments support

---

## 🎉 Summary

**Dodo Payments is now the primary payment gateway!**

✅ Fully integrated
✅ Marketplace split payments
✅ Multiple payment methods
✅ Webhook support
✅ Sandbox testing
✅ Production ready

**To activate:** Add API keys to `.env.local` and set `VITE_USE_MOCK_PAYMENT=false`

---

**Status: READY FOR PRODUCTION** 🚀

