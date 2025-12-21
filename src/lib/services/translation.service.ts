/**
 * Translation Service
 * Uses free translation APIs to dynamically translate text to any language
 * Caches translations in localStorage for performance
 */

// Translation cache key prefix
const CACHE_PREFIX = 'yatri_translation_';
const CACHE_VERSION = 'v1_';

// Translation API endpoints (free options)
const TRANSLATION_APIS = {
  // MyMemory is free with rate limits
  myMemory: 'https://api.mymemory.translated.net/get',
  // LibreTranslate public instance
  libreTranslate: 'https://libretranslate.com/translate',
  // Lingva Translate (Google Translate proxy)
  lingva: 'https://lingva.ml/api/v1',
};

interface TranslationCache {
  [key: string]: {
    text: string;
    timestamp: number;
  };
}

// Cache expiry time (24 hours)
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

// Load cache from localStorage
const loadCache = (): TranslationCache => {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + CACHE_VERSION + 'data');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Failed to load translation cache:', e);
  }
  return {};
};

// Save cache to localStorage
const saveCache = (cache: TranslationCache): void => {
  try {
    localStorage.setItem(CACHE_PREFIX + CACHE_VERSION + 'data', JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to save translation cache:', e);
  }
};

// Generate cache key
const getCacheKey = (text: string, targetLang: string): string => {
  return `${targetLang}_${text.slice(0, 100)}`;
};

// Translation cache in memory (faster than localStorage for repeated calls)
let memoryCache: TranslationCache = loadCache();

/**
 * Translate text using MyMemory API (free, 10000 chars/day)
 */
const translateWithMyMemory = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string> => {
  try {
    const url = `${TRANSLATION_APIS.myMemory}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('MyMemory API failed');
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error('Invalid response from MyMemory');
  } catch (error) {
    console.warn('MyMemory translation failed:', error);
    throw error;
  }
};

/**
 * Translate text using Lingva API (Google Translate proxy)
 */
const translateWithLingva = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string> => {
  try {
    const url = `${TRANSLATION_APIS.lingva}/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Lingva API failed');
    
    const data = await response.json();
    
    if (data.translation) {
      return data.translation;
    }
    
    throw new Error('Invalid response from Lingva');
  } catch (error) {
    console.warn('Lingva translation failed:', error);
    throw error;
  }
};

/**
 * Main translation function with fallback and caching
 */
export const translateText = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string> => {
  // Return original if same language or empty
  if (!text || targetLang === sourceLang) {
    return text;
  }

  // Check memory cache first
  const cacheKey = getCacheKey(text, targetLang);
  const cached = memoryCache[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.text;
  }

  try {
    // Try MyMemory first (most reliable free option)
    let translated: string;
    
    try {
      translated = await translateWithMyMemory(text, targetLang, sourceLang);
    } catch {
      // Fallback to Lingva
      translated = await translateWithLingva(text, targetLang, sourceLang);
    }

    // Cache the result
    memoryCache[cacheKey] = {
      text: translated,
      timestamp: Date.now(),
    };
    
    // Save to localStorage periodically
    saveCache(memoryCache);

    return translated;
  } catch (error) {
    console.error('All translation APIs failed:', error);
    // Return original text if all APIs fail
    return text;
  }
};

/**
 * Batch translate multiple texts
 */
export const translateBatch = async (
  texts: string[],
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string[]> => {
  // Process in parallel with a small delay to avoid rate limits
  const results: string[] = [];
  
  for (let i = 0; i < texts.length; i++) {
    const translated = await translateText(texts[i], targetLang, sourceLang);
    results.push(translated);
    
    // Small delay to avoid rate limits
    if (i < texts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
};

/**
 * Translate an object's values recursively
 */
export const translateObject = async <T extends Record<string, unknown>>(
  obj: T,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<T> => {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = await translateText(value, targetLang, sourceLang);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = await translateObject(value as Record<string, unknown>, targetLang, sourceLang);
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (item) => {
          if (typeof item === 'string') {
            return translateText(item, targetLang, sourceLang);
          }
          if (typeof item === 'object' && item !== null) {
            return translateObject(item as Record<string, unknown>, targetLang, sourceLang);
          }
          return item;
        })
      );
    } else {
      result[key] = value;
    }
  }
  
  return result as T;
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = (): void => {
  memoryCache = {};
  try {
    localStorage.removeItem(CACHE_PREFIX + CACHE_VERSION + 'data');
  } catch (e) {
    console.warn('Failed to clear translation cache:', e);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = (): { entries: number; size: string } => {
  const entries = Object.keys(memoryCache).length;
  const size = new Blob([JSON.stringify(memoryCache)]).size;
  return {
    entries,
    size: `${(size / 1024).toFixed(2)} KB`,
  };
};

export default {
  translateText,
  translateBatch,
  translateObject,
  clearTranslationCache,
  getCacheStats,
};

