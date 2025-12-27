# Picture Deck Feature - VIBE.EXE Implementation

## Overview
The Picture Deck feature has been upgraded using the proven VIBE.EXE implementation. It allows users to upload images of historic monuments and receive engaging historical stories told in Bengali storytelling style using Google Gemini AI, complete with audio narration using Google's free TTS services and browser speech synthesis fallback.

## Key Improvements from VIBE.EXE
- **Base64 Image Processing**: More efficient than file uploads
- **Direct Gemini REST API**: Uses Gemini 2.5 Flash model directly
- **Free Google TTS**: Uses Google Translate TTS (no API key required)
- **Browser Speech Synthesis**: Automatic fallback with Indian English voice preference
- **Cleaner Architecture**: Simplified response structure and error handling
- **Better Performance**: Reduced dependencies and faster processing

## Features
- **Image Upload**: Drag & drop or click to upload monument photos
- **AI Recognition**: Google Gemini 2.5 Flash identifies monuments from images
- **Bengali Storytelling**: Stories told with warm, expressive Bengali narrative style
- **Dual Audio System**: 
  - Primary: Google Translate TTS (server-generated)
  - Fallback: Browser Speech Synthesis with Indian English voice preference
- **Historical Content**: Covers historical background, architectural features, and cultural importance
- **File Validation**: Supports JPEG, PNG, WebP up to 10MB
- **Real-time Analysis**: Instant monument analysis and story generation
- **Smart Audio Controls**: Automatically detects best audio method available

## Technical Implementation

### Backend Architecture
- **Controller**: `YatriAI/backend/src/controllers/pictureDeckController.ts`
- **Routes**: `YatriAI/backend/src/routes/pictureDeckRoutes.ts`
- **Endpoint**: `POST /api/picture-deck/analyze`
- **Authentication**: Requires JWT token
- **Input Methods**: Supports both file upload and base64 data
- **AI Model**: Gemini 2.5 Flash via direct REST API calls
- **Audio Generation**: Google Translate TTS + VoiceRSS fallback

### Frontend Features
- **Component**: `YatriAI/src/components/dashboard/components/PictureDeck.tsx`
- **Integration**: Added to TouristDashboard as "Picture Deck" menu item
- **Styling**: Uses Kolkata heritage color palette with Tailwind CSS
- **Animations**: Framer Motion for smooth transitions
- **Audio System**: Intelligent audio playback with multiple fallbacks

## Setup Instructions

### 1. Environment Configuration
**Backend (.env)**:
```
GEMINI_API_KEY=AIzaSyCIa4n-lpYe8Cw5XCUqMvRnk9EbYV8_oWc
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:3001/api
VITE_GEMINI_API_KEY=AIzaSyCIa4n-lpYe8Cw5XCUqMvRnk9EbYV8_oWc
```

### 2. Dependencies
**Backend** (minimal dependencies):
- `axios` - HTTP client for Gemini API calls
- `express` - Web server
- `multer` - File upload support (for compatibility)

**Frontend**:
- `axios` - HTTP client for API calls
- `framer-motion` - Animations

### 3. Start Servers
**Backend**:
```bash
cd YatriAI/backend
npm run dev
```

**Frontend**:
```bash
cd YatriAI
npm run dev
```

### 4. Access the Feature
1. Login to the application
2. Navigate to Tourist Dashboard
3. Click on "Picture Deck" in the sidebar menu
4. Upload an image of a historic monument
5. Click "Discover the Story" to get AI-generated content
6. Use audio controls to listen (automatic fallback system)

## API Usage

### Request (Base64 Method - Preferred)
```
POST /api/picture-deck/analyze
Content-Type: application/json
Authorization: Bearer <jwt-token>

Body:
{
  "imageBase64": "base64-encoded-image-data"
}
```

### Request (File Upload Method - Legacy Support)
```
POST /api/picture-deck/analyze
Content-Type: multipart/form-data
Authorization: Bearer <jwt-token>

Body:
- image: File (JPEG/PNG/WebP, max 10MB)
```

### Response
```json
{
  "success": true,
  "data": {
    "story": "AI-generated historical story in Bengali style...",
    "audio": "base64-encoded-mp3-audio-data",
    "audioAvailable": true,
    "audioError": null,
    "imageSize": 2048576,
    "imageType": "image/jpeg",
    "timestamp": "2025-01-01T12:00:00.000Z"
  }
}
```

## Audio System Architecture

### Primary Audio (Server-Generated)
1. **Google Translate TTS**: Free API, no authentication required
2. **VoiceRSS Demo**: Fallback for Google TTS failures
3. **Base64 Delivery**: Audio returned as base64 in response

### Fallback Audio (Browser-Generated)
1. **Speech Synthesis API**: Built into modern browsers
2. **Voice Selection**: Prefers Indian English voices
3. **Customization**: Adjusted rate (0.9x) and pitch for better experience

### Audio Controls
- **Smart Detection**: Automatically chooses best available audio method
- **Visual Feedback**: Shows audio source (server vs browser)
- **Play/Pause**: Unified controls for both audio types
- **Error Handling**: Graceful fallback between methods

## Debugging Features
- **Console Logging**: Detailed logs for troubleshooting
- **Error Messages**: Specific error handling for different scenarios
- **Development Mode**: Shows API configuration and token status
- **Audio Debugging**: Logs audio generation attempts and fallbacks

## Performance Optimizations
- **Base64 Processing**: Eliminates file system operations
- **Direct API Calls**: Bypasses SDK overhead
- **Free Services**: No API quotas or costs for TTS
- **Efficient Fallbacks**: Quick switching between audio methods
- **Minimal Dependencies**: Reduced bundle size and complexity

## Security Features
- JWT authentication required
- File type validation (only images)
- File size limits (10MB max)
- Input sanitization for base64 data
- Error handling prevents information leakage

## Browser Compatibility
- **Modern Browsers**: Full feature support
- **Speech Synthesis**: Available in Chrome, Firefox, Safari, Edge
- **Audio Playback**: Standard HTML5 audio support
- **File Upload**: Drag & drop and file input support

## Troubleshooting

### Common Issues
1. **"Gemini API not configured"**: Check GEMINI_API_KEY in backend/.env
2. **"Authentication failed"**: Ensure user is logged in and JWT token is valid
3. **"Failed to analyze monument"**: Check network connection and API key validity
4. **Audio not playing**: System automatically falls back to browser TTS
5. **CORS errors**: Ensure FRONTEND_URL is set correctly in backend/.env

### Audio Troubleshooting
- **No server audio**: Check console for TTS API errors, browser TTS will activate
- **No browser audio**: Check if Speech Synthesis is supported in browser
- **Poor voice quality**: System tries to select Indian English voices automatically
- **Audio interruption**: Stop/start controls work for both audio types

### Performance Tips
- **Image Size**: Smaller images (< 2MB) process faster
- **Network**: Stable connection improves audio generation success
- **Browser**: Chrome/Edge provide best Speech Synthesis voice selection

## Future Enhancements
- Voice selection UI for browser TTS
- Audio download capability
- Multiple language support for stories
- Offline audio caching
- Voice cloning integration
- Real-time audio streaming
- Monument location mapping
- Social sharing with audio