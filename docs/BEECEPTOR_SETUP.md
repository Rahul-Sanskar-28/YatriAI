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
    "Sundarbans",
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

### Transport API (Real-Time Updates)

These endpoints provide real-time transport availability data for Kolkata. Each request returns dynamically updated arrival times to simulate live tracking.

#### Tram Routes

**Endpoint:** `GET /api/transport/trams`

**Response:**
```json
{
  "success": true,
  "routes": [
    {
      "id": "tram-36",
      "routeNumber": "36",
      "name": "Esplanade - Gariahat",
      "from": "Esplanade",
      "to": "Gariahat",
      "status": "running",
      "nextArrival": 3,
      "frequency": "15 min",
      "color": "#FFB800"
    },
    {
      "id": "tram-5",
      "routeNumber": "5",
      "name": "Howrah Station - Esplanade",
      "from": "Howrah Station",
      "to": "Esplanade",
      "status": "running",
      "nextArrival": 8,
      "frequency": "20 min",
      "color": "#E23D28"
    },
    {
      "id": "tram-25",
      "routeNumber": "25",
      "name": "Shyambazar - Tollygunge",
      "from": "Shyambazar",
      "to": "Tollygunge",
      "status": "delayed",
      "nextArrival": 15,
      "frequency": "12 min",
      "color": "#C45C26"
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

**Note:** For real-time simulation, configure Beeceptor to return different `nextArrival` values on each request (e.g., decrement by 1-2 minutes each time).

---

#### Metro Lines

**Endpoint:** `GET /api/transport/metro`

**Response:**
```json
{
  "success": true,
  "lines": [
    {
      "id": "metro-blue",
      "name": "Blue Line (North-South)",
      "from": "Dakshineswar",
      "to": "Kavi Subhash",
      "status": "running",
      "nextTrain": 2,
      "frequency": "5 min",
      "color": "#1E3A5F"
    },
    {
      "id": "metro-green",
      "name": "Green Line (East-West)",
      "from": "Salt Lake Sector V",
      "to": "Howrah Maidan",
      "status": "running",
      "nextTrain": 4,
      "frequency": "8 min",
      "color": "#2D5A27"
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

---

#### Local Trains

**Endpoint:** `GET /api/transport/trains`

**Response:**
```json
{
  "success": true,
  "trains": [
    {
      "id": "sealdah-main",
      "name": "Sealdah Main Line",
      "from": "Sealdah",
      "to": "Ranaghat",
      "status": "running",
      "nextTrain": 5,
      "frequency": "10 min",
      "color": "#C45C26"
    },
    {
      "id": "howrah-main",
      "name": "Howrah Main Line",
      "from": "Howrah",
      "to": "Bardhaman",
      "status": "running",
      "nextTrain": 8,
      "frequency": "15 min",
      "color": "#C45C26"
    },
    {
      "id": "circular",
      "name": "Kolkata Circular Railway",
      "from": "Majerhat",
      "to": "Dum Dum",
      "status": "delayed",
      "nextTrain": 12,
      "frequency": "20 min",
      "color": "#C45C26"
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

---

#### Bus Routes

**Endpoint:** `GET /api/transport/buses`

**Response:**
```json
{
  "success": true,
  "routes": [
    {
      "id": "bus-s12",
      "routeNumber": "S12",
      "name": "Airport - Howrah",
      "from": "Airport",
      "to": "Howrah",
      "status": "running",
      "nextBus": 7,
      "frequency": "20 min",
      "color": "#2D5A27"
    },
    {
      "id": "bus-230",
      "routeNumber": "230",
      "name": "Garia - Esplanade",
      "from": "Garia",
      "to": "Esplanade",
      "status": "running",
      "nextBus": 3,
      "frequency": "10 min",
      "color": "#2D5A27"
    },
    {
      "id": "bus-heritage",
      "routeNumber": "H1",
      "name": "Heritage Special",
      "from": "Victoria Memorial",
      "to": "Howrah Bridge",
      "status": "running",
      "nextBus": 15,
      "frequency": "30 min",
      "color": "#2D5A27"
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

**💡 Pro Tip:** To simulate real-time updates in Beeceptor:

1. **Using JavaScript in Beeceptor Response:**
   In Beeceptor dashboard, select "JavaScript" as response type and use this code:

   ```javascript
   // For /api/transport/trams endpoint
   const baseArrival = Math.floor(Math.random() * 10) + 2; // Random between 2-12 minutes
   const status = Math.random() > 0.8 ? 'delayed' : 'running';
   
   return {
     success: true,
     routes: [
       {
         id: 'tram-36',
         routeNumber: '36',
         name: 'Esplanade - Gariahat',
         from: 'Esplanade',
         to: 'Gariahat',
         status: status,
         nextArrival: baseArrival,
         frequency: '15 min',
         color: '#FFB800'
       },
       {
         id: 'tram-5',
         routeNumber: '5',
         name: 'Howrah Station - Esplanade',
         from: 'Howrah Station',
         to: 'Esplanade',
         status: 'running',
         nextArrival: baseArrival + 5,
         frequency: '20 min',
         color: '#E23D28'
       },
       {
         id: 'tram-25',
         routeNumber: '25',
         name: 'Shyambazar - Tollygunge',
         from: 'Shyambazar',
         to: 'Tollygunge',
         status: Math.random() > 0.85 ? 'delayed' : 'running',
         nextArrival: baseArrival + 10,
         frequency: '12 min',
         color: '#C45C26'
       }
     ],
     lastUpdated: new Date().toISOString()
   };
   ```

2. **For Metro Lines** (`/api/transport/metro`):
   ```javascript
   return {
     success: true,
     lines: [
       {
         id: 'metro-blue',
         name: 'Blue Line (North-South)',
         from: 'Dakshineswar',
         to: 'Kavi Subhash',
         status: 'running',
         nextTrain: Math.floor(Math.random() * 3) + 1,
         frequency: '5 min',
         color: '#1E3A5F'
       },
       {
         id: 'metro-green',
         name: 'Green Line (East-West)',
         from: 'Salt Lake Sector V',
         to: 'Howrah Maidan',
         status: 'running',
         nextTrain: Math.floor(Math.random() * 5) + 2,
         frequency: '8 min',
         color: '#2D5A27'
       }
     ],
     lastUpdated: new Date().toISOString()
   };
   ```

3. **For Local Trains** (`/api/transport/trains`):
   ```javascript
   return {
     success: true,
     trains: [
       {
         id: 'sealdah-main',
         name: 'Sealdah Main Line',
         from: 'Sealdah',
         to: 'Ranaghat',
         status: 'running',
         nextTrain: Math.floor(Math.random() * 6) + 3,
         frequency: '10 min',
         color: '#C45C26'
       },
       {
         id: 'howrah-main',
         name: 'Howrah Main Line',
         from: 'Howrah',
         to: 'Bardhaman',
         status: 'running',
         nextTrain: Math.floor(Math.random() * 8) + 5,
         frequency: '15 min',
         color: '#C45C26'
       },
       {
         id: 'circular',
         name: 'Kolkata Circular Railway',
         from: 'Majerhat',
         to: 'Dum Dum',
         status: Math.random() > 0.85 ? 'delayed' : 'running',
         nextTrain: Math.floor(Math.random() * 10) + 8,
         frequency: '20 min',
         color: '#C45C26'
       }
     ],
     lastUpdated: new Date().toISOString()
   };
   ```

4. **For Bus Routes** (`/api/transport/buses`):
   ```javascript
   return {
     success: true,
     routes: [
       {
         id: 'bus-s12',
         routeNumber: 'S12',
         name: 'Airport - Howrah',
         from: 'Airport',
         to: 'Howrah',
         status: 'running',
         nextBus: Math.floor(Math.random() * 8) + 4,
         frequency: '20 min',
         color: '#2D5A27'
       },
       {
         id: 'bus-230',
         routeNumber: '230',
         name: 'Garia - Esplanade',
         from: 'Garia',
         to: 'Esplanade',
         status: 'running',
         nextBus: Math.floor(Math.random() * 4) + 1,
         frequency: '10 min',
         color: '#2D5A27'
       },
       {
         id: 'bus-heritage',
         routeNumber: 'H1',
         name: 'Heritage Special',
         from: 'Victoria Memorial',
         to: 'Howrah Bridge',
         status: 'running',
         nextBus: Math.floor(Math.random() * 12) + 10,
         frequency: '30 min',
         color: '#2D5A27'
       }
     ],
     lastUpdated: new Date().toISOString()
   };
   ```

5. **Use Beeceptor's "Response Delay"** feature to simulate network latency (100-500ms recommended)

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BEECEPTOR_URL` | Beeceptor base URL | `https://yatriai.free.beeceptor.com` |
| `VITE_USE_MOCK_WEATHER` | Use weather mock | `true` |
| `VITE_USE_MOCK_AI` | Use AI mock | `true` |
| `VITE_USE_MOCK_PAYMENT` | Use payment mock | `true` |
| `VITE_USE_MOCK_BLOCKCHAIN` | Use blockchain mock | `true` |
| `VITE_USE_MOCK_TRANSLATE` | Use translation mock | `true` |
| `VITE_USE_MOCK_VOICE` | Use voice mock | `true` |
| `VITE_USE_MOCK_TRANSPORT` | Use transport mock (fallback) | `true` |
| `VITE_TRANSPORT_API_URL` | Transport API URL (optional override) | `${VITE_BEECEPTOR_URL}/api/transport` |

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

