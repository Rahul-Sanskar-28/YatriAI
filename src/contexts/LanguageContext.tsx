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

const translations: Record<string, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.title': 'Discover Kolkata Heritage',
    'hero.subtitle': 'From tram tracks to tech stacks - Experience where tradition meets transformation',
    'hero.tagline': 'City of Joy',
    'hero.bengaliTagline': 'আনন্দের শহর',
    
    // Navigation
    'nav.home': 'Home',
    'nav.heritage': 'Heritage',
    'nav.pujo': 'Pujo',
    'nav.destinations': 'Destinations',
    'nav.guides': 'Guides',
    'nav.marketplace': 'Artisans',
    'nav.about': 'About',
    
    // Search
    'search.placeholder': 'Search Victoria Memorial, Howrah Bridge, College Street...',
    'search.explore': 'Explore',
    
    // Buttons & CTAs
    'button.planTrip': 'Plan Heritage Walk',
    'button.shopHandicrafts': 'Shop Artisan Crafts',
    'button.findGuides': 'Find Local Guides',
    'button.login': 'Login',
    'button.signup': 'Sign Up',
    'button.explore': 'Explore',
    'button.heritageWalks': 'Heritage Walks',
    'button.pujoExperience': 'Pujo Experience',
    'button.artisanCrafts': 'Artisan Crafts',
    'button.startJourney': 'Start Your Kolkata Journey',
    'button.viewDetails': 'View Details',
    'button.bookNow': 'Book Now',
    'button.addToCart': 'Add to Cart',
    'button.checkout': 'Checkout',
    
    // Categories
    'category.heritage': 'Heritage Sites',
    'category.temples': 'Temples & Ghats',
    'category.culture': 'Art & Culture',
    'category.food': 'Iconic Eateries',
    'category.markets': 'Historic Markets',
    'category.tram': 'Tram Heritage',
    'category.pujo': 'Pujo Pandals',
    'category.literature': 'Literary Kolkata',
    
    // Features
    'feature.tramTracker': 'Tram Heritage Tracker',
    'feature.pujoPlanner': 'Pujo Route Planner',
    'feature.heritageWalk': 'Heritage Walk Audio',
    'feature.artisanMarket': 'Verified Artisan Market',
    'feature.literaryKolkata': 'Literary Kolkata',
    'feature.addaAI': 'Adda AI Companion',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.bookings': 'My Bookings',
    'dashboard.itinerary': 'Heritage Planner',
    'dashboard.marketplace': 'Artisan Marketplace',
    'dashboard.guides': 'Find Guides',
    'dashboard.profile': 'Profile',
    'dashboard.heritageWalks': 'Heritage Walks',
    'dashboard.pujoRoutes': 'Pujo Routes',
    'dashboard.audioGuides': 'Audio Guides',
    
    // Testimonials
    'testimonials.title': 'What Explorers Say',
    'testimonials.subtitle': 'Real experiences from Kolkata heritage explorers',
    
    // Footer
    'footer.tagline': 'Your AI-powered companion for exploring the City of Joy',
    'footer.explore': 'Explore',
    'footer.features': 'Features',
    'footer.contact': 'Contact',
    'footer.language': 'Select Language',
    'footer.newsletter': 'Stay Connected with Kolkata',
    'footer.copyright': '© 2025 Kolkata Heritage. Made with ❤️ for the City of Joy',
    
    // Misc
    'misc.loading': 'Loading...',
    'misc.error': 'Something went wrong',
    'misc.noResults': 'No results found',
    'misc.verified': 'Verified',
    'misc.rating': 'Rating',
    'misc.reviews': 'Reviews',
    'misc.pricePerDay': 'per day',
    'misc.blockchainVerified': 'Blockchain Verified',
    
    // Hackathon
    'hackathon.name': 'Calcutta Hacks 2025',
    'hackathon.tagline': 'Tram Tracks to Tech Stacks',
    'hackathon.date': 'December 27-28, 2025',
  },
  
  hi: {
    // Hero Section
    'hero.title': 'कोलकाता विरासत की खोज करें',
    'hero.subtitle': 'ट्राम ट्रैक से टेक स्टैक तक - जहाँ परंपरा परिवर्तन से मिलती है',
    'hero.tagline': 'आनंद का शहर',
    'hero.bengaliTagline': 'আনন্দের শহর',
    
    // Navigation
    'nav.home': 'होम',
    'nav.heritage': 'विरासत',
    'nav.pujo': 'पूजा',
    'nav.destinations': 'गंतव्य',
    'nav.guides': 'गाइड',
    'nav.marketplace': 'शिल्पी',
    'nav.about': 'के बारे में',
    
    // Search
    'search.placeholder': 'विक्टोरिया मेमोरियल, हावड़ा ब्रिज, कॉलेज स्ट्रीट खोजें...',
    'search.explore': 'खोजें',
    
    // Buttons & CTAs
    'button.planTrip': 'विरासत वॉक की योजना बनाएं',
    'button.shopHandicrafts': 'शिल्प खरीदें',
    'button.findGuides': 'गाइड खोजें',
    'button.login': 'लॉगिन',
    'button.signup': 'साइन अप',
    'button.explore': 'खोजें',
    'button.heritageWalks': 'विरासत वॉक',
    'button.pujoExperience': 'पूजा अनुभव',
    'button.artisanCrafts': 'शिल्पी शिल्प',
    'button.startJourney': 'अपनी कोलकाता यात्रा शुरू करें',
    'button.viewDetails': 'विवरण देखें',
    'button.bookNow': 'अभी बुक करें',
    'button.addToCart': 'कार्ट में जोड़ें',
    'button.checkout': 'चेकआउट',
    
    // Categories
    'category.heritage': 'विरासत स्थल',
    'category.temples': 'मंदिर और घाट',
    'category.culture': 'कला और संस्कृति',
    'category.food': 'प्रसिद्ध खानपान',
    'category.markets': 'ऐतिहासिक बाज़ार',
    'category.tram': 'ट्राम विरासत',
    'category.pujo': 'पूजा पंडाल',
    'category.literature': 'साहित्यिक कोलकाता',
    
    // Features
    'feature.tramTracker': 'ट्राम विरासत ट्रैकर',
    'feature.pujoPlanner': 'पूजा मार्ग योजनाकार',
    'feature.heritageWalk': 'विरासत वॉक ऑडियो',
    'feature.artisanMarket': 'सत्यापित शिल्पी बाज़ार',
    'feature.literaryKolkata': 'साहित्यिक कोलकाता',
    'feature.addaAI': 'अड्डा AI साथी',
    
    // Dashboard
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.bookings': 'मेरी बुकिंग',
    'dashboard.itinerary': 'विरासत योजनाकार',
    'dashboard.marketplace': 'शिल्पी बाज़ार',
    'dashboard.guides': 'गाइड खोजें',
    'dashboard.profile': 'प्रोफ़ाइल',
    'dashboard.heritageWalks': 'विरासत वॉक',
    'dashboard.pujoRoutes': 'पूजा मार्ग',
    'dashboard.audioGuides': 'ऑडियो गाइड',
    
    // Testimonials
    'testimonials.title': 'अन्वेषक क्या कहते हैं',
    'testimonials.subtitle': 'कोलकाता विरासत अन्वेषकों के वास्तविक अनुभव',
    
    // Footer
    'footer.tagline': 'आनंद के शहर की खोज के लिए आपका AI-संचालित साथी',
    'footer.explore': 'खोजें',
    'footer.features': 'विशेषताएं',
    'footer.contact': 'संपर्क करें',
    'footer.language': 'भाषा चुनें',
    'footer.newsletter': 'कोलकाता से जुड़े रहें',
    'footer.copyright': '© 2025 कोलकाता विरासत। आनंद के शहर के लिए ❤️ से बनाया गया',
    
    // Misc
    'misc.loading': 'लोड हो रहा है...',
    'misc.error': 'कुछ गलत हो गया',
    'misc.noResults': 'कोई परिणाम नहीं मिला',
    'misc.verified': 'सत्यापित',
    'misc.rating': 'रेटिंग',
    'misc.reviews': 'समीक्षाएं',
    'misc.pricePerDay': 'प्रति दिन',
    'misc.blockchainVerified': 'ब्लॉकचेन सत्यापित',
    
    // Hackathon
    'hackathon.name': 'कैलकटा हैक्स 2025',
    'hackathon.tagline': 'ट्राम ट्रैक से टेक स्टैक',
    'hackathon.date': '27-28 दिसंबर, 2025',
  },
  
  bn: {
    // Hero Section
    'hero.title': 'কলকাতা ঐতিহ্য আবিষ্কার করুন',
    'hero.subtitle': 'ট্রাম ট্র্যাক থেকে টেক স্ট্যাক - যেখানে ঐতিহ্য রূপান্তরের সাথে মিলিত হয়',
    'hero.tagline': 'আনন্দের শহর',
    'hero.bengaliTagline': 'আনন্দের শহর',
    
    // Navigation
    'nav.home': 'হোম',
    'nav.heritage': 'ঐতিহ্য',
    'nav.pujo': 'পুজো',
    'nav.destinations': 'গন্তব্য',
    'nav.guides': 'গাইড',
    'nav.marketplace': 'শিল্পী',
    'nav.about': 'সম্পর্কে',
    
    // Search
    'search.placeholder': 'ভিক্টোরিয়া মেমোরিয়াল, হাওড়া ব্রিজ, কলেজ স্ট্রীট খুঁজুন...',
    'search.explore': 'অন্বেষণ করুন',
    
    // Buttons & CTAs
    'button.planTrip': 'ঐতিহ্য হাঁটা পরিকল্পনা',
    'button.shopHandicrafts': 'শিল্প কিনুন',
    'button.findGuides': 'গাইড খুঁজুন',
    'button.login': 'লগইন',
    'button.signup': 'সাইন আপ',
    'button.explore': 'অন্বেষণ',
    'button.heritageWalks': 'ঐতিহ্য পথচলা',
    'button.pujoExperience': 'পুজো অভিজ্ঞতা',
    'button.artisanCrafts': 'শিল্পী শিল্প',
    'button.startJourney': 'আপনার কলকাতা যাত্রা শুরু করুন',
    'button.viewDetails': 'বিস্তারিত দেখুন',
    'button.bookNow': 'এখনই বুক করুন',
    'button.addToCart': 'কার্টে যোগ করুন',
    'button.checkout': 'চেকআউট',
    
    // Categories
    'category.heritage': 'ঐতিহ্যবাহী স্থান',
    'category.temples': 'মন্দির ও ঘাট',
    'category.culture': 'শিল্প ও সংস্কৃতি',
    'category.food': 'বিখ্যাত খাবারের দোকান',
    'category.markets': 'ঐতিহাসিক বাজার',
    'category.tram': 'ট্রাম ঐতিহ্য',
    'category.pujo': 'পুজো প্যান্ডেল',
    'category.literature': 'সাহিত্যিক কলকাতা',
    
    // Features
    'feature.tramTracker': 'ট্রাম ঐতিহ্য ট্র্যাকার',
    'feature.pujoPlanner': 'পুজো রুট প্ল্যানার',
    'feature.heritageWalk': 'ঐতিহ্য পথচলা অডিও',
    'feature.artisanMarket': 'যাচাইকৃত শিল্পী বাজার',
    'feature.literaryKolkata': 'সাহিত্যিক কলকাতা',
    'feature.addaAI': 'আড্ডা AI সঙ্গী',
    
    // Dashboard
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.bookings': 'আমার বুকিং',
    'dashboard.itinerary': 'ঐতিহ্য পরিকল্পনাকারী',
    'dashboard.marketplace': 'শিল্পী মার্কেটপ্লেস',
    'dashboard.guides': 'গাইড খুঁজুন',
    'dashboard.profile': 'প্রোফাইল',
    'dashboard.heritageWalks': 'ঐতিহ্য পথচলা',
    'dashboard.pujoRoutes': 'পুজো রুট',
    'dashboard.audioGuides': 'অডিও গাইড',
    
    // Testimonials
    'testimonials.title': 'অন্বেষণকারীরা কী বলেন',
    'testimonials.subtitle': 'কলকাতা ঐতিহ্য অন্বেষণকারীদের প্রকৃত অভিজ্ঞতা',
    
    // Footer
    'footer.tagline': 'আনন্দের শহর অন্বেষণের জন্য আপনার AI-চালিত সঙ্গী',
    'footer.explore': 'অন্বেষণ',
    'footer.features': 'বৈশিষ্ট্য',
    'footer.contact': 'যোগাযোগ',
    'footer.language': 'ভাষা নির্বাচন করুন',
    'footer.newsletter': 'কলকাতার সাথে সংযুক্ত থাকুন',
    'footer.copyright': '© ২০২৫ কলকাতা হেরিটেজ। আনন্দের শহরের জন্য ভালোবাসায় তৈরি',
    
    // Misc
    'misc.loading': 'লোড হচ্ছে...',
    'misc.error': 'কিছু ভুল হয়েছে',
    'misc.noResults': 'কোন ফলাফল পাওয়া যায়নি',
    'misc.verified': 'যাচাইকৃত',
    'misc.rating': 'রেটিং',
    'misc.reviews': 'পর্যালোচনা',
    'misc.pricePerDay': 'প্রতিদিন',
    'misc.blockchainVerified': 'ব্লকচেইন যাচাইকৃত',
    
    // Hackathon
    'hackathon.name': 'ক্যালকাটা হ্যাকস ২০২৫',
    'hackathon.tagline': 'ট্রাম ট্র্যাক থেকে টেক স্ট্যাক',
    'hackathon.date': '২৭-২৮ ডিসেম্বর, ২০২৫',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
