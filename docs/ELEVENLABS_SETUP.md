# ElevenLabs Voice AI Setup for YatriAI

This guide explains how to integrate ElevenLabs AI voices for text-to-speech features in the YatriAI frontend, including AI Chat voice responses and audio tour guides.

## Overview

ElevenLabs provides high-quality AI voice generation with:
- **10,000 characters free per month** (no credit card required)
- Multiple voice options with different accents
- Multilingual support (English, Hindi, and more)
- Low latency for real-time applications

## Features Implemented

### 1. AI Chat Voice Responses
- Click the speaker icon 🔊 on any bot message to hear it spoken
- Auto-speak toggle to automatically read new responses
- Voice settings panel with usage tracking

### 2. Audio Tour Guides
- Generate comprehensive audio guides for destinations
- Section-by-section playback (Introduction, History, Highlights, Tips)
- Progress tracking and transcript view
- Multilingual support (English/Hindi)

### 3. Voice Buttons
- Quick voice buttons on destination descriptions
- Play/pause/stop controls
- Visual feedback with sound wave animation

## Quick Start

### 1. Get Your Free API Key

1. Go to [elevenlabs.io](https://elevenlabs.io/)
2. Sign up with email (no credit card required)
3. Navigate to your profile settings
4. Copy your API key

### 2. Configure Environment Variables

Create or update `.env.local` in the root of your YatriAI project:

```bash
# Enable ElevenLabs (disable mock voice service)
VITE_USE_MOCK_VOICE=false

# Your ElevenLabs API Key
VITE_ELEVENLABS_API_KEY=your_api_key_here

# Optional: Choose the AI model
# Options: eleven_monolingual_v1, eleven_multilingual_v1, eleven_multilingual_v2
VITE_ELEVENLABS_MODEL=eleven_multilingual_v2

# Optional: Character limit (default: 10000 for free tier)
VITE_ELEVENLABS_LIMIT=10000

# Optional: Custom voice IDs for different use cases
VITE_ELEVENLABS_VOICE_CHAT_EN=pNInz6obpgDQGcFmaJgB    # Adam (English chat)
VITE_ELEVENLABS_VOICE_CHAT_HI=pNInz6obpgDQGcFmaJgB    # Hindi chat
VITE_ELEVENLABS_VOICE_GUIDE_EN=AZnzlk1XvdvUeBnXmlld   # Domi (Indian accent for guides)
VITE_ELEVENLABS_VOICE_GUIDE_HI=AZnzlk1XvdvUeBnXmlld   # Hindi guides
VITE_ELEVENLABS_VOICE_ALERT=21m00Tcm4TlvDq8ikWAM      # Rachel (alerts)
```

### 3. Restart the Development Server

```bash
npm run dev
```

## Voice Service API

The `voiceService` provides these methods:

### Text-to-Speech
```typescript
import { voiceService } from './lib/services';

// Basic TTS
const result = await voiceService.textToSpeech('Hello, welcome to Jharkhand!');
console.log(result.audioUrl, result.duration, result.charactersUsed);

// With options
const result = await voiceService.textToSpeech('नमस्ते!', {
  voiceId: 'AZnzlk1XvdvUeBnXmlld',
  language: 'hi',
  category: 'chat',
  settings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.5,
  },
});
```

### Chat Response Voice
```typescript
// Speak a chat response with callbacks
await voiceService.speakChatResponse('Welcome to YatriAI!', {
  language: 'en',
  onStart: () => console.log('Started speaking'),
  onEnd: () => console.log('Finished speaking'),
  onError: (error) => console.error('Voice error:', error),
});
```

### Audio Tour Guides
```typescript
// Generate a complete audio guide
const guide = await voiceService.generateAudioGuide(
  'Hundru Falls',
  {
    introduction: 'Hundru Falls is one of the most beautiful waterfalls in Jharkhand...',
    history: 'The falls have been a sacred site for local tribes...',
    highlights: [
      'The 98-meter cascade is spectacular during monsoon season.',
      'Natural pools at the base are perfect for swimming.',
    ],
    tips: [
      'Visit during August-October for the best water flow.',
      'Wear comfortable shoes for the trek down.',
    ],
  },
  { language: 'en' }
);

// guide.sections contains all audio URLs
for (const section of guide.sections) {
  console.log(section.title, section.audioUrl, section.duration);
}
```

### Playback Controls
```typescript
// Play audio
await voiceService.playAudio(audioUrl);

// Stop playback
voiceService.stopPlayback();

// Pause/Resume
voiceService.pausePlayback();
voiceService.resumePlayback();

// Check if playing
const isPlaying = voiceService.getIsPlaying();
```

### Usage Tracking
```typescript
// Get usage statistics
const stats = voiceService.getUsageStats();
console.log(`${stats.charactersUsed}/${stats.charactersRemaining + stats.charactersUsed} characters used`);
console.log(`${stats.percentUsed.toFixed(1)}% of monthly limit`);

// Reset usage (for testing)
voiceService.resetUsage();
```

## React Components

### VoiceButton
A button that speaks text when clicked.

```tsx
import { VoiceButton } from './components/voice';

<VoiceButton
  text="Welcome to Jharkhand, the land of forests and waterfalls!"
  language="en"
  size="md"           // sm | md | lg
  variant="primary"   // primary | secondary | ghost
  showLabel           // Show text label
  label="Listen"      // Custom label text
  onPlayStart={() => console.log('Started')}
  onPlayEnd={() => console.log('Ended')}
/>
```

### AudioGuide
A full audio guide player for destinations.

```tsx
import { AudioGuide } from './components/voice';

<AudioGuide
  destination="Hundru Falls"
  content={{
    introduction: 'Hundru Falls is...',
    history: 'The history of...',
    highlights: ['First highlight...', 'Second highlight...'],
    tips: ['Tip 1...', 'Tip 2...'],
  }}
/>
```

### SoundWave
Visual feedback component for audio playback.

```tsx
import { SoundWave } from './components/voice';

<SoundWave isPlaying={true} />
```

## Available Voices

| Voice ID | Name | Language | Gender | Best For |
|----------|------|----------|--------|----------|
| `pNInz6obpgDQGcFmaJgB` | Adam | English | Male | Chat responses |
| `21m00Tcm4TlvDq8ikWAM` | Rachel | English | Female | Alerts, guides |
| `AZnzlk1XvdvUeBnXmlld` | Domi | English (Indian) | Female | Audio guides |
| `EXAVITQu4vr4xnSDxMaL` | Bella | English | Female | Calm narration |
| `ThT5KcBeYPX3keUQqHPh` | Dorothy | Multilingual | Female | Hindi content |
| `VR6AewLTigWG4xSOukaG` | Arnold | Multilingual | Male | Hindi guides |

## Fallback Behavior

If ElevenLabs is not configured (no API key), the service automatically falls back to:

1. **Browser TTS (Web Speech API)** - Available in most modern browsers
2. **Silent mode** - Returns empty audio URL, app continues to function

This ensures the app remains functional even without an API key configured.

## Usage Limits

### Free Tier (10,000 characters/month)
- ~2,500 words per month
- Resets on the 1st of each month
- Usage tracked in browser localStorage

### Usage Tracking
The service automatically tracks usage and:
- Shows warnings when approaching limits
- Displays remaining characters in UI
- Resets counter on new month

## Best Practices

1. **Cache Audio**: Repeated text uses cached audio to save API calls
2. **Short Messages**: Keep chat responses concise to conserve characters
3. **Pre-generate Guides**: Generate audio guides once and cache URLs
4. **Monitor Usage**: Check `voiceService.getUsageStats()` regularly

## Troubleshooting

### "Voice not available"
- Check that `VITE_ELEVENLABS_API_KEY` is set
- Ensure `VITE_USE_MOCK_VOICE=false`
- Verify API key is valid at elevenlabs.io

### "Monthly limit exceeded"
- Wait for the next month (resets on 1st)
- Upgrade to paid plan for more characters
- Use browser TTS fallback

### Audio doesn't play
- Check browser permissions for audio
- Ensure user has interacted with page (autoplay policy)
- Try clicking the play button explicitly

### Wrong voice/language
- Configure voice IDs in `.env.local`
- Use `eleven_multilingual_v2` model for non-English
- Select appropriate voice for the language

## Integration with Other Services

### Axicov AI Agents
When using Axicov agents, AI responses can be automatically spoken:

```typescript
// In AI Chat, enable auto-speak
const [autoSpeak, setAutoSpeak] = useState(true);

// After receiving AI response
if (autoSpeak) {
  await voiceService.speakChatResponse(response.message, { language });
}
```

### n8n Workflows
Voice notifications can be triggered via n8n webhooks:

```typescript
// In n8n, call webhook that triggers voice alert
await voiceService.textToSpeech(webhookData.message, {
  category: 'alert',
});
```

## File Structure

```
src/
├── lib/services/
│   ├── config.ts          # ElevenLabsConfig
│   └── voice.service.ts   # Main voice service
├── components/voice/
│   ├── index.ts           # Exports
│   ├── VoiceButton.tsx    # Voice button component
│   └── AudioGuide.tsx     # Audio guide component
└── components/dashboard/
    └── components/
        ├── AIChat.tsx         # Chat with voice
        └── InteractiveMap.tsx # Map with audio guides
```

## Console Logs

When properly configured, you'll see:
```
🎙️ YatriAI Voice: Powered by ElevenLabs
ElevenLabs Usage: 1234/10000 characters used this month
```

When using browser TTS fallback:
```
🔊 YatriAI Voice: Using browser TTS (add VITE_ELEVENLABS_API_KEY for premium voices)
```

## Support

- ElevenLabs Docs: https://docs.elevenlabs.io
- ElevenLabs Discord: https://discord.gg/elevenlabs
- YatriAI Issues: [GitHub Issues]

