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

// AI Service (mock)
export const aiService = {
  generateItinerary: async (preferences: any) => {
    console.log('🤖 AI: Generating itinerary...', preferences);
    return {
      success: true,
      data: {
        title: "Kolkata Heritage Experience",
        duration: 3,
        activities: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple"],
        estimatedCost: 2500
      }
    };
  },
  
  chat: async (message: string) => {
    console.log('💬 AI Chat:', message);
    return {
      success: true,
      data: {
        response: "I'm here to help you explore Kolkata's heritage! What would you like to know?"
      }
    };
  },
  
  isConfigured: () => !!import.meta.env.VITE_USE_AXICOV,
};

// Weather Service (mock)
export const weatherService = {
  getCurrentWeather: async (city: string) => {
    console.log('🌤️ Weather: Getting weather for', city);
    return {
      success: true,
      data: {
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 75,
        windSpeed: 12
      }
    };
  },
  
  getForecast: async (city: string, days: number = 5) => {
    console.log('📅 Weather: Getting forecast for', city, days, 'days');
    return {
      success: true,
      data: Array.from({ length: days }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
        temperature: 25 + Math.random() * 10,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      }))
    };
  }
};

// Types for services
export interface ItineraryPreferences {
  interests: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  duration: number;
  travelStyle: 'solo' | 'couple' | 'family' | 'group';
}

export interface GeneratedItinerary {
  title: string;
  duration: number;
  activities: string[];
  estimatedCost: number;
  schedule?: {
    day: number;
    activities: string[];
    meals: string[];
  }[];
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

// Initialize all services
export const initializeServices = async () => {
  const usingMocks = !isElevenLabsConfigured() && !n8nService.isConfigured();
  
  return {
    status: 'initialized',
    usingMocks,
    usingAxicov: aiService.isConfigured(),
    usingN8n: n8nService.isConfigured(),
    usingElevenLabs: isElevenLabsConfigured(),
    usingDodoPayments: !!import.meta.env.VITE_DODO_PUBLIC_KEY,
    usingBlockchain: !!import.meta.env.VITE_USE_REAL_BLOCKCHAIN,
    analyticsEnabled: true,
  };
};