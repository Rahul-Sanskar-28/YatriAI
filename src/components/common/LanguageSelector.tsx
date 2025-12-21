import React, { useState, useRef, useEffect } from 'react';
import { Globe, Search, Check, ChevronDown, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCurrentLanguage, isRTL } from '../../lib/i18n';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'full';
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'header',
  showLabel = false 
}) => {
  const { 
    t, 
    setLanguage, 
    languages, 
    isTranslating, 
    translationProgress 
  } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentLanguage = getCurrentLanguage();

  // Filter languages based on search query
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group languages by first letter for better navigation
  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    const firstLetter = lang.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(lang);
    return acc;
  }, {} as Record<string, typeof languages>);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    document.documentElement.dir = isRTL(langCode) ? 'rtl' : 'ltr';
    setIsOpen(false);
    setSearchQuery('');
  };

  // Translation progress overlay
  const TranslationOverlay = () => (
    <AnimatePresence>
      {isTranslating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl max-w-md mx-4"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <Globe className="w-16 h-16 text-kolkata-yellow animate-pulse" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-kolkata-yellow/30 border-t-kolkata-yellow"></div>
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Translating Content
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Please wait while we translate the interface to your selected language...
              </p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${translationProgress}%` }}
                  className="h-full bg-gradient-to-r from-kolkata-yellow via-kolkata-terracotta to-durga-500 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(translationProgress)}% complete
              </p>
              
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
                Translations are cached for faster loading next time
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Compact header variant
  if (variant === 'header') {
    return (
      <>
        <TranslationOverlay />
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            disabled={isTranslating}
            className={`flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors rounded-lg hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10 ${
              isTranslating ? 'opacity-50 cursor-wait' : ''
            }`}
            title={t('common.selectLanguage')}
          >
            {isTranslating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Globe className="w-5 h-5" />
            )}
            {showLabel && (
              <span className="text-sm font-medium hidden md:inline">{currentLanguage.nativeName}</span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-kolkata-gold/20 dark:border-gray-700 overflow-hidden z-50"
              >
                {/* Search Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-kolkata-yellow/10 to-durga-500/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('common.searchLanguage') || 'Search languages...'}
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-sm focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {filteredLanguages.length} languages available
                  </p>
                </div>

                {/* Languages List */}
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {Object.keys(groupedLanguages).sort().map(letter => (
                    <div key={letter}>
                      <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 sticky top-0">
                        {letter}
                      </div>
                      {groupedLanguages[letter].map((lang) => (
                        <motion.button
                          key={lang.code}
                          whileHover={{ backgroundColor: 'rgba(255, 184, 0, 0.1)' }}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                            currentLanguage.code === lang.code
                              ? 'bg-kolkata-yellow/20 dark:bg-kolkata-gold/20'
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lang.flag}</span>
                            <div>
                              <p className={`text-sm font-medium ${
                                currentLanguage.code === lang.code
                                  ? 'text-kolkata-terracotta dark:text-kolkata-gold'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {lang.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {lang.nativeName}
                              </p>
                            </div>
                          </div>
                          {currentLanguage.code === lang.code && (
                            <Check className="w-4 h-4 text-kolkata-yellow" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  ))}

                  {filteredLanguages.length === 0 && (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No languages found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>

                {/* Current Selection Footer */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Current: <span className="font-medium text-kolkata-terracotta dark:text-kolkata-gold">{currentLanguage.nativeName}</span></span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Dynamic translation
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  // Footer variant - simplified buttons
  if (variant === 'footer') {
    const popularLanguages = languages.slice(0, 5);
    
    return (
      <>
        <TranslationOverlay />
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white">{t('common.selectLanguage') || 'Select Language'}</h4>
          <div className="flex flex-wrap gap-2">
            {popularLanguages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={isTranslating}
                className={`text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentLanguage.code === lang.code
                    ? 'bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white shadow-lg shadow-kolkata-yellow/30'
                    : 'text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700'
                } ${isTranslating ? 'opacity-50 cursor-wait' : ''}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="text-xs px-3 py-2 rounded-lg text-kolkata-gold hover:text-white bg-gray-800 hover:bg-gray-700 flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              More...
            </motion.button>
          </div>

          {/* Full modal for more languages */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-kolkata-yellow/20 to-durga-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-kolkata-yellow" />
                        {t('common.selectLanguage') || 'Select Language'}
                      </h3>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('common.searchLanguage') || 'Search languages...'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-sm focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Languages Grid */}
                  <div className="max-h-96 overflow-y-auto p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {filteredLanguages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleLanguageChange(lang.code)}
                          disabled={isTranslating}
                          className={`p-3 rounded-xl text-left transition-all flex items-center gap-2 ${
                            currentLanguage.code === lang.code
                              ? 'bg-gradient-to-r from-kolkata-yellow/20 to-durga-500/20 border-2 border-kolkata-yellow'
                              : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-kolkata-yellow/50'
                          } ${isTranslating ? 'opacity-50 cursor-wait' : ''}`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {lang.nativeName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {lang.name}
                            </p>
                          </div>
                          {currentLanguage.code === lang.code && (
                            <Check className="w-4 h-4 text-kolkata-yellow ml-auto flex-shrink-0" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  // Full variant - for settings page
  return (
    <>
      <TranslationOverlay />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-kolkata-yellow" />
            {t('common.selectLanguage') || 'Select Language'}
          </h3>
          <span className="text-sm text-gray-500">
            Current: <span className="font-medium text-kolkata-terracotta">{currentLanguage.nativeName}</span>
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.searchLanguage') || 'Search languages...'}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent"
          />
        </div>

        {/* Grid of languages */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
          {filteredLanguages.map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isTranslating}
              className={`p-4 rounded-xl text-left transition-all ${
                currentLanguage.code === lang.code
                  ? 'bg-gradient-to-r from-kolkata-yellow/20 to-durga-500/20 border-2 border-kolkata-yellow'
                  : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-kolkata-yellow/50'
              } ${isTranslating ? 'opacity-50 cursor-wait' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{lang.nativeName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lang.name}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;
