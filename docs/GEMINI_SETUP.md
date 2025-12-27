# Gemini API Setup Guide

Complete guide for setting up and using Google Gemini AI in YatriAI.

## Overview

YatriAI uses Google's Gemini AI (via `@google/generative-ai` SDK) to power intelligent travel planning and RAG (Retrieval-Augmented Generation) features. The backend acts as a secure proxy to avoid exposing API keys to the frontend.

## Quick Setup

### 1. Get API Key

1. Visit [Google AI Studio](https://ai.google.dev/tutorials/setup)
2. Create a new API key
3. Copy the key

### 2. Configure Backend

Add to `backend/.env`:
```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Configure Frontend

Add to root `.env`:
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
VITE_GEMINI_PROXY=http://localhost:3001/gemini
```

### 4. Install SDK

```bash
cd backend
npm install @google/generative-ai
```

## Architecture

```
Frontend (Browser)
  ↓
  ├─ Calls: callGemini() function
  │
  └─ Option 1: Via Backend Proxy (PREFERRED)
     ├─ Endpoint: POST http://localhost:3001/gemini
     ├─ Advantages: API key hidden, safer, rate-limited server-side
     └─ Falls back to direct API if proxy fails
  
  └─ Option 2: Direct API (Fallback)
     ├─ Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
     ├─ Exposes API key (not ideal but functional)
     └─ Only used if proxy is unavailable
```

## Available Models

| Model | Cost | Speed | Quality | Status |
|-------|------|-------|---------|--------|
| `gemini-2.0-flash-exp` | Free | ⚡ Fast | ⭐⭐⭐⭐ Better | Experimental (default) |
| `gemini-1.5-flash` | Free | ⚡ Fast | ⭐⭐⭐ Good | Stable fallback |
| `gemini-pro` | Paid | 🐌 Slower | ⭐⭐⭐⭐ Better | Stable |

**Default:** `gemini-2.0-flash-exp` (automatically falls back to `gemini-1.5-flash` if unavailable)

## Verification

### Step 1: Start Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

### Step 2: Check Console Logs

**Backend console should show:**
```
✅ Gemini AI SDK initialized
🔍 Gemini proxy called with model: gemini-2.0-flash-exp (using SDK)
✅ Gemini SDK response received, length: XXX chars
```

**Browser console should show:**
```
🔍 Calling Gemini via proxy: http://localhost:3001/gemini
✅ Gemini proxy response received, length: XXX chars
```

### Step 3: Test Query

In RAG Agent or AI Chat, try:
- "Plan a 3-day heritage tour of Kolkata"
- "Tell me about Durga Puja"
- "What's the best time to visit?"

## Troubleshooting

### Issue 1: "API key not configured on server"
**Solution:** Ensure `GEMINI_API_KEY` is in `backend/.env` and restart backend.

### Issue 2: "Proxy returned status 401"
**Possible causes:**
- Invalid API key (expired or revoked)
- Gemini API not enabled in Google Cloud Console
- Billing not set up

**Solution:** Verify the API key is valid and the Gemini API is enabled in Google Cloud Console.

### Issue 3: "Model not found"
**Solution:** The system automatically falls back to `gemini-1.5-flash`. Check backend logs for fallback message.

### Issue 4: Both proxy and direct call fail
**Debug steps:**
1. Check `GEMINI_API_KEY` in `backend/.env`
2. Check `VITE_GEMINI_API_KEY` in `/.env`
3. Verify backend is running on port 3001
4. Check Google Cloud Console for API quota and billing
5. Restart both servers

## Security Notes

1. **Backend API Key** (`backend/.env`):
   - Never commit to git
   - Only backend accesses the actual Google API
   - Key is protected from frontend exposure

2. **Frontend API Key** (`/.env`):
   - Also protected via `.gitignore`
   - Only used as fallback if proxy fails
   - Prefer backend proxy for better security

3. **Production Deployment:**
   - Use environment variables instead of .env files
   - Consider rotating API keys regularly
   - Monitor API usage for unusual activity
   - Implement rate limiting on backend

## Related Files

- `backend/src/index.ts` - Backend Gemini proxy using SDK
- `src/lib/services/rag.service.ts` - RAG service module
- `src/components/dashboard/components/TravelRAGAgent.tsx` - RAG Agent component
- `src/components/dashboard/components/AIChat.tsx` - AI chat interface

## Testing Commands

```bash
# Test backend is running
curl http://localhost:3001/api/health

# Test Gemini proxy endpoint
curl -X POST http://localhost:3001/gemini \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Tell me about Kolkata", "model": "gemini-2.0-flash-exp"}'
```

---

**Last Updated:** December 2024  
**Status:** ✅ Configured with SDK integration

