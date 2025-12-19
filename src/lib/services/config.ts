/**
 * External Services Configuration
 * 
 * This file configures external API endpoints for YatriAI.
 * Uses Beeceptor for mocking during development.
 * 
 * To switch between Beeceptor and real services, update .env files:
 * - Development with mocks: Use Beeceptor URLs
 * - Production: Use real service URLs
 * 
 * Integrations prepared:
 * - Axicov: AI agent deployment and orchestration
 * - ElevenLabs: Voice AI for chat responses and audio guides
 * - Dodo Payments: Payment processing for marketplace/bookings
 * - ETHIndia: Blockchain verification on Ethereum testnets
 * - n8n: Workflow automation (can orchestrate these services)
 */

// Beeceptor base URL - Create your mock at beeceptor.com
// Example: https://yatriai.free.beeceptor.com
const BEECEPTOR_BASE = import.meta.env.VITE_BEECEPTOR_URL || 'https://yatriai.free.beeceptor.com';

// Axicov base URL - Deployed agents at axicov.com
// Your deployed agents will have URLs like: https://api.axicov.com/v1/agents/{agent-id}/run
const AXICOV_BASE = import.meta.env.VITE_AXICOV_URL || 'https://api.axicov.com/v1';

// Feature flags to enable/disable external services
export const ServiceFlags = {
  USE_MOCK_WEATHER: import.meta.env.VITE_USE_MOCK_WEATHER !== 'false',
  USE_MOCK_AI: import.meta.env.VITE_USE_MOCK_AI !== 'false',
  USE_MOCK_PAYMENT: import.meta.env.VITE_USE_MOCK_PAYMENT !== 'false',
  USE_MOCK_BLOCKCHAIN: import.meta.env.VITE_USE_MOCK_BLOCKCHAIN !== 'false',
  USE_MOCK_TRANSLATE: import.meta.env.VITE_USE_MOCK_TRANSLATE !== 'false',
  USE_MOCK_VOICE: import.meta.env.VITE_USE_MOCK_VOICE !== 'false',
  // Axicov - Set to true to use Axicov agents instead of direct AI API
  USE_AXICOV: import.meta.env.VITE_USE_AXICOV === 'true',
};

// Service URLs - Will be replaced with real service URLs when integrating
export const ServiceURLs = {
  // Weather API (for destination weather info)
  WEATHER_API: import.meta.env.VITE_WEATHER_API_URL || `${BEECEPTOR_BASE}/api/weather`,
  
  // AI/LLM API (for itinerary generation, chat responses)
  // Will be replaced with real LLM API or n8n workflow endpoint
  AI_API: import.meta.env.VITE_AI_API_URL || `${BEECEPTOR_BASE}/api/ai`,
  
  // Voice API (prepared for ElevenLabs integration)
  // ElevenLabs: https://api.elevenlabs.io/v1
  VOICE_API: import.meta.env.VITE_VOICE_API_URL || `${BEECEPTOR_BASE}/api/voice`,
  
  // Payment API (prepared for Dodo Payments integration)
  // Dodo Payments sandbox: https://sandbox.dodopayments.com/api
  PAYMENT_API: import.meta.env.VITE_PAYMENT_API_URL || `${BEECEPTOR_BASE}/api/payments`,
  
  // Blockchain API (prepared for ETHIndia/Ethereum integration)
  // Will connect to Sepolia/Holesky testnet via custom API or direct web3
  BLOCKCHAIN_API: import.meta.env.VITE_BLOCKCHAIN_API_URL || `${BEECEPTOR_BASE}/api/blockchain`,
  
  // Translation API (for multilingual support)
  TRANSLATE_API: import.meta.env.VITE_TRANSLATE_API_URL || `${BEECEPTOR_BASE}/api/translate`,
  
  // Notification webhooks (for n8n integration)
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || `${BEECEPTOR_BASE}/webhooks`,
  
  // Axicov API (for AI agent deployment)
  // Agents are deployed as APIs at axicov.com
  AXICOV_API: AXICOV_BASE,
};

// API Keys (loaded from environment)
export const ServiceKeys = {
  // ElevenLabs API key (10k chars free/month)
  ELEVENLABS_API_KEY: import.meta.env.VITE_ELEVENLABS_API_KEY || '',
  
  // Dodo Payments keys (sandbox mode)
  DODO_PUBLIC_KEY: import.meta.env.VITE_DODO_PUBLIC_KEY || '',
  DODO_SECRET_KEY: import.meta.env.VITE_DODO_SECRET_KEY || '',
  
  // Weather API key (if using a real weather service)
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || '',
  
  // Axicov API key (free tier with Ethereum wallet login)
  // Get your key at axicov.com after signing in with MetaMask
  AXICOV_API_KEY: import.meta.env.VITE_AXICOV_API_KEY || '',
};

// Axicov Agent IDs - Set these after deploying your agents
export const AxicovAgents = {
  // Travel Assistant Agent - Handles general chat about Jharkhand tourism
  TRAVEL_ASSISTANT: import.meta.env.VITE_AXICOV_AGENT_TRAVEL_ASSISTANT || '',
  
  // Itinerary Planner Agent - Generates personalized travel itineraries
  ITINERARY_PLANNER: import.meta.env.VITE_AXICOV_AGENT_ITINERARY_PLANNER || '',
  
  // Recommendations Agent - Provides destination and activity recommendations
  RECOMMENDATIONS: import.meta.env.VITE_AXICOV_AGENT_RECOMMENDATIONS || '',
  
  // Guide Matcher Agent - Matches tourists with appropriate local guides
  GUIDE_MATCHER: import.meta.env.VITE_AXICOV_AGENT_GUIDE_MATCHER || '',
  
  // Cultural Expert Agent - Provides insights on tribal culture and heritage
  CULTURAL_EXPERT: import.meta.env.VITE_AXICOV_AGENT_CULTURAL_EXPERT || '',
};

// Helper to check if using mocks
export const isUsingMocks = () => {
  const mockFlags = { ...ServiceFlags };
  // Exclude USE_AXICOV from mock check as it's not a mock flag
  delete (mockFlags as Record<string, boolean>).USE_AXICOV;
  return Object.values(mockFlags).some(flag => flag === true);
};

// Helper to check if Axicov is configured
export const isAxicovConfigured = () => {
  return ServiceFlags.USE_AXICOV && 
         ServiceKeys.AXICOV_API_KEY !== '' && 
         Object.values(AxicovAgents).some(id => id !== '');
};

// Helper to get service status
export const getServiceStatus = () => {
  const aiStatus = ServiceFlags.USE_AXICOV 
    ? (isAxicovConfigured() ? 'axicov' : 'axicov-unconfigured')
    : (ServiceFlags.USE_MOCK_AI ? 'mock' : 'live');
    
  return {
    weather: ServiceFlags.USE_MOCK_WEATHER ? 'mock' : 'live',
    ai: aiStatus,
    payment: ServiceFlags.USE_MOCK_PAYMENT ? 'mock' : 'live',
    blockchain: ServiceFlags.USE_MOCK_BLOCKCHAIN ? 'mock' : 'live',
    translate: ServiceFlags.USE_MOCK_TRANSLATE ? 'mock' : 'live',
    voice: ServiceFlags.USE_MOCK_VOICE ? 'mock' : 'live',
    axicov: isAxicovConfigured() ? 'configured' : 'not-configured',
  };
};

