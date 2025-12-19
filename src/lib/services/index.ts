/**
 * External Services Index
 * 
 * Central export for all external service integrations.
 * 
 * Services use Beeceptor for mocking during development,
 * and can be switched to real APIs via environment variables.
 * 
 * Integrations:
 * - Axicov: AI agent deployment and orchestration
 * - ElevenLabs: Voice AI (voiceService)
 * - Dodo Payments: Payment processing (paymentService)
 * - ETHIndia: Blockchain verification (blockchainService)
 * - n8n: Workflow orchestration (via webhooks)
 */

// Configuration
export * from './config';

// Axicov AI Agents
export { axicovService } from './axicov.service';
export type {
  AgentExecutionResult,
  TravelAssistantInput,
  TravelAssistantResponse,
  ItineraryPlannerInput,
  ItineraryPlannerResponse,
  RecommendationsInput,
  RecommendationsResponse,
  GuideMatcherInput,
  GuideMatcherResponse,
  CulturalExpertInput,
  CulturalExpertResponse,
} from './axicov.service';

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
import { getServiceStatus, isUsingMocks, isAxicovConfigured } from './config';
import { axicovService } from './axicov.service';
export { getServiceStatus, isUsingMocks, isAxicovConfigured };

/**
 * Initialize all services (call once on app startup)
 */
export const initializeServices = async (): Promise<{
  status: ReturnType<typeof getServiceStatus>;
  usingMocks: boolean;
  usingAxicov: boolean;
}> => {
  const status = getServiceStatus();
  const usingMocks = isUsingMocks();
  const usingAxicov = isAxicovConfigured();

  // Log Axicov status
  if (usingAxicov) {
    console.log(
      '%c🤖 YatriAI AI Agents: Powered by Axicov',
      'color: #8b5cf6; font-weight: bold;'
    );
    const agentStatus = axicovService.getAgentStatus();
    console.log('Axicov Agents:', agentStatus);
  }

  if (usingMocks) {
    console.log(
      '%c🐝 YatriAI Services: Using Beeceptor mocks',
      'color: #f59e0b; font-weight: bold;'
    );
    console.log('Service Status:', status);
  } else if (!usingAxicov) {
    console.log(
      '%c🚀 YatriAI Services: Connected to live APIs',
      'color: #10b981; font-weight: bold;'
    );
  }

  // Log setup hints if services are not configured
  if (!usingAxicov && !usingMocks) {
    console.log(
      '%c💡 Tip: Set VITE_USE_AXICOV=true and configure agent IDs to use AI agents',
      'color: #6b7280;'
    );
  }

  return { status, usingMocks, usingAxicov };
};

