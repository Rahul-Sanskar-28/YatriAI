/**
 * Translation Service
 * 
 * Handles multilingual support:
 * - UI text translation
 * - Destination descriptions
 * - Chat message translation
 * 
 * Uses Beeceptor mock in development.
 * Enhanced with Requestly debug support.
 * 
 * Can be replaced with real translation API (LibreTranslate, DeepL, etc.)
 */

import { ServiceURLs, ServiceFlags } from './config';
import { createServiceFetch } from '../debug';

// Create debug-enabled fetch for this service
const serviceFetch = createServiceFetch('TranslateService');

export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'ho' | 'sat';

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

// Common phrases in multiple languages
const translations: Record<string, Record<SupportedLanguage, string>> = {
  'welcome': {
    en: 'Welcome to YatriAI',
    hi: 'YatriAI में आपका स्वागत है',
    bn: 'YatriAI তে স্বাগতম',
    ho: 'YatriAI ते सावागत',
    sat: 'YatriAI ते सावागत',
  },
  'explore': {
    en: 'Explore Jharkhand',
    hi: 'झारखंड का अन्वेषण करें',
    bn: 'ঝাড়খণ্ড অন্বেষণ করুন',
    ho: 'झारखंड देखवऽ',
    sat: 'झारखंड देखवऽ',
  },
  'book_now': {
    en: 'Book Now',
    hi: 'अभी बुक करें',
    bn: 'এখনই বুক করুন',
    ho: 'अब बुक करऽ',
    sat: 'अब बुक करऽ',
  },
  'find_guide': {
    en: 'Find a Guide',
    hi: 'एक गाइड खोजें',
    bn: 'একজন গাইড খুঁজুন',
    ho: 'गाइड खोजऽ',
    sat: 'गाइड खोजऽ',
  },
  'my_bookings': {
    en: 'My Bookings',
    hi: 'मेरी बुकिंग',
    bn: 'আমার বুকিং',
    ho: 'मोर बुकिंग',
    sat: 'मोर बुकिंग',
  },
  'destinations': {
    en: 'Destinations',
    hi: 'गंतव्य',
    bn: 'গন্তব্যস্থল',
    ho: 'जाय के ठांव',
    sat: 'जाय के ठांव',
  },
  'marketplace': {
    en: 'Marketplace',
    hi: 'बाज़ार',
    bn: 'বাজার',
    ho: 'हाट-बाजार',
    sat: 'हाट-बाजार',
  },
  'ai_assistant': {
    en: 'AI Travel Assistant',
    hi: 'AI यात्रा सहायक',
    bn: 'AI ভ্রমণ সহকারী',
    ho: 'AI यात्रा सहायक',
    sat: 'AI यात्रा सहायक',
  },
  'weather': {
    en: 'Weather',
    hi: 'मौसम',
    bn: 'আবহাওয়া',
    ho: 'मौसम',
    sat: 'मौसम',
  },
  'tribal_culture': {
    en: 'Tribal Culture',
    hi: 'आदिवासी संस्कृति',
    bn: 'আদিবাসী সংস্কৃতি',
    ho: 'आदिवासी संस्कृति',
    sat: 'आदिवासी संस्कृति',
  },
  'handicrafts': {
    en: 'Handicrafts',
    hi: 'हस्तशिल्प',
    bn: 'হস্তশিল্প',
    ho: 'हाथ के काम',
    sat: 'हाथ के काम',
  },
  'waterfalls': {
    en: 'Waterfalls',
    hi: 'झरने',
    bn: 'জলপ্রপাত',
    ho: 'झरना',
    sat: 'झरना',
  },
  'wildlife': {
    en: 'Wildlife Safari',
    hi: 'वन्यजीव सफारी',
    bn: 'বন্যপ্রাণী সাফারি',
    ho: 'जंगली जानवर देखना',
    sat: 'जंगली जानवर देखना',
  },
};

