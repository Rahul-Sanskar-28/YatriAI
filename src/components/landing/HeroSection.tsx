import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

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
      url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Rich Tribal Heritage',
      subtitle: 'Experience authentic cultural traditions'
    },
    {
      url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Wildlife Sanctuaries',
      subtitle: 'Explore diverse flora and fauna at Betla National Park'
    },
    {
      url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
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
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImages[currentSlide].url})` }}
          />
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search.placeholder')}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full md:w-48 pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </motion.form>

            {/* Quick Access Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { title: t('button.planTrip'), icon: '🗺️', color: 'from-blue-500 to-cyan-500' },
                { title: t('button.shopHandicrafts'), icon: '🏺', color: 'from-green-500 to-emerald-500' },
                { title: t('button.findGuides'), icon: '👨‍🏫', color: 'from-orange-500 to-red-500' }
              ].map((card, index) => (
                <button
                  key={index}
                  className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="font-medium">{card.title}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
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
        className="absolute bottom-8 right-8 text-white text-right z-20"
      >
        <h3 className="text-xl font-semibold mb-1">{heroImages[currentSlide].title}</h3>
        <p className="text-gray-300">{heroImages[currentSlide].subtitle}</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;