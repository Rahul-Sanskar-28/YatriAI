import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Bell,
  Shield,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { bookings, itineraries, destinations, guides, products } from '../../data/mockData';
import AIItineraryPlanner from './components/AIItineraryPlanner';
import AIChat from './components/AIChat';
import BookingSystem from './components/BookingSystem';
import InteractiveMap from './components/InteractiveMap';
import Marketplace from './components/Marketplace';
import GuideLocator from './components/GuideLocator';
import FeedbackPortal from './components/FeedbackPortal';
import SafetyFeatures from './components/SafetyFeatures';

const TouristDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: t('dashboard.welcome'), icon: Home },
    { id: 'itinerary', label: t('dashboard.itinerary'), icon: Map },
    { id: 'bookings', label: t('dashboard.bookings'), icon: CreditCard },
    { id: 'map', label: 'Interactive Maps', icon: MapPin },
    { id: 'marketplace', label: t('dashboard.marketplace'), icon: ShoppingBag },
    { id: 'guides', label: t('dashboard.guides'), icon: Users },
    { id: 'feedback', label: 'Feedback & Reviews', icon: Star },
    { id: 'safety', label: 'Safety Features', icon: Shield },
    { id: 'profile', label: t('dashboard.profile'), icon: User }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'itinerary':
        return <AIItineraryPlanner />;
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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0 overflow-y-auto">
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
            <div className="flex-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                      activeTab === item.id
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
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
              <span className="font-medium">Logout</span>
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

      {/* AI Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* AI Chat Modal */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: 'Trips Completed', value: '3', icon: Map, color: 'from-blue-500 to-cyan-500' },
    { label: 'Bookings Active', value: bookings.filter(b => b.status === 'confirmed').length.toString(), icon: Calendar, color: 'from-green-500 to-emerald-500' },
    { label: 'Reviews Given', value: '12', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Rewards Points', value: '2,450', icon: TrendingUp, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('dashboard.welcome')}, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready for your next adventure in Jharkhand?
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
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{booking.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{booking.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-orange-50 dark:from-green-900/20 dark:to-orange-900/20 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🌟 Perfect Weather Alert</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Great weather this weekend for visiting Hundru Falls!</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🎭 Cultural Event</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sarhul festival is coming up - book your cultural tour now!</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🏺 Marketplace Deal</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">20% off on authentic Dokra art this week!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Management Component
const ProfileManagement: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Management</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={user?.name}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Picture</h3>
          <div className="text-center">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
            {isEditing && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Change Photo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;