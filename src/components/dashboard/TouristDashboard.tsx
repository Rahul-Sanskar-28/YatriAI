import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Map, 
  MessageCircle, 
  CreditCard, 
  MapPin, 
  ShoppingBag, 
  Users, 
  Star, 
  User,
  Calendar,
  Shield,
  TrendingUp,
  LogOut,
  Train,
  Headphones,
  Coffee,
  Palette,
  ChefHat,
  Image,
  Award,
  Heart,
  Sun,
  Moon,
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { bookings } from '../../data/mockData';
import AIItineraryPlanner from './components/AIItineraryPlanner';
import AIChat from './components/AIChat';
import BookingSystem from './components/BookingSystem';
import InteractiveMap from './components/InteractiveMap';
import Marketplace from './components/Marketplace';
import GuideLocator from './components/GuideLocator';
import FeedbackPortal from './components/FeedbackPortal';
import SafetyFeatures from './components/SafetyFeatures';
import TransportTracker from './components/TransportTracker';
import HeritageWalk from './components/HeritageWalk';
import AddaBot from './components/AddaBot';
import ArtisanChronicles from './components/ArtisanChronicles';
import RecipeVault from './components/RecipeVault';
import PatachitraArchive from './components/PatachitraArchive';
import VerifiedMarketplace from './components/VerifiedMarketplace';
import HeritageNFT from './components/HeritageNFT';
import PandalDonations from './components/PandalDonations';
import GPSSuggestions from './components/GPSSuggestions';
import LanguageSelector from '../common/LanguageSelector';

