# Testing Guide

Complete guide for testing YatriAI features, ML models, and integrations.

## Quick Start

### 1. Start Servers

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev
```

### 2. Open Browser Console

1. Open: `http://localhost:5173`
2. Press **F12** → **Console** tab
3. Go to **Network** tab (to monitor API calls)

## Testing ML Models

### Enable Debug Mode

Add to `.env`:
```env
VITE_DEBUG_ML=true
```

Restart app. You'll see detailed logs for every query.

### Test in AI Chat

1. Navigate to **Dashboard** → **AI Chat** or **RAG Agent**
2. Try these test queries:

| Query | Expected Intent | What to Check |
|-------|----------------|---------------|
| `"I want to book a guide"` | `book_guide` | Console shows intent classification |
| `"Plan a 3-day itinerary"` | `plan_itinerary` | Console shows intent + context retrieval |
| `"Show me heritage sites"` | `find_heritage` | Console shows semantic search results |
| `"How much will it cost?"` | `budget_question` | Console shows budget estimation |
| `"Tell me about Durga Puja"` | `general_chat` | Console shows Gemini response |

### Expected Console Logs

```
🔍 [ML DEBUG] Intent: plan_itinerary (90%)
🔍 [ML DEBUG] Entities: {locations: ["Kolkata"], durations: ["3-day"]}
🔍 [ML DEBUG] Context results: 5
🔍 [ML DEBUG] Used Gemini: true
🔍 [ML DEBUG] Response time: 450ms
```

## Testing Gemini API

### Verify Setup

1. **Backend console should show:**
   ```
   ✅ Gemini AI SDK initialized
   🔍 Gemini proxy called with model: gemini-2.0-flash-exp (using SDK)
   ✅ Gemini SDK response received, length: XXX chars
   ```

2. **Browser console should show:**
   ```
   🔍 Calling Gemini via proxy: http://localhost:3001/gemini
   ✅ Gemini proxy response received, length: XXX chars
   ```

### Test Queries

Try in RAG Agent or AI Chat:
- "Plan a 3-day heritage tour of Kolkata"
- "Tell me about Durga Puja"
- "What's the best time to visit?"

### Troubleshooting

- **"AI synthesis unavailable"**: Check backend is running and API key is configured
- **Empty responses**: Check Network tab for API errors
- **Slow responses**: Check backend logs for API call duration

## Testing Intent Classification

### Browser Console Test

```javascript
// Import services (if available in browser)
const testQueries = [
  "I want to book a guide",
  "Plan a 3-day itinerary",
  "Show me heritage sites",
  "How much will it cost?",
  "Tell me about Durga Puja"
];

// Test each query in AI Chat and check console logs
```

### Expected Results

- Intent correctly identified (90%+ confidence)
- Entities extracted (locations, durations, budgets)
- Appropriate context retrieved

## Testing Semantic Search

### Test Queries

Try queries that should match destinations/itineraries:
- "historical monuments" → Should match heritage sites
- "3 day trip" → Should match 3-day itineraries
- "local guide" → Should match guide profiles

### Check Results

- Relevant results returned (score > 0.5)
- Results sorted by relevance
- Top 5-8 results shown

## Testing Hybrid AI Service

The hybrid service combines:
1. Intent classification
2. Entity extraction
3. Semantic search
4. Gemini AI generation

### Test Flow

1. User query → Intent classified
2. Entities extracted → Context retrieved
3. If complex → Gemini generates response
4. Response displayed with context sources

### Performance Metrics

Check console for:
- **Response time**: Should be < 2 seconds
- **Context results**: Should be 3-8 relevant items
- **Gemini usage**: Only for complex queries

## Testing Translation

1. Click "Auto Translate" button
2. Select language (Hindi, Bengali, etc.)
3. Page should translate automatically
4. Check URL for language parameter

## Testing Booking System

1. Navigate to a destination
2. Click "Book Guide" or "Book Tour"
3. Fill booking form
4. Submit and check backend logs

## Network Tab Monitoring

### Check These Requests

- `POST /gemini` - Gemini API calls
- `GET /api/destinations` - Destination data
- `GET /api/guides` - Guide listings
- `POST /api/bookings` - Booking submissions

### Expected Status Codes

- `200` - Success
- `401` - Authentication error (check API keys)
- `404` - Endpoint not found
- `500` - Server error (check backend logs)

## Performance Testing

### Metrics to Monitor

- **Page load time**: < 2 seconds
- **API response time**: < 1 second
- **ML inference time**: < 500ms
- **Gemini response time**: < 2 seconds

### Tools

- Browser DevTools Performance tab
- Network tab timing
- Console performance logs

## Common Issues

### Issue: No console logs
**Solution:** Enable debug mode in `.env`:
```env
VITE_DEBUG_ML=true
```

### Issue: API calls failing
**Solution:** 
1. Check backend is running
2. Check API keys in `.env` files
3. Check Network tab for error details

### Issue: Slow responses
**Solution:**
1. Check backend logs for bottlenecks
2. Check Gemini API quota
3. Check network connection

---

**Quick Test Checklist:**
- ✅ Servers running
- ✅ Browser console open
- ✅ Debug mode enabled
- ✅ Test query sent
- ✅ Console logs visible
- ✅ Response received


