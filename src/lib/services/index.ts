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
 * - n8n: Workflow automation and notifications
 * - ElevenLabs: Voice AI (voiceService)
 * - Dodo Payments: Payment processing (paymentService)
 * - ETHIndia: Blockchain verification (blockchainService)
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

// n8n Workflow Automation
export { n8nService } from './n8n.service';
export type {
  WorkflowTriggerResult,
  UserRegistrationPayload,
  BookingConfirmationPayload,
  ItineraryGeneratedPayload,
  GuideAssignmentPayload,
  PaymentReceivedPayload,
  ReminderPayload,
  EmergencyAlertPayload,
} from './n8n.service';

// Notification Service
export { notificationService } from './notification.service';
export type {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationChannel,
  CreateNotificationParams,
  NotificationPreferences,
} from './notification.service';

// Analytics & Event Tracking
export { analyticsService } from './analytics.service';
export type {
  AnalyticsEvent,
  EventCategory,
  StandardEvent,
  UserTraits,
  Funnel,
  FunnelStep,
} from './analytics.service';

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
import { getServiceStatus, isUsingMocks, isAxicovConfigured, isN8nConfigured, ServiceFlags } from './config';
import { axicovService } from './axicov.service';
import { n8nService } from './n8n.service';
import { analyticsService } from './analytics.service';
export { getServiceStatus, isUsingMocks, isAxicovConfigured, isN8nConfigured };

/**
 * Initialize all services (call once on app startup)
 */
export const initializeServices = async (): Promise<{
  status: ReturnType<typeof getServiceStatus>;
  usingMocks: boolean;
  usingAxicov: boolean;
  usingN8n: boolean;
  analyticsEnabled: boolean;
}> => {
  const status = getServiceStatus();
  const usingMocks = isUsingMocks();
  const usingAxicov = isAxicovConfigured();
  const usingN8n = isN8nConfigured();
  const analyticsEnabled = ServiceFlags.ENABLE_ANALYTICS;

  // Log Axicov status
  if (usingAxicov) {
    console.log(
      '%c🤖 YatriAI AI Agents: Powered by Axicov',
      'color: #8b5cf6; font-weight: bold;'
    );
    const agentStatus = axicovService.getAgentStatus();
    console.log('Axicov Agents:', agentStatus);
  }

  // Log n8n status
  if (usingN8n) {
    console.log(
      '%c⚡ YatriAI Workflows: Powered by n8n',
      'color: #ff6d5a; font-weight: bold;'
    );
    console.log('n8n configured:', n8nService.isConfigured());
  }

  // Log analytics status
  if (analyticsEnabled) {
    console.log(
      '%c📊 YatriAI Analytics: Enabled',
      'color: #3b82f6; font-weight: bold;'
    );
    console.log('Analytics consent:', analyticsService.hasConsent() ? 'given' : 'pending');
  }

  if (usingMocks) {
    console.log(
      '%c🐝 YatriAI Services: Using Beeceptor mocks',
      'color: #f59e0b; font-weight: bold;'
    );
    console.log('Service Status:', status);
  } else if (!usingAxicov && !usingN8n) {
    console.log(
      '%c🚀 YatriAI Services: Connected to live APIs',
      'color: #10b981; font-weight: bold;'
    );
  }

  // Log setup hints
  console.log('%c📋 Service Configuration:', 'color: #6b7280; font-weight: bold;', status);

  return { status, usingMocks, usingAxicov, usingN8n, analyticsEnabled };
};