// Language names
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'हिंदी (Hindi)',
  bn: 'বাংলা (Bengali)',
  ho: 'हो (Ho)',
  sat: 'संताली (Santali)',
};

class TranslateService {
  private baseUrl: string;
  private useMock: boolean;
  private currentLanguage: SupportedLanguage = 'en';
  private cache: Map<string, TranslationResult> = new Map();

  constructor() {
    this.baseUrl = ServiceURLs.TRANSLATE_API;
    this.useMock = ServiceFlags.USE_MOCK_TRANSLATE;
    
    // Load saved language preference
    const saved = localStorage.getItem('preferred_language');
    if (saved && this.isValidLanguage(saved)) {
      this.currentLanguage = saved as SupportedLanguage;
    }
  }

  /**
   * Translate text to target language
   */
  async translate(
    text: string,
    targetLang: SupportedLanguage,
    sourceLang: SupportedLanguage = 'en'
  ): Promise<TranslationResult> {
    // Check cache first
    const cacheKey = `${text}:${sourceLang}:${targetLang}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Check if we have a preset translation
    const presetKey = Object.keys(translations).find(
      (key) => translations[key][sourceLang]?.toLowerCase() === text.toLowerCase()
    );

    if (presetKey && translations[presetKey][targetLang]) {
      const result: TranslationResult = {
        originalText: text,
        translatedText: translations[presetKey][targetLang],
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      };
      this.cache.set(cacheKey, result);
      return result;
    }

    if (this.useMock && !import.meta.env.VITE_BEECEPTOR_URL) {
      return this.getMockTranslation(text, targetLang, sourceLang);
    }

    try {
      // Use debug-enabled fetch
      const response = await serviceFetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          source: sourceLang,
          target: targetLang,
        }),
      });

      if (!response.ok) {
        return this.getMockTranslation(text, targetLang, sourceLang);
      }

      const result = await response.json();
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn('Translation API unavailable, using mock:', error);
      return this.getMockTranslation(text, targetLang, sourceLang);
    }
  }

  /**
   * Get translation for a known key
   */
  getTranslation(key: string, lang?: SupportedLanguage): string {
    const targetLang = lang || this.currentLanguage;
    return translations[key]?.[targetLang] || translations[key]?.['en'] || key;
  }

  /**
   * Set current language
   */
  setLanguage(lang: SupportedLanguage): void {
    this.currentLanguage = lang;
    localStorage.setItem('preferred_language', lang);
    
    // Dispatch event for components to react
    window.dispatchEvent(new CustomEvent('language-change', { detail: { language: lang } }));
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages(): { code: SupportedLanguage; name: string }[] {
    return Object.entries(LANGUAGE_NAMES).map(([code, name]) => ({
      code: code as SupportedLanguage,
      name,
    }));
  }

  /**
   * Translate multiple texts at once
   */
  async translateBatch(
    texts: string[],
    targetLang: SupportedLanguage
  ): Promise<TranslationResult[]> {
    return Promise.all(texts.map((text) => this.translate(text, targetLang)));
  }

  /**
   * Detect language of text
   */
  async detectLanguage(text: string): Promise<SupportedLanguage> {
    // Simple detection based on character sets
    if (/[\u0900-\u097F]/.test(text)) {
      // Devanagari script - could be Hindi, Santali, or Ho
      return 'hi';
    }
    if (/[\u0980-\u09FF]/.test(text)) {
      return 'bn'; // Bengali script
    }
    return 'en';
  }

  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return ['en', 'hi', 'bn', 'ho', 'sat'].includes(lang);
  }

  private getMockTranslation(
    text: string,
    targetLang: SupportedLanguage,
    sourceLang: SupportedLanguage
  ): TranslationResult {
    // For mock, just return the original text with a note
    // In production, this would call a real translation API
    return {
      originalText: text,
      translatedText: targetLang === 'en' ? text : `[${targetLang.toUpperCase()}] ${text}`,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
    };
  }
}

export const translateService = new TranslateService();
export default translateService;
