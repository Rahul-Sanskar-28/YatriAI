import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShimmerButton } from '../magicui/ShimmerButton';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { SparklesText } from '../magicui/SparklesText';
import { Particles } from '../magicui/Particles';
import { BlurFade } from '../magicui/BlurFade';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Majestic Waterfalls',
      subtitle: 'Discover the pristine beauty of Hundru Falls'
    },
    {
      url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Rich Tribal Heritage',
      subtitle: 'Experience authentic cultural traditions'
    },
    {
      url: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Wildlife Sanctuaries',
      subtitle: 'Explore diverse flora and fauna at Betla National Park'
    },
    {
      url: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Sacred Temples',
      subtitle: 'Find peace in ancient spiritual sites'
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
    console.log('Searching for:', searchQuery, 'Date:', selectedDate);
  };

  return (
    <section className="relative h-screen overflow-hidden">
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
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        
        {/* Animated Particles */}
        <Particles 
          className="absolute inset-0" 
          quantity={80} 
          color="#22c55e" 
          staticity={30}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <BlurFade delay={0.1} inView>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/90 text-sm font-medium">AI-Powered Tourism</span>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <SparklesText sparklesCount={8}>
                  {t('hero.title').split(' ').slice(0, 2).join(' ')}
                </SparklesText>
                <br />
                <AnimatedGradientText className="text-5xl md:text-7xl font-bold">
                  {t('hero.title').split(' ').slice(2).join(' ') || 'Jharkhand'}
                </AnimatedGradientText>
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </BlurFade>

            {/* Search Bar */}
            <BlurFade delay={0.4} inView>
              <form
                onSubmit={handleSearch}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-8 border border-white/20"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search.placeholder')}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full md:w-48 pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
                    />
                  </div>
                  <ShimmerButton type="submit">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </ShimmerButton>
                </div>
              </form>
            </BlurFade>

            {/* Quick Access Cards */}
            <BlurFade delay={0.5} inView>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: t('button.planTrip'), icon: '🗺️', color: 'from-blue-500 to-cyan-500', hoverColor: 'hover:from-blue-600 hover:to-cyan-600' },
                  { title: t('button.shopHandicrafts'), icon: '🏺', color: 'from-green-500 to-emerald-500', hoverColor: 'hover:from-green-600 hover:to-emerald-600' },
                  { title: t('button.findGuides'), icon: '👨‍🏫', color: 'from-orange-500 to-red-500', hoverColor: 'hover:from-orange-600 hover:to-red-600' }
                ].map((card, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative bg-gradient-to-r ${card.color} ${card.hoverColor} text-white p-6 rounded-xl transition-all duration-300 group overflow-hidden`}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    <div className="relative flex items-center space-x-3">
                      <span className="text-2xl float-animation">{card.icon}</span>
                      <span className="font-medium">{card.title}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                ? 'w-8 h-3 bg-gradient-to-r from-green-500 to-orange-500' 
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
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
          <h3 className="text-xl font-semibold mb-1">{heroImages[currentSlide].title}</h3>
          <p className="text-gray-300 text-sm">{heroImages[currentSlide].subtitle}</p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col items-center"
      >
        <span className="text-white/60 text-xs mb-2 rotate-90 origin-center">SCROLL</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
