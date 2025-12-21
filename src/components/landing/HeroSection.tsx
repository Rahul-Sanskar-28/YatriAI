import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { ShimmerButton } from '../magicui/ShimmerButton';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { SparklesText } from '../magicui/SparklesText';
import { Particles } from '../magicui/Particles';
import { BlurFade } from '../magicui/BlurFade';

// Kolkata Heritage Icons
const TramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 16.94V8.5C19 5.79 16.76 3.5 14 3.5H10C7.24 3.5 5 5.79 5 8.5V16.94C5 17.28 5.03 17.62 5.09 17.94L3 20.5V21H21V20.5L18.91 17.94C18.97 17.62 19 17.28 19 16.94ZM8.5 18C7.67 18 7 17.33 7 16.5S7.67 15 8.5 15 10 15.67 10 16.5 9.33 18 8.5 18ZM9 11V7H15V11H9ZM15.5 18C14.67 18 14 17.33 14 16.5S14.67 15 15.5 15 17 15.67 17 16.5 16.33 18 15.5 18Z"/>
  </svg>
);

const DurgaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2L9 6H6L3 12L6 18H18L21 12L18 6H15L12 2ZM12 8C13.1 8 14 8.9 14 10S13.1 12 12 12 10 11.1 10 10 10.9 8 12 8ZM12 14C14.33 14 19 15.17 19 17.5V19H5V17.5C5 15.17 9.67 14 12 14Z"/>
  </svg>
);

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Kolkata Heritage Images
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1920&h=1080&q=80',
      titleKey: 'landmarks.victoriaMemorial',
      subtitle: 'The crown jewel of Kolkata\'s heritage'
    },
    {
      url: 'https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?auto=format&fit=crop&w=1920&h=1080&q=80',
      titleKey: 'landmarks.howrahBridge',
      subtitle: 'The iconic gateway to the City of Joy'
    },
    {
      url: 'https://images.unsplash.com/photo-1599030641314-e7f9e2f5e8e1?auto=format&fit=crop&w=1920&h=1080&q=80',
      titleKey: 'landmarks.kumartuli',
      subtitle: 'Where gods are crafted with devotion'
    },
    {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&h=1080&q=80',
      titleKey: 'landmarks.durgaPuja',
      subtitle: 'Experience the grandest celebration of Bengal'
    },
    {
      url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&h=1080&q=80',
      titleKey: 'landmarks.princepGhat',
      subtitle: 'Where heritage meets the Hooghly'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      // Navigate to dashboard with search query
      navigate(`/tourist-dashboard?tab=explore&search=${encodeURIComponent(searchQuery)}&date=${selectedDate}`);
    } else {
      // Scroll to features section to show what's available
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Show login prompt after scrolling
      setTimeout(() => setShowLoginPrompt(true), 1000);
    }
  };

  const handleQuickAccess = (dashboardTab: string) => {
    if (isAuthenticated) {
      navigate(`/tourist-dashboard?tab=${dashboardTab}`);
    } else {
      // Scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImages[currentSlide].url})` }}
          />
        </AnimatePresence>
        
        {/* Gradient Overlays - Kolkata Colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-kolkata-maroon/40 via-transparent to-black/30" />
        
        {/* Animated Particles - Kolkata Yellow */}
        <Particles 
          className="absolute inset-0" 
          quantity={80} 
          color="#FFB800" 
          staticity={30}
        />

        {/* Tram Animation - Bottom */}
        <motion.div
          animate={{ x: ['100vw', '-100px'] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 z-10 opacity-60"
        >
          <div className="flex items-center gap-1 text-kolkata-yellow">
            <TramIcon />
            <div className="w-32 h-1 bg-gradient-to-r from-kolkata-yellow to-transparent rounded" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <BlurFade delay={0.1} inView>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-kolkata-yellow/20 backdrop-blur-sm border border-kolkata-yellow/40">
                  <Sparkles className="w-4 h-4 text-kolkata-yellow" />
                  <span className="text-white/90 text-sm font-medium">{t('hero.badge')}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-durga-500/20 backdrop-blur-sm border border-durga-500/40">
                  <span className="text-2xl animate-pulse">🪔</span>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight font-heritage">
                <SparklesText sparklesCount={8} colors={{ first: '#FFB800', second: '#E23D28' }}>
                  {t('hero.title')}
                </SparklesText>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <AnimatedGradientText className="text-3xl md:text-5xl font-bold">
                  {t('hero.subtitle')}
                </AnimatedGradientText>
              </h2>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                <Trans 
                  i18nKey="hero.description"
                  components={{
                    trams: <span className="text-kolkata-yellow font-semibold" />,
                    tea: <span className="text-heritage-400 font-semibold" />,
                    tagore: <span className="text-durga-400 font-semibold" />
                  }}
                  defaults="From the legacy of <trams>trams</trams>, <tea>tea</tea>, and <tagore>Tagore</tagore> — Experience where tradition meets transformation."
                />
              </p>
            </BlurFade>

            {/* Search Bar */}
            <BlurFade delay={0.4} inView>
              <form
                onSubmit={handleSearch}
                className="bg-kolkata-cream/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-8 border border-kolkata-gold/30"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-kolkata-sepia w-5 h-5 group-focus-within:text-kolkata-yellow transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('hero.searchPlaceholder')}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-kolkata-sepia/30 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent text-gray-900 dark:text-white placeholder-kolkata-sepia/60 transition-all font-sans"
                    />
                  </div>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-kolkata-sepia w-5 h-5 group-focus-within:text-kolkata-yellow transition-colors" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full md:w-48 pl-12 pr-4 py-4 rounded-xl border border-kolkata-sepia/30 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                  <ShimmerButton 
                    type="submit"
                    background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
                  >
                    <Search className="w-5 h-5" />
                    <span>{t('common.explore')}</span>
                  </ShimmerButton>
                </div>
              </form>
            </BlurFade>

            {/* Quick Access Cards - Kolkata Themed */}
            <BlurFade delay={0.5} inView>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    titleKey: 'hero.heritageWalks', 
                    icon: '🏛️', 
                    color: 'from-kolkata-yellow to-kolkata-gold', 
                    hoverColor: 'hover:from-kolkata-gold hover:to-kolkata-yellow',
                    shadow: 'shadow-tram',
                    dashboardTab: 'heritage'
                  },
                  { 
                    titleKey: 'hero.pujoExperience', 
                    icon: '🪔', 
                    color: 'from-durga-500 to-kolkata-vermillion', 
                    hoverColor: 'hover:from-kolkata-vermillion hover:to-durga-500',
                    shadow: 'shadow-terracotta',
                    dashboardTab: 'pandal-donations'
                  },
                  { 
                    titleKey: 'hero.artisanCrafts', 
                    icon: '🎭', 
                    color: 'from-kolkata-terracotta to-kolkata-maroon', 
                    hoverColor: 'hover:from-kolkata-maroon hover:to-kolkata-terracotta',
                    shadow: 'shadow-heritage',
                    dashboardTab: 'artisans'
                  }
                ].map((card, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAccess(card.dashboardTab)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative bg-gradient-to-r ${card.color} ${card.hoverColor} text-white p-6 rounded-xl transition-all duration-300 group overflow-hidden ${card.shadow}`}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    <div className="relative flex flex-col items-start gap-2">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-3xl float-animation">{card.icon}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform opacity-70" />
                      </div>
                      <span className="font-semibold text-lg">{t(card.titleKey)}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-3 bg-gradient-to-r from-kolkata-yellow to-durga-500' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide Info */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 right-8 text-white text-right z-20 hidden md:block"
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-kolkata-yellow/30">
          <h3 className="text-xl font-semibold mb-1 font-heritage">{t(heroImages[currentSlide].titleKey)}</h3>
          <p className="text-gray-300 text-sm">{heroImages[currentSlide].subtitle}</p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col items-center"
      >
        <span className="text-kolkata-yellow/60 text-xs mb-2 rotate-90 origin-center tracking-widest">SCROLL</span>
        <div className="w-6 h-10 border-2 border-kolkata-yellow/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-kolkata-yellow rounded-full"
          />
        </div>
      </motion.div>

      {/* Hackathon Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-24 right-8 z-20 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-kolkata-yellow/20 to-durga-500/20 backdrop-blur-md rounded-xl p-4 border border-kolkata-yellow/30">
          <div className="text-center">
            <p className="text-xs text-kolkata-yellow font-medium">Calcutta Hacks 2025</p>
            <p className="text-white font-heritage text-lg">Tram Tracks to</p>
            <p className="text-kolkata-yellow font-heritage text-lg">Tech Stacks</p>
            <p className="text-xs text-white/60 mt-1">Dec 27-28, 2025</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
