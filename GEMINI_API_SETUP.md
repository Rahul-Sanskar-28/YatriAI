# Gemini API Integration Setup Guide

## Overview

YatriAI uses Google's Gemini AI to power intelligent travel planning and RAG (Retrieval-Augmented Generation) features. This document explains the setup and connection flow.

## Current Setup Status ✅

The Gemini API has been successfully configured with the following enhancements:

### 1. **Backend Configuration** 
- Added `GEMINI_API_KEY` to `backend/.env` 
- Enhanced the `/gemini` proxy endpoint with improved error logging
- The backend acts as a secure proxy to avoid exposing the API key to the frontend

### 2. **Frontend Configuration**
- Environment variables are correctly set in `/.env`:
  - `VITE_GEMINI_API_KEY`: Direct API key (for fallback)
  - `VITE_GEMINI_MODEL`: Model specification (`gemini-2.5-flash`)
  - `VITE_GEMINI_PROXY`: Backend proxy endpoint (`http://localhost:3001/gemini`)

### 3. **Enhanced Error Logging**
Both frontend and backend now include detailed console logging to help debug issues:

**Backend logs:**
- ✅ `🔍 Gemini proxy called with model: {model}`
- ✅ `📡 Calling Gemini API at {endpoint}`
- ✅ `✅ Gemini response received, length: {chars}`
- ❌ `❌ Gemini proxy error: {status} {details}`

**Frontend logs:**
- ✅ `🔍 Calling Gemini via proxy: {proxyEndpoint}`
- ✅ `✅ Gemini proxy response received, length: {chars}`
- ❌ `❌ Proxy returned status {status}`
- ❌ `❌ Gemini direct call failed: {error}`

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
     ├─ Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
     ├─ Exposes API key (not ideal but functional)
     └─ Only used if proxy is unavailable
```

## Files Modified

### 1. `backend/.env` (NEW CONFIGURATION)
```dotenv
GEMINI_API_KEY="AIzaSyDna6BPFG1gEBaf_O_IiUCYofRAIaaJG9Y"
```

### 2. `backend/src/index.ts` (ENHANCED ERROR LOGGING)
- Added logging at proxy endpoint: `/gemini`
- Error messages now include response status and details
- Better debugging information in console

### 3. `src/components/dashboard/components/TravelRAGAgent.tsx` (ENHANCED ERROR LOGGING)
- Added detailed console logging for proxy calls
- Added error details logging for failed requests
- Better visibility into which method (proxy vs direct) is being used

## How to Verify the Setup

### Step 1: Start the Backend Server
```bash
cd backend
npm run dev
```
You should see:
```
Server running on port 3001
```

### Step 2: Start the Frontend
```bash
npm run dev
```

### Step 3: Check Console Logs
Open the browser Developer Tools (F12) and check both:

**Console Tab** (for frontend logs):
```
🔍 Calling Gemini via proxy: http://localhost:3001/gemini
✅ Gemini proxy response received, length: 456 chars
```

**Network Tab**:
- Request: `POST http://localhost:3001/gemini`
- Response: Should contain the Gemini response with the travel recommendation

### Step 4: Test a Query
In the TravelRAGAgent component, try asking a travel-related question:
- "Tell me about Kolkata's heritage"
- "Plan a budget trip to West Bengal"
- "What's the best time to visit Durga Puja?"

## Troubleshooting

### Issue 1: "API key not configured on server"
**Solution:** Ensure `GEMINI_API_KEY` is in `backend/.env`:
```bash
GEMINI_API_KEY="AIzaSyDna6BPFG1gEBaf_O_IiUCYofRAIaaJG9Y"
```

### Issue 2: "Proxy returned status 401"
**Possible causes:**
- Invalid API key (expired or revoked)
- Gemini API not enabled in Google Cloud Console
- Billing not set up

**Solution:** Verify the API key is valid and the Gemini API is enabled in Google Cloud Console.

### Issue 3: "Proxy returned status 400"
**Possible causes:**
- Malformed request body
- Missing required prompt field
- Unsupported model name

**Solution:** Check browser console for detailed error message.

### Issue 4: Direct API call fails but proxy works
**Expected behavior:** This is fine! The proxy is working as intended.

### Issue 5: Both proxy and direct call fail
**Debug steps:**
1. Check `GEMINI_API_KEY` in `backend/.env`
2. Check `VITE_GEMINI_API_KEY` in `/.env`
3. Check `VITE_GEMINI_PROXY` points to correct backend URL
4. Verify backend is running on port 3001
5. Check Google Cloud Console for API quota and billing

## API Key Management

**Important Security Notes:**

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

- [TravelRAGAgent.tsx](src/components/dashboard/components/TravelRAGAgent.tsx) - Main component using Gemini
- [AIChat.tsx](src/components/dashboard/components/AIChat.tsx) - AI chat interface
- [AddaBot.tsx](src/components/dashboard/components/AddaBot.tsx) - Adda (gossip) bot using Gemini
- [rag.service.ts](src/lib/services/rag.service.ts) - RAG service module
- [backend/src/index.ts](backend/src/index.ts) - Backend Gemini proxy

## Testing Commands

```bash
# Test backend is running
curl http://localhost:3001/api/health

# Test Gemini proxy endpoint
curl -X POST http://localhost:3001/gemini \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Tell me about Kolkata"}'

# Check environment variables in backend
echo $GEMINI_API_KEY
```

## Next Steps

1. ✅ Verify backend is running with `GEMINI_API_KEY` set
2. ✅ Start frontend and test a query
3. ✅ Check browser console for logs
4. ✅ If issues persist, review the troubleshooting section above

---

**Last Updated:** December 25, 2024
**Status:** ✅ Configured and Ready for Testing
