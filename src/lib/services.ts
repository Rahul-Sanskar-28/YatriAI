/**
 * External Services Integration
 * 
 * This file manages integrations with external services like:
 * - ElevenLabs for voice synthesis
 * - Analytics services
 * - Notification services
 * - N8N workflow automation
 * - Axicov AI agents
 */

// Mock voice service for development
export const voiceService = {
  synthesize: async (text: string, language: string = 'en') => {
    console.log(`🎙️ Voice synthesis: "${text}" in ${language}`);
    // Return a mock audio URL or blob
    return null;
  },
  
  isAvailable: () => false,
  
  getSupportedLanguages: () => ['en', 'bn', 'hi'],
};

// Check if ElevenLabs is configured
export const isElevenLabsConfigured = () => {
  return !!import.meta.env.VITE_ELEVENLABS_API_KEY;
};

// Analytics service
export const analyticsService = {
  track: (event: string, category: string, properties?: any) => {
    console.log(`📊 Analytics: ${event} (${category})`, properties);
  },
  
  error: (error: string, message: string) => {
    console.error(`❌ Analytics Error: ${error} - ${message}`);
  },
};

// Notification service
export const notificationService = {
  show: (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log(`🔔 Notification [${type}]: ${title} - ${message}`);
  },
  
  push: (title: string, body: string) => {
    console.log(`📱 Push Notification: ${title} - ${body}`);
  },
};

// N8N workflow service
export const n8nService = {
  trigger: async (workflow: string, data: any) => {
    console.log(`⚡ N8N Workflow: ${workflow}`, data);
    return { success: true, data: null };
  },
  
  isConfigured: () => !!import.meta.env.VITE_USE_N8N,
};

// Initialize all services
export const initializeServices = async () => {
  const usingMocks = !isElevenLabsConfigured() && !n8nService.isConfigured();
  
  return {
    status: 'initialized',
    usingMocks,
    usingAxicov: !!import.meta.env.VITE_USE_AXICOV,
    usingN8n: n8nService.isConfigured(),
    usingElevenLabs: isElevenLabsConfigured(),
    usingDodoPayments: !!import.meta.env.VITE_DODO_PUBLIC_KEY,
    usingBlockchain: !!import.meta.env.VITE_USE_REAL_BLOCKCHAIN,
    analyticsEnabled: true,
  };
};