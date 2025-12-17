import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'sa', name: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'mu', name: 'मुंडारी' },
    { code: 'ho', name: 'हो' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
                YatriAI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your AI-powered companion for exploring the beautiful state of Jharkhand. 
              Discover authentic experiences, connect with local guides, and shop for 
              traditional handicrafts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Find Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Plan Your Trip</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Safety Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Emergency Contacts</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">AI Itinerary Planner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Blockchain Verification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Local Homestays</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Cultural Tours</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Adventure Activities</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Handicraft Shopping</a></li>
            </ul>
          </div>

          {/* Contact & Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">support@yatriai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">+91 1800-YATRI-AI</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">Ranchi, Jharkhand</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Select Language</h4>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      language === lang.code
                        ? 'bg-green-600 text-white'
                        : 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 YatriAI. All rights reserved. Made with ❤️ for Jharkhand Tourism.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;