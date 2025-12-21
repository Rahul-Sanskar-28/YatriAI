import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  SUPPORTED_LANGUAGES, 
  isRTL, 
  loadTranslationsForLanguage, 
  addDynamicTranslations 
} from '../lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
  languages: typeof SUPPORTED_LANGUAGES;
  isRTL: boolean;
  isTranslating: boolean;
  translationProgress: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { t: i18nT, i18n } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  
  const language = i18n.language || 'en';
  
  // Load translations dynamically when language changes
  const loadLanguage = useCallback(async (lang: string) => {
    if (lang === 'en') {
      // English is already loaded
      i18n.changeLanguage(lang);
      return;
    }
    
    // Check if translations are already loaded
    const existingResources = i18n.getResourceBundle(lang, 'translation');
    if (existingResources && Object.keys(existingResources).length > 0) {
      i18n.changeLanguage(lang);
      return;
    }
    
    // Load translations dynamically
    setIsTranslating(true);
    setTranslationProgress(0);
    
    try {
      const translations = await loadTranslationsForLanguage(lang, (progress) => {
        setTranslationProgress(progress);
      });
      
      // Add translations to i18n
      addDynamicTranslations(lang, translations);
      
      // Switch to the new language
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Failed to load translations:', error);
      // Stay on current language if translation fails
    } finally {
      setIsTranslating(false);
      setTranslationProgress(100);
    }
  }, [i18n]);
  
  const setLanguage = useCallback((lang: string) => {
    loadLanguage(lang);
  }, [loadLanguage]);

  // Wrapper around i18n t function to handle nested keys
  const t = useCallback((key: string, options?: Record<string, unknown>): string => {
    // Try the direct key first
    const result = i18nT(key, options);
    if (result !== key) return result;
    
    // If not found, try with common/nav/etc. prefixes for backward compatibility
    const prefixes = ['common', 'nav', 'hero', 'features', 'auth', 'dashboard', 'footer'];
    for (const prefix of prefixes) {
      const prefixedKey = `${prefix}.${key}`;
      const prefixedResult = i18nT(prefixedKey, options);
      if (prefixedResult !== prefixedKey) return prefixedResult;
    }
    
    // Return the original key if nothing found
    return result;
  }, [i18nT]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t,
      languages: SUPPORTED_LANGUAGES,
      isRTL: isRTL(language),
      isTranslating,
      translationProgress,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
