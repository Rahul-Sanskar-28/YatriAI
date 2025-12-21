import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    'hero.title': 'Explore Jharkhand Like Never Before',
    'hero.subtitle': 'Your Personalized AI Travel Companion',
    'nav.home': 'Home',
    'nav.destinations': 'Destinations',
    'nav.guides': 'Guides',
    'nav.marketplace': 'Marketplace',
    'nav.about': 'About',
    'search.placeholder': 'Where do you want to go?',
    'button.planTrip': 'Plan Trip',
    'button.shopHandicrafts': 'Shop Handicrafts',
    'button.findGuides': 'Find Guides',
    'button.login': 'Login',
    'button.signup': 'Sign Up',
    'dashboard.welcome': 'Welcome back',
    'dashboard.bookings': 'My Bookings',
    'dashboard.itinerary': 'AI Itinerary Planner',
    'dashboard.marketplace': 'Marketplace',
    'dashboard.guides': 'Find Guides',
    'dashboard.profile': 'Profile'
  },
  hi: {
    'hero.title': 'झारखंड को पहले से कहीं बेहतर तरीके से देखें',
    'hero.subtitle': 'आपका व्यक्तिगत AI यात्रा साथी',
    'nav.home': 'होम',
    'nav.destinations': 'गंतव्य',
    'nav.guides': 'गाइड',
    'nav.marketplace': 'बाज़ार',
    'nav.about': 'के बारे में',
    'search.placeholder': 'आप कहाँ जाना चाहते हैं?',
    'button.planTrip': 'यात्रा की योजना बनाएं',
    'button.shopHandicrafts': 'हस्तशिल्प खरीदें',
    'button.findGuides': 'गाइड खोजें',
    'button.login': 'लॉगिन',
    'button.signup': 'साइन अप',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.bookings': 'मेरी बुकिंग',
    'dashboard.itinerary': 'AI यात्रा योजनाकार',
    'dashboard.marketplace': 'बाज़ार',
    'dashboard.guides': 'गाइड खोजें',
    'dashboard.profile': 'प्रोफ़ाइल'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};