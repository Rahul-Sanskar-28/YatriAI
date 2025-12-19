# Requestly Integration for YatriAI

This guide explains how to use Requestly with YatriAI for advanced API debugging, request modification, and response mocking.

## What is Requestly?

[Requestly](https://requestly.io) is a powerful browser extension and desktop app that allows you to:

- 🔍 **Intercept & Modify** HTTP requests and responses
- 🎭 **Mock API responses** without backend changes
- ⏱️ **Simulate delays** and network conditions
- 🔄 **Redirect requests** to different endpoints
- 📊 **Record sessions** for debugging

## Installation

### 1. Install Requestly Browser Extension

- [Chrome Extension](https://chrome.google.com/webstore/detail/requestly-modify-headers/mdnleldcmiljblolnjhpnblkcekpdkpa)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/requestly/)
- [Edge Extension](https://microsoftedge.microsoft.com/addons/detail/requestly-redirect-url/ehghoapnlpepjmfbgaomdiilchcjemak)

### 2. Enable Debug Mode in YatriAI

#### Option A: Environment Variable (Recommended)

Create or update `.env.local` in the project root:

```env
# Enable debug mode for development
VITE_DEBUG_MODE=true

# Enable Requestly headers
VITE_REQUESTLY_ENABLED=true

# Optional: Show debug panel
VITE_DEBUG_PANEL=true
```

#### Option B: Browser Console

Open browser DevTools and run:

```javascript
// Toggle debug mode
YatriAIDebug.toggleDebugMode(true);

// Toggle Requestly headers
YatriAIDebug.toggleRequestly(true);

// Refresh the page to apply changes
location.reload();
```

## Debug Features

### Debug Panel

When debug mode is enabled, a floating debug panel appears in the bottom-right corner:

- 🐞 **Click the bug icon** to open the panel
- 📋 **View all API requests** with timing and status
- 🔍 **Inspect request/response** bodies
- 📋 **Copy as cURL** for terminal testing
- 🗑️ **Clear history** when needed

### Keyboard Shortcut

Press `Ctrl + Shift + D` to toggle debug mode.

### Console Commands

```javascript
// Get all captured requests
YatriAIDebug.getRequests()

// Clear request history
YatriAIDebug.clearRequests()

// Check debug status
YatriAIDebug.isDebugMode()
YatriAIDebug.isRequestlyEnabled()

// Get configuration
YatriAIDebug.getConfig()
```

## Debug Headers

When Requestly integration is enabled, all API requests include these headers:

| Header | Description |
|--------|-------------|
| `X-YatriAI-Request-ID` | Unique request identifier |
| `X-YatriAI-Timestamp` | Request timestamp |
| `X-YatriAI-Source` | Service that made the request |
| `X-YatriAI-Debug` | Debug mode flag |
| `X-YatriAI-Version` | App version |

## Requestly Rules

### Rule 1: Mock Weather API

Create a rule to mock weather responses:

1. Open Requestly
2. Create new **Modify Response** rule
3. Configure:
   - **If URL contains**: `/api/weather`
   - **Response Body**:
   
```json
{
  "location": "Ranchi, Jharkhand",
  "temperature": 28,
  "feelsLike": 30,
  "humidity": 65,
  "conditions": "Sunny",
  "icon": "☀️",
  "forecast": [
    { "date": "Today", "high": 32, "low": 24, "conditions": "Sunny", "icon": "☀️", "precipitation": 0 }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

### Rule 2: Simulate Slow Network

Create a rule to add delays:

1. Create new **Delay Request** rule
2. Configure:
   - **If URL contains**: `/api/`
   - **Delay**: 2000ms

### Rule 3: Simulate Server Errors

Create a rule to test error handling:

1. Create new **Modify Response** rule
2. Configure:
   - **If URL contains**: `/api/ai/chat`
   - **Response Status**: 500
   - **Response Body**:
   
```json
{
  "error": "Internal Server Error",
  "message": "AI service temporarily unavailable"
}
```

### Rule 4: Redirect to Beeceptor

Redirect API calls to your Beeceptor endpoint:

1. Create new **Redirect Request** rule
2. Configure:
   - **If URL matches**: `http://localhost:3001/api/*`
   - **Redirect to**: `https://yatriai.free.beeceptor.com/api/$1`

### Rule 5: Filter by Request ID

Debug specific requests:

1. Create new **Modify Headers** rule
2. Configure:
   - **If Header**: `X-YatriAI-Request-ID` matches `abc123*`
   - Add custom logging or modifications

## Integration with Beeceptor

YatriAI's debug system works seamlessly with Beeceptor:

1. **Beeceptor** provides the mock server
2. **Requestly** provides request interception and modification
3. **Debug Panel** provides visibility into all requests

### Workflow Example

1. Enable Beeceptor mocks (`VITE_BEECEPTOR_URL`)
2. Enable Requestly headers (`VITE_REQUESTLY_ENABLED=true`)
3. Create Requestly rules to modify specific responses
4. Use the Debug Panel to monitor all requests

## Service-Specific Debugging

### Weather Service

```javascript
// All weather requests are tagged with source: WeatherService
// Filter in Requestly: X-YatriAI-Source equals WeatherService
```

### AI Service

```javascript
// AI requests for chat and itinerary generation
// Filter in Requestly: X-YatriAI-Source equals AIService
```

### Payment Service

```javascript
// Payment processing requests
// Filter in Requestly: X-YatriAI-Source equals PaymentService
```

### Blockchain Service

```javascript
// Blockchain verification requests
// Filter in Requestly: X-YatriAI-Source equals BlockchainService
```

### Voice Service

```javascript
// Text-to-speech requests (ElevenLabs prep)
// Filter in Requestly: X-YatriAI-Source equals VoiceService
```

### Translate Service

```javascript
// Translation requests
// Filter in Requestly: X-YatriAI-Source equals TranslateService
```

## Testing Scenarios

### Test Error Handling

1. Create Requestly rule to return 500 for `/api/ai/chat`
2. Open AI Chat in YatriAI
3. Send a message
4. Verify graceful error handling

### Test Loading States

1. Create Requestly rule to delay `/api/` by 5000ms
2. Navigate through the app
3. Verify loading spinners and skeleton states

### Test Empty States

1. Create Requestly rule to return empty arrays for list endpoints
2. Verify "no results" UI is displayed correctly

### Test Rate Limiting

1. Create Requestly rule to return 429 for repeated requests
2. Verify retry logic and user feedback

## Troubleshooting

### Debug Panel Not Showing

1. Check `VITE_DEBUG_MODE=true` in `.env.local`
2. Restart dev server: `npm run dev`
3. Check browser console for debug messages

### Requestly Headers Not Added

1. Check `VITE_REQUESTLY_ENABLED=true`
2. Verify via browser DevTools Network tab
3. Look for `X-YatriAI-*` headers

### Rules Not Matching

1. Check URL patterns in Requestly
2. Use Requestly's test feature to verify matching
3. Check for CORS issues in console

## Best Practices

1. **Use Request IDs** - Filter by `X-YatriAI-Request-ID` for specific debugging
2. **Source Filtering** - Use `X-YatriAI-Source` to focus on specific services
3. **Save Rule Groups** - Create Requestly rule groups for different test scenarios
4. **Share Rules** - Export Requestly rules for team collaboration
5. **Combine with Beeceptor** - Use Beeceptor for persistent mocks, Requestly for on-the-fly changes

## Resources

- [Requestly Documentation](https://docs.requestly.io)
- [Requestly GitHub](https://github.com/AjayRajGvr/requestly)
- [Beeceptor Setup](./BEECEPTOR_SETUP.md)
- [YatriAI API Documentation](./API.md)

