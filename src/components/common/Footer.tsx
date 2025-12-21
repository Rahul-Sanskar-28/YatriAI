import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { ShimmerButton } from '../magicui/ShimmerButton';

const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'sa', name: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🏛️' },
    { code: 'mu', name: 'मुंडारी', flag: '🌿' },
    { code: 'ho', name: 'हो', flag: '🏔️' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-500' }
  ];

  const quickLinks = [
    'Destinations', 'Find Guides', 'Marketplace', 'Plan Your Trip', 'Safety Guidelines', 'Emergency Contacts'
  ];

  const services = [
    'AI Itinerary Planner', 'Blockchain Verification', 'Local Homestays', 'Cultural Tours', 'Adventure Activities', 'Handicraft Shopping'
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-400">Get AI-powered travel tips and exclusive offers delivered to your inbox</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <ShimmerButton className="px-6 py-3">
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-r from-green-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-xl">Y</span>
              </motion.div>
              <AnimatedGradientText className="text-2xl font-bold">
                YatriAI
              </AnimatedGradientText>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered companion for exploring the beautiful state of Jharkhand. 
              Discover authentic experiences, connect with local guides, and shop for 
              traditional handicrafts.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Languages */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 rounded-full" />
              Contact Us
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'support@yatriai.com' },
                { icon: Phone, text: '+91 1800-YATRI-AI' },
                { icon: MapPin, text: 'Ranchi, Jharkhand' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <Icon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">Select Language</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                      language === lang.code
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : 'text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm flex items-center gap-2"
            >
              © 2024 YatriAI. All rights reserved. Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> 
              for Jharkhand Tourism
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
