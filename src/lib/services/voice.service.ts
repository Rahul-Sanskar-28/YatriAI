/**
 * Voice Service
 * 
 * Handles text-to-speech and voice features:
 * - Chat response audio
 * - Audio tour guides
 * - Multilingual voice support
 * 
 * Uses Beeceptor mock in development.
 * Enhanced with Requestly debug support.
 * 
 * Prepared for ElevenLabs integration:
 * - 10,000 characters free per month
 * - API: https://api.elevenlabs.io/v1
 * - Docs: https://docs.elevenlabs.io
 */

import { ServiceURLs, ServiceFlags, ServiceKeys } from './config';
import { createServiceFetch } from '../debug';

// Create debug-enabled fetch for this service
const serviceFetch = createServiceFetch('VoiceService');

export interface VoiceConfig {
  voiceId: string;
  name: string;
  language: string;
  accent?: string;
  gender: 'male' | 'female';
}

export interface SpeechResult {
  audioUrl: string;
  duration: number;
  charactersUsed: number;
}

// Available voices (matching ElevenLabs voice IDs for easy migration)
export const AVAILABLE_VOICES: VoiceConfig[] = [
  { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', language: 'en', gender: 'male' },
  { voiceId: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', language: 'en', gender: 'female' },
  { voiceId: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi', language: 'en', accent: 'indian', gender: 'female' },
  { voiceId: 'custom_hindi_male', name: 'Arjun', language: 'hi', gender: 'male' },
  { voiceId: 'custom_hindi_female', name: 'Priya', language: 'hi', gender: 'female' },
];

class VoiceService {
  private baseUrl: string;
  private useMock: boolean;
  private apiKey: string;
  private charactersUsed: number = 0;
  private monthlyLimit: number = 10000; // ElevenLabs free tier

  constructor() {
    this.baseUrl = ServiceURLs.VOICE_API;
    this.useMock = ServiceFlags.USE_MOCK_VOICE;
    this.apiKey = ServiceKeys.ELEVENLABS_API_KEY;
  }

  /**
   * Convert text to speech
   */
  async textToSpeech(
    text: string,
    options: {
      voiceId?: string;
      language?: string;
    } = {}
  ): Promise<SpeechResult> {
    const { voiceId = 'pNInz6obpgDQGcFmaJgB' } = options;

    // Check character limit
    if (this.charactersUsed + text.length > this.monthlyLimit) {
      console.warn('Monthly character limit approaching');
    }

    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.getMockSpeech(text);
    }

    // If ElevenLabs API key is available, use real API
    if (this.apiKey && !this.useMock) {
      return this.callElevenLabs(text, voiceId);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voiceId, language: options.language }),
      });

      if (!response.ok) {
        return this.getMockSpeech(text);
      }

      const result = await response.json();
      this.charactersUsed += text.length;
      return result;
    } catch (error) {
      console.warn('Voice API unavailable, using mock:', error);
      return this.getMockSpeech(text);
    }
  }

  /**
   * Call ElevenLabs API directly (when API key is available)
   */
  private async callElevenLabs(text: string, voiceId: string): Promise<SpeechResult> {
    try {
      // Use debug-enabled fetch for ElevenLabs too
      const response = await serviceFetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      this.charactersUsed += text.length;

      return {
        audioUrl,
        duration: this.estimateDuration(text),
        charactersUsed: text.length,
      };
    } catch (error) {
      console.warn('ElevenLabs API failed, using mock:', error);
      return this.getMockSpeech(text);
    }
  }

  /**
   * Generate audio tour guide narration
   */
  async generateTourNarration(
    destination: string,
    points: string[]
  ): Promise<SpeechResult[]> {
    const results: SpeechResult[] = [];

    for (const point of points) {
      const narration = `Welcome to ${destination}. ${point}`;
      const result = await this.textToSpeech(narration, {
        voiceId: 'AZnzlk1XvdvUeBnXmlld', // Indian accent
      });
      results.push(result);
    }

    return results;
  }

  /**
   * Get usage statistics
   */
  getUsageStats(): {
    charactersUsed: number;
    charactersRemaining: number;
    percentUsed: number;
  } {
    return {
      charactersUsed: this.charactersUsed,
      charactersRemaining: this.monthlyLimit - this.charactersUsed,
      percentUsed: (this.charactersUsed / this.monthlyLimit) * 100,
    };
  }

  /**
   * Get available voices for a language
   */
  getVoicesForLanguage(language: string): VoiceConfig[] {
    return AVAILABLE_VOICES.filter((v) => v.language === language);
  }

  /**
   * Play audio URL
   */
  playAudio(audioUrl: string): HTMLAudioElement {
    const audio = new Audio(audioUrl);
    audio.play();
    return audio;
  }

  // Mock implementations
  private getMockSpeech(text: string): SpeechResult {
    // Return a mock result with no actual audio
    // In development, we can use the browser's built-in TTS
    return {
      audioUrl: '', // Empty URL indicates mock
      duration: this.estimateDuration(text),
      charactersUsed: text.length,
    };
  }

  private estimateDuration(text: string): number {
    // Estimate ~150 words per minute speaking rate
    const words = text.split(/\s+/).length;
    return (words / 150) * 60; // Duration in seconds
  }

  /**
   * Use browser's built-in TTS as fallback (for mock mode)
   */
  speakWithBrowserTTS(text: string, language: string = 'en'): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }

  /**
   * Stop browser TTS
   */
  stopBrowserTTS(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
export default voiceService;
