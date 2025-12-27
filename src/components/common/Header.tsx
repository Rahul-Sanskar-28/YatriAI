import React, { useState } from 'react';
import { Menu, X, Moon, Sun, User, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AuthModal from './AuthModal';
import BrowserOnlyTranslate from './BrowserOnlyTranslate';
import { ShimmerButton } from '../magicui/ShimmerButton';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { TramIcon } from '../kolkata/KolkataIcons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  // Use useTranslation directly for reliable translation updates
  const { t } = useTranslation('translation');
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage } = useLanguage(); // Just for language state
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', href: '#hero', labelKey: 'nav.home', sectionId: 'hero' },
    { key: 'heritage', href: '#heritage', labelKey: 'nav.heritage', sectionId: 'heritage', dashboardTab: 'heritage' },
    { key: 'pujo', href: '#pujo', labelKey: 'nav.pujo', sectionId: 'pujo', dashboardTab: 'explore' },
    { key: 'marketplace', href: '#artisans', labelKey: 'nav.artisans', sectionId: 'artisans', dashboardTab: 'artisans' },
    { key: 'about', href: '#footer', labelKey: 'nav.about', sectionId: 'footer' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMenuOpen(false);
    
    // If logged in and has dashboard tab, navigate to dashboard
    if (isAuthenticated && item.dashboardTab) {
      navigate(`/tourist-dashboard?tab=${item.dashboardTab}`);
      return;
    }
    
    // Scroll to section on landing page
    const element = document.getElementById(item.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="bg-kolkata-cream/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors duration-300 border-b border-kolkata-gold/20 dark:border-kolkata-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Kolkata Heritage */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-kolkata-yellow rounded-xl flex items-center justify-center shadow-lg shadow-kolkata-yellow/40 border-2 border-kolkata-gold/30"
              >
                <TramIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-kolkata-terracotta dark:text-kolkata-gold font-heritage">
                    {t('brand.name').split(' ')[0] || 'Kolkata'}
                  </span>
                  <span className="text-xl font-bold text-kolkata-terracotta dark:text-kolkata-gold font-heritage">{t('brand.name').split(' ')[1] || 'Heritage'}</span>
                </div>
                <span className="text-xs text-kolkata-sepia dark:text-kolkata-gold/60 -mt-1">{t('brand.tagline')}</span>
              </div>
              <Sparkles className="w-4 h-4 text-kolkata-yellow animate-pulse" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ y: -2 }}
                  className="relative px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors font-medium text-sm group"
                >
                  <span>{t(item.labelKey)}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-kolkata-yellow group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </motion.button>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Browser Translation Instructions */}
              <BrowserOnlyTranslate variant="header" />
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors rounded-lg hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors p-1.5 rounded-xl hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-xl object-cover border-2 border-kolkata-yellow"
                    />
                    <span className="hidden md:block font-medium text-sm">{user?.name}</span>
                  </motion.button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-kolkata-cream dark:bg-gray-800 rounded-xl shadow-xl border border-kolkata-gold/20 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-kolkata-gold/20 dark:border-gray-700 bg-kolkata-yellow/10 dark:bg-kolkata-gold/10">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <motion.button
                          whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('auth.logout')}</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <ShimmerButton
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2 text-sm"
                  background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
                >
                  <User className="w-4 h-4" />
                  <span>{t('auth.login')}</span>
                </ShimmerButton>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <nav className="py-4 border-t border-kolkata-gold/20 dark:border-gray-700 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.key}
                      onClick={() => handleNavClick(item)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10 rounded-xl transition-all font-medium"
                    >
                      <span>{t(item.labelKey)}</span>
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
