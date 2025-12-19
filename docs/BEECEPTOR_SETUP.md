# Beeceptor Integration Guide for YatriAI

This guide explains how to set up Beeceptor for API mocking during development.

## 🐝 What is Beeceptor?

Beeceptor is a free API mocking tool that allows you to create mock endpoints without writing any backend code. It's perfect for:
- Frontend development without backend dependency
- Testing error scenarios
- API prototyping
- Webhook testing

**No credit card required!**

## 🚀 Quick Start

### 1. Create a Beeceptor Mock

1. Go to [beeceptor.com](https://beeceptor.com)
2. Enter a subdomain: `yatriai` (or any unique name)
3. Click "Create Endpoint"
4. You'll get a URL like: `https://yatriai.free.beeceptor.com`

### 2. Configure YatriAI

Create a `.env.local` file in the project root:

```env
VITE_BEECEPTOR_URL=https://yatriai.free.beeceptor.com
```

### 3. Create Mock Endpoints

In Beeceptor dashboard, add these mocking rules:

---

## 📍 Mock Endpoints to Create

### Weather API

**Endpoint:** `GET /api/weather/:location`

**Response:**
```json
{
  "location": "Ranchi, Jharkhand",
  "temperature": 28,
  "feelsLike": 30,
  "humidity": 65,
  "conditions": "Partly Cloudy",
  "icon": "⛅",
  "forecast": [
    {
      "date": "Today",
      "high": 32,
      "low": 24,
      "conditions": "Partly Cloudy",
      "icon": "⛅",
      "precipitation": 10
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

---

### AI Chat

**Endpoint:** `POST /api/ai/chat`

**Response:**
```json
{
  "message": "I'd be happy to help you explore Jharkhand! 🌟 You can ask me about destinations, guides, local cuisine, or plan your entire trip.",
  "suggestions": [
    "Plan my trip",
    "Find a guide",
    "Explore destinations"
  ],
  "relatedDestinations": [
    "Hundru Falls",
    "Betla National Park",
    "Ranchi"
  ]
}
```

---

### AI Itinerary Generation

**Endpoint:** `POST /api/ai/generate-itinerary`

**Response:**
```json
{
  "id": "itin_123",
  "title": "AI-Curated 3-Day Jharkhand Discovery",
  "duration": 3,
  "estimatedCost": 15000,
  "destinations": [
    {
      "id": "1",
      "name": "Ranchi",
      "category": "city",
      "duration": "1 day"
    }
  ],
  "dailyPlan": [
    {
      "day": 1,
      "destination": "Ranchi",
      "activities": ["City tour", "Local markets", "Evening cultural show"],
      "accommodation": "Comfortable hotel",
      "meals": ["Traditional breakfast", "Local lunch", "Dinner"],
      "transport": "Private vehicle",
      "estimatedCost": 5000
    }
  ],
  "highlights": [
    "AI-optimized route",
    "Local guide recommendations"
  ],
  "tips": [
    "Carry cash for remote areas"
  ]
}
```

---

### Payment Creation (Dodo Payments Prep)

**Endpoint:** `POST /api/payments/create`

**Response:**
```json
{
  "success": true,
  "paymentId": "pay_beeceptor_123",
  "status": "pending",
  "redirectUrl": "https://yatriai.free.beeceptor.com/checkout/pay_123",
  "message": "Payment intent created"
}
```

---

### Payment Verification

**Endpoint:** `GET /api/payments/verify/:paymentId`

**Response:**
```json
{
  "id": "pay_beeceptor_123",
  "amount": 5000,
  "currency": "INR",
  "status": "completed",
  "description": "Guide booking - Ranchi tour",
  "metadata": {
    "platform": "YatriAI",
    "type": "booking"
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:05:00Z"
}
```

---

### Blockchain Record (ETHIndia Prep)

**Endpoint:** `POST /api/blockchain/record/booking`

**Response:**
```json
{
  "txHash": "0xabc123def456789...",
  "blockNumber": 18542631,
  "timestamp": "2024-01-15T10:00:00Z",
  "network": "sepolia",
  "status": "confirmed",
  "data": {
    "type": "booking",
    "verified": true
  },
  "explorerUrl": "https://sepolia.etherscan.io/tx/0xabc123..."
}
```

---

### Blockchain Verification

**Endpoint:** `GET /api/blockchain/verify/booking/:txHash`

**Response:**
```json
{
  "isVerified": true,
  "record": {
    "txHash": "0xabc123def456789...",
    "blockNumber": 18542631,
    "network": "sepolia",
    "status": "confirmed"
  },
  "message": "Booking verified on blockchain (Testnet)"
}
```

---

### Voice TTS (ElevenLabs Prep)

**Endpoint:** `POST /api/voice/tts`

**Response:**
```json
{
  "audioUrl": "https://yatriai.free.beeceptor.com/audio/sample.mp3",
  "duration": 5.2,
  "charactersUsed": 150
}
```

---

### Translation

**Endpoint:** `POST /api/translate/translate`

**Response:**
```json
{
  "originalText": "Welcome to Jharkhand",
  "translatedText": "झारखंड में आपका स्वागत है",
  "sourceLanguage": "en",
  "targetLanguage": "hi"
}
```

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BEECEPTOR_URL` | Beeceptor base URL | (empty - uses local mocks) |
| `VITE_USE_MOCK_WEATHER` | Use weather mock | `true` |
| `VITE_USE_MOCK_AI` | Use AI mock | `true` |
| `VITE_USE_MOCK_PAYMENT` | Use payment mock | `true` |
| `VITE_USE_MOCK_BLOCKCHAIN` | Use blockchain mock | `true` |
| `VITE_USE_MOCK_TRANSLATE` | Use translation mock | `true` |
| `VITE_USE_MOCK_VOICE` | Use voice mock | `true` |

---

## 🔄 Switching to Real APIs

When ready to use real services:

### ElevenLabs (Voice)
```env
VITE_USE_MOCK_VOICE=false
VITE_ELEVENLABS_API_KEY=your_api_key
```

### Dodo Payments
```env
VITE_USE_MOCK_PAYMENT=false
VITE_DODO_PUBLIC_KEY=your_public_key
VITE_PAYMENT_API_URL=https://sandbox.dodopayments.com/api
```

### ETHIndia (Ethereum)
```env
VITE_USE_MOCK_BLOCKCHAIN=false
VITE_ETH_NETWORK=sepolia
VITE_BLOCKCHAIN_API_URL=your_api_url
```

---

## 🧪 Testing Error Scenarios

In Beeceptor, you can create rules that return:
- **500 errors**: Test error handling
- **Slow responses**: Add delay to test loading states
- **Empty data**: Test empty state UI
- **Invalid responses**: Test validation

Example error response:
```json
{
  "success": false,
  "error": "Service temporarily unavailable",
  "code": "SERVICE_ERROR"
}
```

---

## 📊 Request Logging

Beeceptor automatically logs all requests. Use this to:
- Debug request payloads
- Verify authentication headers
- Check request frequency
- Test webhook deliveries

---

## 🎯 Integration with Other Sponsors

This Beeceptor setup is designed to work with:

| Sponsor | Integration Point |
|---------|------------------|
| **ElevenLabs** | `voiceService` - Replace mock with real TTS |
| **Dodo Payments** | `paymentService` - Replace mock with sandbox |
| **ETHIndia** | `blockchainService` - Connect to testnets |
| **n8n** | `VITE_WEBHOOK_URL` - Self-hosted workflows |

The service architecture allows easy switching between mock and real APIs!

