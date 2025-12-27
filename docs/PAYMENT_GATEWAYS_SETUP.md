# Payment Gateways Setup Guide

YatriAI now supports multiple payment gateways for flexible payment options:

## Supported Payment Gateways

### 1. **Razorpay** (Recommended for India)
- **Best for**: INR payments, UPI, Indian cards
- **Features**: UPI, Credit/Debit Cards, Net Banking, Wallets, EMI
- **Setup**: https://dashboard.razorpay.com

### 2. **Stripe** (International)
- **Best for**: USD, EUR, GBP, International cards
- **Features**: Cards, Apple Pay, Google Pay, Bank Transfer
- **Setup**: https://dashboard.stripe.com

### 3. **Dodo Payments** (Marketplace)
- **Best for**: Split payments, marketplace transactions
- **Features**: UPI, Cards, Net Banking, Wallets
- **Setup**: https://dashboard.dodopayments.com

### 4. **Crypto/Web3** (Blockchain)
- **Best for**: Decentralized payments
- **Features**: Ethereum, USDC, USDT
- **Setup**: Connect MetaMask wallet

---

## Quick Setup

### Step 1: Choose Your Gateway(s)

**For India (INR payments):**
- Use **Razorpay** (best UPI support)

**For International:**
- Use **Stripe** (best card support)

**For Marketplace:**
- Use **Dodo Payments** (split payments)

**For Web3:**
- Connect MetaMask (crypto payments)

### Step 2: Get API Keys

#### Razorpay
1. Sign up at https://razorpay.com
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret
4. Use test keys for development (starts with `rzp_test_`)

#### Stripe
1. Sign up at https://stripe.com
2. Go to Developers → API Keys
3. Copy Publishable Key and Secret Key
4. Use test keys for development (starts with `pk_test_`)

#### Dodo Payments
1. Sign up at https://dodopayments.com
2. Go to Settings → API Keys
3. Copy Public Key and Secret Key
4. Use sandbox keys for development

### Step 3: Configure Environment Variables

Add to `.env.local`:

```bash
# Payment Gateway Selection
VITE_DEFAULT_PAYMENT_GATEWAY=razorpay  # razorpay | stripe | dodo

# Razorpay (India)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
VITE_RAZORPAY_TEST_MODE=true

# Stripe (International)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
VITE_STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
VITE_STRIPE_TEST_MODE=true

# Dodo Payments (Marketplace)
VITE_DODO_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
VITE_DODO_SECRET_KEY=sk_test_xxxxxxxxxxxxx
VITE_DODO_SANDBOX=true

# Disable mock payments (use real gateways)
VITE_USE_MOCK_PAYMENT=false
```

### Step 4: Test Payments

#### Razorpay Test Cards
- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

#### Stripe Test Cards
- **Success**: `4242 4242 4242 4242`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## How It Works

### Automatic Gateway Selection

The system automatically selects the best gateway based on:

1. **Currency**: INR → Razorpay, USD/EUR → Stripe
2. **Configuration**: Uses first available configured gateway
3. **User Preference**: User can manually select gateway

### Payment Flow

```
User selects payment method
    ↓
System selects gateway (or user chooses)
    ↓
Create payment session/order
    ↓
Redirect to gateway checkout
    ↓
User completes payment
    ↓
Webhook/redirect confirms payment
    ↓
Update order status
```

---

## Integration Points

### Marketplace Purchases
- **Location**: `VerifiedMarketplace.tsx`
- **Supports**: All gateways + Crypto
- **Features**: Escrow for crypto, instant for gateways

### Pandal Donations
- **Location**: `PandalDonations.tsx`
- **Supports**: All gateways + Crypto
- **Features**: Transparent tracking

### Guide Bookings
- **Location**: `BookingSystem.tsx`
- **Supports**: All gateways + Crypto escrow
- **Features**: Payment verification

---

## Backend Integration (Recommended)

For production, payment processing should be done server-side:

### Razorpay Backend Flow
```javascript
// 1. Create order on backend
POST /api/payments/razorpay/create-order
{
  amount: 5000,
  currency: 'INR',
  receipt: 'order_123'
}

// 2. Frontend opens Razorpay checkout with order_id
// 3. Backend verifies payment signature
POST /api/payments/razorpay/verify
{
  order_id: 'order_123',
  payment_id: 'pay_xxx',
  signature: 'sig_xxx'
}
```

### Stripe Backend Flow
```javascript
// 1. Create payment intent on backend
POST /api/payments/stripe/create-intent
{
  amount: 5000,
  currency: 'USD'
}

// 2. Frontend confirms payment with client_secret
// 3. Backend verifies payment status
```

---

## Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Verify payments server-side** (signature verification)
3. **Use webhooks** for payment status updates
4. **Store keys in environment variables** (never commit)
5. **Use test mode** during development
6. **Enable HTTPS** in production

---

## Troubleshooting

### "Gateway not configured"
- Check environment variables are set
- Verify keys are correct format
- Ensure `VITE_USE_MOCK_PAYMENT=false`

### "Payment failed"
- Check test card numbers
- Verify gateway is in test mode
- Check browser console for errors

### "Redirect not working"
- Check return URLs are configured
- Verify CORS settings
- Check gateway dashboard for webhook logs

---

## Support

- **Razorpay Docs**: https://razorpay.com/docs/
- **Stripe Docs**: https://stripe.com/docs
- **Dodo Docs**: https://docs.dodopayments.com

---

## Next Steps

1. ✅ Add gateway API keys to `.env.local`
2. ✅ Test with test cards
3. ✅ Set up webhooks (optional)
4. ✅ Deploy to production
5. ✅ Switch to live keys

**Your platform now supports real payment gateways!** 🎉

