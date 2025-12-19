/**
 * External Services Index
 * 
 * Central export for all external service integrations.
 * 
 * Services use Beeceptor for mocking during development,
 * and can be switched to real APIs via environment variables.
 * 
 * Future Integrations Prepared:
 * - ElevenLabs: Voice AI (voiceService)
 * - Dodo Payments: Payment processing (paymentService)
 * - ETHIndia: Blockchain verification (blockchainService)
 * - n8n: Workflow orchestration (via webhooks)
 */

// Configuration
export * from './config';

// Services
export { weatherService } from './weather.service';
export type { WeatherData, ForecastDay } from './weather.service';

export { aiService } from './ai.service';
export type { 
  ItineraryPreferences, 
  GeneratedItinerary, 
  DayPlan, 
  ChatMessage, 
  ChatResponse 
} from './ai.service';

export { paymentService } from './payment.service';
export type { 
  PaymentIntent, 
  CreatePaymentParams, 
  PaymentResult, 
  RefundResult 
} from './payment.service';

export { blockchainService } from './blockchain.service';
export type { 
  BlockchainRecord, 
  VerificationResult, 
  BookingOnChain, 
  CertificateOnChain 
} from './blockchain.service';

export { voiceService, AVAILABLE_VOICES } from './voice.service';
export type { VoiceConfig, SpeechResult } from './voice.service';

export { translateService, LANGUAGE_NAMES } from './translate.service';
export type { SupportedLanguage, TranslationResult } from './translate.service';

// Service status helper
import { getServiceStatus, isUsingMocks } from './config';
export { getServiceStatus, isUsingMocks };

/**
 * Initialize all services (call once on app startup)
 */
export const initializeServices = async (): Promise<{
  status: ReturnType<typeof getServiceStatus>;
  usingMocks: boolean;
}> => {
  const status = getServiceStatus();
  const usingMocks = isUsingMocks();

  if (usingMocks) {
    console.log(
      '%c🐝 YatriAI Services: Using Beeceptor mocks',
      'color: #f59e0b; font-weight: bold;'
    );
    console.log('Service Status:', status);
  } else {
    console.log(
      '%c🚀 YatriAI Services: Connected to live APIs',
      'color: #10b981; font-weight: bold;'
    );
  }

  return { status, usingMocks };
};

