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
 * Future integrations prepared:
 * - ElevenLabs: Voice AI for chat responses and audio guides
 * - Dodo Payments: Payment processing for marketplace/bookings
 * - ETHIndia: Blockchain verification on Ethereum testnets
 * - n8n: Workflow automation (can orchestrate these services)
 */

// Beeceptor base URL - Create your mock at beeceptor.com
// Example: https://yatriai.free.beeceptor.com
const BEECEPTOR_BASE = import.meta.env.VITE_BEECEPTOR_URL || 'https://yatriai.free.beeceptor.com';

// Feature flags to enable/disable external services
export const ServiceFlags = {
  USE_MOCK_WEATHER: import.meta.env.VITE_USE_MOCK_WEATHER !== 'false',
  USE_MOCK_AI: import.meta.env.VITE_USE_MOCK_AI !== 'false',
  USE_MOCK_PAYMENT: import.meta.env.VITE_USE_MOCK_PAYMENT !== 'false',
  USE_MOCK_BLOCKCHAIN: import.meta.env.VITE_USE_MOCK_BLOCKCHAIN !== 'false',
  USE_MOCK_TRANSLATE: import.meta.env.VITE_USE_MOCK_TRANSLATE !== 'false',
  USE_MOCK_VOICE: import.meta.env.VITE_USE_MOCK_VOICE !== 'false',
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
};

// Helper to check if using mocks
export const isUsingMocks = () => {
  return Object.values(ServiceFlags).some(flag => flag === true);
};

// Helper to get service status
export const getServiceStatus = () => {
  return {
    weather: ServiceFlags.USE_MOCK_WEATHER ? 'mock' : 'live',
    ai: ServiceFlags.USE_MOCK_AI ? 'mock' : 'live',
    payment: ServiceFlags.USE_MOCK_PAYMENT ? 'mock' : 'live',
    blockchain: ServiceFlags.USE_MOCK_BLOCKCHAIN ? 'mock' : 'live',
    translate: ServiceFlags.USE_MOCK_TRANSLATE ? 'mock' : 'live',
    voice: ServiceFlags.USE_MOCK_VOICE ? 'mock' : 'live',
  };
};

