import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Map, 
  Calendar, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Search,
  LogOut,
  MessageCircle,
  Headphones,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { guideTours, guideBookings } from '../../data/mockData';
import LanguageSelector from '../common/LanguageSelector';

const GuideDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', labelKey: 'dashboard.overview', icon: TrendingUp, color: 'from-kolkata-yellow to-kolkata-gold' },
    { id: 'tours', labelKey: 'dashboard.myHeritageTours', icon: Map, color: 'from-kolkata-terracotta to-durga-500' },
    { id: 'bookings', labelKey: 'dashboard.manageBookings', icon: Calendar, color: 'from-heritage-500 to-kolkata-sepia' },
    { id: 'profile', labelKey: 'dashboard.guideProfile', icon: Users, color: 'from-kolkata-hooghly to-kolkata-blue' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <GuideDashboardHome />;
      case 'tours':
        return <MyTours />;
      case 'bookings':
        return <ManageBookings />;
      case 'profile':
        return <GuideProfile />;
      default:
        return <GuideDashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-kolkata-cream/30 to-heritage-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-lg flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-heritage">
              {t('brand.name')} - Guide
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector variant="header" />
            
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
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-72 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto border-r border-kolkata-yellow/20"
        >
          {/* Header */}
          <div className="p-6 border-b border-kolkata-yellow/20 bg-gradient-to-r from-kolkata-yellow/10 to-heritage-500/10">
            <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-kolkata-yellow/50"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-3 h-3 text-kolkata-gold fill-current" />
                  <span className="text-kolkata-terracotta dark:text-kolkata-gold font-medium">4.8 Rating • Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex flex-col h-[calc(100%-12rem)]">
            <div className="flex-1 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 group ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-kolkata-yellow/20`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-kolkata-yellow/10 hover:to-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : `bg-gradient-to-r ${item.color} bg-opacity-10`}`}>
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-kolkata-terracotta dark:text-kolkata-gold'}`} />
                    </div>
                    <span className="font-medium">{t(item.labelKey)}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="guideActiveIndicator"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">{t('auth.logout')}</span>
            </motion.button>
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-3 z-50">
        {/* AI Assistant Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          title="AI Tour Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant 🤖
          </span>
        </motion.button>

        {/* Quick Tour Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-heritage-500 to-kolkata-sepia text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="Create Tour"
        >
          <Plus className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            New Tour 🏛️
          </span>
        </motion.button>
      </div>
    </div>
  );
};

// Guide Dashboard Home Component with Kolkata Theme
const GuideDashboardHome: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Heritage Tours', value: guideTours.filter(t => t.status === 'Active').length.toString(), icon: Map, color: 'from-kolkata-yellow to-kolkata-gold', bgPattern: '🏛️' },
    { label: 'Total Bookings', value: guideBookings.length.toString(), icon: Calendar, color: 'from-kolkata-terracotta to-durga-500', bgPattern: '🚃' },
    { label: 'This Month Revenue', value: '₹25,000', icon: DollarSign, color: 'from-heritage-500 to-kolkata-sepia', bgPattern: '🪔' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'from-kolkata-hooghly to-kolkata-blue', bgPattern: '⭐' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Welcome back, {user?.name}! 
          <span className="text-2xl">🚃</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Here's what's happening with your heritage tours in the City of Joy
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10 overflow-hidden group"
            >
              <span className="absolute -right-2 -bottom-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.bgPattern}
              </span>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-kolkata-terracotta" />
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {guideBookings.slice(0, 3).map((booking, index) => (
              <motion.div 
                key={booking.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-kolkata-yellow/5 to-transparent rounded-xl hover:from-kolkata-yellow/10 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{booking.touristName}</p>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400">{booking.tourName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{booking.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'Confirmed' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : booking.status === 'Pending'
                    ? 'bg-kolkata-yellow/20 dark:bg-kolkata-yellow/10 text-kolkata-terracotta dark:text-kolkata-gold'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {booking.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tour Performance */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-kolkata-terracotta" />
            Tour Performance
          </h3>
          <div className="space-y-4">
            {guideTours.slice(0, 3).map((tour, index) => (
              <motion.div 
                key={tour.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-heritage-50 to-transparent dark:from-heritage-900/20 dark:to-transparent rounded-xl hover:from-heritage-100 dark:hover:from-heritage-900/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">{tour.title}</p>
                  <span className="text-sm text-kolkata-terracotta dark:text-kolkata-gold font-semibold">₹{tour.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-kolkata-sepia dark:text-gray-400">
                  <span>{tour.bookings} bookings</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tour.status === 'Active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {tour.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kolkata Tips for Guides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
      >
        <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🪔 Kolkata Guide Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-kolkata-yellow/10 to-transparent rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🚃 Tram Heritage</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Include tram rides in your Victoria Memorial tours</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-durga-50 to-transparent dark:from-durga-900/20 rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🎭 Pujo Season</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Pandal hopping tours are trending - add more!</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-heritage-50 to-transparent dark:from-heritage-900/20 rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">☕ Adda Culture</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Add coffee house stops for authentic experiences</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// My Tours Component with Kolkata Theme
const MyTours: React.FC = () => {
  const [tours] = useState(guideTours);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            My Heritage Tours
            <span className="text-2xl">🏛️</span>
          </h1>
          <p className="text-kolkata-sepia dark:text-gray-400">
            Manage your Kolkata heritage tour offerings
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Tour</span>
        </motion.button>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-kolkata-yellow/10 group"
          >
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  tour.status === 'Active'
                    ? 'bg-green-500/80 text-white'
                    : 'bg-gray-500/80 text-white'
                }`}>
                  {tour.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold font-heritage text-gray-900 dark:text-white mb-2">
                {tour.title}
              </h3>
              
              <p className="text-kolkata-sepia dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {tour.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1 bg-kolkata-yellow/10 px-2 py-1 rounded-lg">
                  <Clock className="w-4 h-4 text-kolkata-terracotta" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1 bg-heritage-50 dark:bg-heritage-900/20 px-2 py-1 rounded-lg">
                  <DollarSign className="w-4 h-4 text-heritage-500" />
                  ₹{tour.price}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-kolkata-sepia dark:text-gray-400">
                  {tour.bookings} bookings
                </span>
                <div className="flex items-center text-kolkata-gold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  4.8
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-3 py-2.5 rounded-xl text-sm font-medium shadow-lg flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-kolkata-yellow/30 text-kolkata-terracotta dark:text-kolkata-gold px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-kolkata-yellow/10 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Booking type for proper TypeScript typing
interface GuideBooking {
  id: string;
  tourName: string;
  touristName: string;
  touristEmail: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  amount: number;
  participants: number;
}

// Manage Bookings Component with Kolkata Theme
const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<GuideBooking[]>(guideBookings as GuideBooking[]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tourName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (bookingId: string, newStatus: 'Confirmed' | 'Pending' | 'Cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Manage Bookings
          <span className="text-2xl">📅</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Review and manage heritage tour bookings
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-kolkata-sepia w-5 h-5" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-kolkata-yellow/30 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-kolkata-yellow/10 border border-kolkata-yellow/20'
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Bookings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-kolkata-yellow/10"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-kolkata-yellow/10 to-kolkata-terracotta/10">
              <tr>
                {['Tourist', 'Tour', 'Date', 'Participants', 'Amount', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-kolkata-terracotta dark:text-kolkata-gold uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-kolkata-yellow/10">
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-kolkata-yellow/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.touristName}
                      </div>
                      <div className="text-sm text-kolkata-sepia dark:text-gray-400">
                        {booking.touristEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                      {booking.tourName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-kolkata-sepia dark:text-gray-400">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-kolkata-sepia dark:text-gray-400">
                    {booking.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-kolkata-terracotta dark:text-kolkata-gold">
                    ₹{booking.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : booking.status === 'Pending'
                        ? 'bg-kolkata-yellow/20 dark:bg-kolkata-yellow/10 text-kolkata-terracotta dark:text-kolkata-gold'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as any)}
                      className="text-sm bg-kolkata-yellow/10 border border-kolkata-yellow/30 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-kolkata-yellow"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

// Guide Profile Component with Kolkata Theme
const GuideProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white flex items-center gap-3">
            Guide Profile
            <span className="text-2xl">🎭</span>
          </h1>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-5 py-2.5 rounded-xl shadow-lg"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-kolkata-terracotta" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={user?.name}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-kolkata-yellow/30 bg-kolkata-yellow/5 dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 focus:ring-2 focus:ring-kolkata-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-kolkata-yellow/30 bg-kolkata-yellow/5 dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 focus:ring-2 focus:ring-kolkata-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">Location</label>
              <input
                type="text"
                defaultValue="Kolkata, West Bengal"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-kolkata-yellow/30 bg-kolkata-yellow/5 dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 focus:ring-2 focus:ring-kolkata-yellow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">Experience (Years)</label>
              <input
                type="number"
                defaultValue="8"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-kolkata-yellow/30 bg-kolkata-yellow/5 dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 focus:ring-2 focus:ring-kolkata-yellow"
              />
            </div>
          </div>
        </motion.div>

        {/* Profile Picture & Stats */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
          >
            <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-6">Profile Picture</h3>
            <div className="text-center">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-2xl object-cover mx-auto mb-4 ring-4 ring-kolkata-yellow/30"
              />
              {isEditing && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-4 py-2 rounded-xl shadow-lg"
                >
                  Change Photo
                </motion.button>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
          >
            <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4">Guide Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Rating', value: '4.8', icon: Star, highlight: true },
                { label: 'Total Tours', value: '3', icon: Map },
                { label: 'Total Bookings', value: '47', icon: Calendar },
                { label: 'Member Since', value: 'Jan 2024', icon: Award },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-kolkata-yellow/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-4 h-4 ${stat.highlight ? 'text-kolkata-gold fill-current' : 'text-kolkata-terracotta'}`} />
                    <span className="text-kolkata-sepia dark:text-gray-400">{stat.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
