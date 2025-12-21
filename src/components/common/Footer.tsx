import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedGradientText } from '../magicui/AnimatedGradientText';
import { ShimmerButton } from '../magicui/ShimmerButton';
import { TramIcon, DurgaIcon, VictoriaMemorialIcon, BookIcon } from '../kolkata/KolkataIcons';

const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🪔' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-500' }
  ];

  const quickLinks = [
    { name: 'Heritage Sites', bengali: 'ঐতিহ্যবাহী স্থান' },
    { name: 'Durga Puja', bengali: 'দুর্গা পূজা' },
    { name: 'Artisan Marketplace', bengali: 'শিল্পী বাজার' },
    { name: 'Tram Routes', bengali: 'ট্রাম রুট' },
    { name: 'Food Guide', bengali: 'খাবার গাইড' },
    { name: 'Emergency', bengali: 'জরুরি' }
  ];

  const services = [
    { name: 'AI Itinerary Planner', icon: '🤖' },
    { name: 'Blockchain Verification', icon: '⛓️' },
    { name: 'Heritage Audio Tours', icon: '🎧' },
    { name: 'Pujo Route Optimizer', icon: '🪔' },
    { name: 'Artisan Connect', icon: '🎭' },
    { name: 'Adda AI Companion', icon: '☕' }
  ];

  const hackathonSponsors = [
    { name: 'Axicov', desc: 'AI Agents' },
    { name: 'n8n', desc: 'Automation' },
    { name: 'ElevenLabs', desc: 'Voice AI' },
    { name: 'ETHIndia', desc: 'Blockchain' },
    { name: 'Dodo', desc: 'Payments' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background decoration - Kolkata themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-kolkata-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-durga-500/5 rounded-full blur-3xl" />
        {/* Subtle tram tracks */}
        <div className="absolute inset-0 opacity-5 tram-tracks" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 font-heritage">
                <Sparkles className="w-6 h-6 text-kolkata-yellow" />
                Stay Connected with Kolkata
              </h3>
              <p className="text-gray-400">
                Get AI-powered heritage tips, Pujo updates, and exclusive offers 
                <span className="font-bengali text-kolkata-gold ml-2">আমাদের সাথে থাকুন</span>
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-gray-800 border border-kolkata-gold/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent"
              />
              <ShimmerButton 
                className="px-6 py-3"
                background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
              >
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
                className="w-12 h-12 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-xl flex items-center justify-center shadow-lg shadow-kolkata-yellow/30"
              >
                <TramIcon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <AnimatedGradientText className="text-xl font-bold font-heritage">
                  Kolkata Heritage
                </AnimatedGradientText>
                <span className="text-xs text-kolkata-gold/60 font-bengali">আমাদের কলকাতা</span>
              </div>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered companion for exploring the City of Joy. 
              Discover heritage walks, connect with artisans, and experience 
              the soul of Kolkata through technology.
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

            {/* Hackathon Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-kolkata-yellow/10 to-durga-500/10 border border-kolkata-yellow/20">
              <div className="text-center">
                <p className="text-xs text-kolkata-gold font-medium">Built for</p>
                <p className="text-white font-heritage font-semibold">Calcutta Hacks 2025</p>
                <p className="text-xs text-gray-400 mt-1">Tram Tracks to Tech Stacks</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 font-heritage">
              <span className="w-8 h-0.5 bg-gradient-to-r from-kolkata-yellow to-durga-500 rounded-full" />
              Explore
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-kolkata-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-kolkata-yellow" />
                    <span>{link.name}</span>
                    <span className="text-xs text-kolkata-gold/50 font-bengali">({link.bengali})</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 font-heritage">
              <span className="w-8 h-0.5 bg-gradient-to-r from-kolkata-yellow to-durga-500 rounded-full" />
              Features
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-kolkata-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-sm">{service.icon}</span>
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Powered By */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-3">Powered by</p>
              <div className="flex flex-wrap gap-2">
                {hackathonSponsors.map((sponsor, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 hover:text-kolkata-gold hover:border-kolkata-gold/30 border border-gray-700 transition-colors"
                  >
                    {sponsor.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Languages */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 font-heritage">
              <span className="w-8 h-0.5 bg-gradient-to-r from-kolkata-yellow to-durga-500 rounded-full" />
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'hello@kolkataheritage.in' },
                { icon: Phone, text: '+91 33-HERITAGE' },
                { icon: MapPin, text: 'Kolkata, West Bengal' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-kolkata-yellow/20 transition-colors">
                      <Icon className="w-4 h-4 text-kolkata-gold" />
                    </div>
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white font-heritage">Select Language</h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                      language === lang.code
                        ? 'bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white shadow-lg shadow-kolkata-yellow/30'
                        : 'text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className={lang.code === 'bn' ? 'font-bengali' : ''}>{lang.name}</span>
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
              © 2025 Kolkata Heritage. Made with 
              <Heart className="w-4 h-4 text-durga-500 fill-current animate-pulse" /> 
              <span>for the City of Joy</span>
              <span className="font-bengali text-kolkata-gold">আনন্দের শহর</span>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-kolkata-gold transition-colors text-sm"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Apex Circle Credit */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800/50">
            <p className="text-xs text-gray-500">
              A project for <span className="text-kolkata-gold">Calcutta Hacks 2025</span> by <span className="text-white">Apex Circle</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              December 27-28, 2025 • Kolkata, West Bengal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