const TouristDashboard: React.FC = () => {
  const { t } = useTranslation('translation');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddaBotOpen, setIsAddaBotOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', labelKey: 'dashboard.menuItems.dashboard', icon: Home },
    { id: 'itinerary', labelKey: 'dashboard.menuItems.aiItinerary', icon: Map },
    { id: 'gps-suggestions', labelKey: 'dashboard.menuItems.nearbyPlaces', icon: Navigation, isNew: true },
    { id: 'transport', labelKey: 'dashboard.menuItems.transport', icon: Train, isNew: true },
    { id: 'heritage', labelKey: 'dashboard.menuItems.heritageWalk', icon: Headphones, isNew: true },
    { id: 'artisans', labelKey: 'dashboard.menuItems.artisanChronicles', icon: Palette, isNew: true },
    { id: 'recipes', labelKey: 'dashboard.menuItems.recipeVault', icon: ChefHat, isNew: true },
    { id: 'patachitra', labelKey: 'dashboard.menuItems.patachitraArchive', icon: Image, isNew: true },
    { id: 'verified-market', labelKey: 'dashboard.menuItems.verifiedMarket', icon: Shield, isNew: true, isBlockchain: true },
    { id: 'heritage-nft', labelKey: 'dashboard.menuItems.heritageNFT', icon: Award, isNew: true, isBlockchain: true },
    { id: 'pandal-donate', labelKey: 'dashboard.menuItems.pandalDonations', icon: Heart, isNew: true, isBlockchain: true },
    { id: 'bookings', labelKey: 'dashboard.menuItems.bookings', icon: CreditCard },
    { id: 'map', labelKey: 'dashboard.menuItems.interactiveMap', icon: MapPin },
    { id: 'marketplace', labelKey: 'dashboard.menuItems.marketplace', icon: ShoppingBag },
    { id: 'guides', labelKey: 'dashboard.menuItems.findGuides', icon: Users },
    { id: 'feedback', labelKey: 'dashboard.menuItems.feedback', icon: Star },
    { id: 'safety', labelKey: 'dashboard.menuItems.safety', icon: Shield },
    { id: 'profile', labelKey: 'dashboard.menuItems.myProfile', icon: User }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'itinerary':
        return <AIItineraryPlanner />;
      case 'gps-suggestions':
        return <GPSSuggestions />;
      case 'transport':
        return <TransportTracker />;
      case 'heritage':
        return <HeritageWalk />;
      case 'artisans':
        return <ArtisanChronicles />;
      case 'recipes':
        return <RecipeVault />;
      case 'patachitra':
        return <PatachitraArchive />;
      case 'verified-market':
        return <VerifiedMarketplace />;
      case 'heritage-nft':
        return <HeritageNFT />;
      case 'pandal-donate':
        return <PandalDonations />;
      case 'bookings':
        return <BookingSystem />;
      case 'map':
        return <InteractiveMap />;
      case 'marketplace':
        return <Marketplace />;
      case 'guides':
        return <GuideLocator />;
      case 'feedback':
        return <FeedbackPortal />;
      case 'safety':
        return <SafetyFeatures />;
      case 'profile':
        return <ProfileManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🪔</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-heritage">
              {t('brand.name')}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors rounded-lg hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10"
              title={isDark ? t('common.lightMode') : t('common.darkMode')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-kolkata-yellow"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="p-4 flex flex-col h-[calc(100%-5rem)]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isNewFeature = 'isNew' in item && item.isNew;
                const isBlockchain = 'isBlockchain' in item && item.isBlockchain;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-kolkata-yellow/20 to-kolkata-terracotta/20 text-kolkata-terracotta dark:text-kolkata-gold border border-kolkata-yellow/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isNewFeature ? 'text-kolkata-terracotta' : ''} ${isBlockchain ? 'text-purple-500' : ''}`} />
                    <span className="font-medium flex-1 text-sm">{t(item.labelKey)}</span>
                    {isBlockchain ? (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold rounded-full">
                        ⛓️
                      </span>
                    ) : isNewFeature && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-kolkata-yellow to-durga-500 text-white text-xs font-bold rounded-full animate-pulse">
                        {t('common.new')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t('auth.logout')}</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-3 z-50">
        {/* Adda Bot Button - Kolkata Personality Chat */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddaBotOpen(true)}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          title="Adda Bot - Kolkata Chat"
        >
          <Coffee className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Adda Bot ☕
          </span>
        </motion.button>

        {/* AI Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant 🤖
          </span>
        </motion.button>
      </div>

      {/* AI Chat Modal */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Adda Bot Modal */}
      <AddaBot isOpen={isAddaBotOpen} onClose={() => setIsAddaBotOpen(false)} />
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => {
  const { t } = useTranslation('translation');
  const { user } = useAuth();

  const stats = [
    { labelKey: 'dashboard.stats.placesVisited', value: '5', icon: Map, color: 'from-kolkata-yellow to-kolkata-gold' },
    { labelKey: 'dashboard.stats.totalBookings', value: bookings.filter(b => b.status === 'confirmed').length.toString(), icon: Calendar, color: 'from-kolkata-terracotta to-durga-500' },
    { labelKey: 'dashboard.stats.upcomingTrips', value: '12', icon: Star, color: 'from-kolkata-hooghly to-kolkata-blue' },
    { labelKey: 'dashboard.stats.savedPlaces', value: '2,450', icon: TrendingUp, color: 'from-heritage-500 to-kolkata-sepia' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heritage">
          {t('dashboard.welcome')}, {user?.name}! 🪔
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('dashboard.overview.title')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-kolkata-yellow/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t(stat.labelKey)}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.overview.recentBookings')}</h3>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{booking.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{booking.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-kolkata-yellow/20 dark:bg-kolkata-yellow/10 text-kolkata-terracotta dark:text-kolkata-gold'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations - Kolkata Themed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.overview.recommendedPlaces')}</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-kolkata-yellow/20 to-kolkata-terracotta/10 dark:from-kolkata-yellow/10 dark:to-kolkata-terracotta/5 rounded-lg border border-kolkata-yellow/20">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🚃 {t('features.tramHeritage.title')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('features.tramHeritage.description')}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-durga-50 to-durga-100/50 dark:from-durga-900/20 dark:to-durga-900/10 rounded-lg border border-durga-200/30">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🪔 {t('features.pujoRoute.title')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('features.pujoRoute.description')}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-heritage-50 to-kolkata-cream dark:from-heritage-900/20 dark:to-heritage-900/10 rounded-lg border border-heritage-200/30">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🏛️ {t('features.heritageWalk.title')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('features.heritageWalk.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Management Component
const ProfileManagement: React.FC = () => {
  const { t } = useTranslation('translation');
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.menuItems.myProfile')}</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isEditing ? t('common.save') : t('common.edit')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('auth.fullName')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('auth.fullName')}</label>
              <input
                type="text"
                value={user?.name}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('auth.email')}</label>
              <input
                type="email"
                value={user?.email}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('dashboard.menuItems.myProfile')}</h3>
          <div className="text-center">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
            {isEditing && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                {t('common.edit')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
