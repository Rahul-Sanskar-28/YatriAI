import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Search,
  Calendar,
  Star,
  DollarSign,
  ShieldCheck,
  Building,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Bell,
  Settings,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { adminUsers } from '../../data/mockData';
import LanguageSelector from '../common/LanguageSelector';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('analytics');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <ManageUsers />;
      case 'guides':
        return <ManageGuides />;
      case 'vendors':
        return <ManageVendors />;
      default:
        return <Analytics />;
    }
  };

  const navItems = [
    { id: 'analytics', labelKey: 'dashboard.analytics', icon: LayoutDashboard, color: 'from-kolkata-yellow to-kolkata-gold' },
    { id: 'users', labelKey: 'dashboard.manageUsers', icon: Users, color: 'from-kolkata-terracotta to-durga-500' },
    { id: 'guides', labelKey: 'dashboard.manageGuides', icon: ShieldCheck, color: 'from-heritage-500 to-kolkata-sepia' },
    { id: 'vendors', labelKey: 'dashboard.manageVendors', icon: Building, color: 'from-kolkata-hooghly to-kolkata-blue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-kolkata-cream/30 to-heritage-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-heritage">
              {t('brand.name')} - Admin
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
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
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
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-72 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto border-r border-kolkata-yellow/20"
        >
          {/* Header */}
          <div className="p-6 border-b border-kolkata-yellow/20 bg-gradient-to-r from-kolkata-yellow/10 to-durga-500/10">
            <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                alt={user?.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-kolkata-yellow/50"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-kolkata-terracotta dark:text-kolkata-gold font-medium">🛡️ {t('auth.roles.admin.title')}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex flex-col h-[calc(100%-12rem)]">
            <div className="flex-1 space-y-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveView(item.id)}
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
                        layoutId="activeIndicator"
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
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col-reverse gap-3 z-50">
        {/* Notifications Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          title="Notifications"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-durga-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Notifications
          </span>
        </motion.button>

        {/* Quick Settings */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-heritage-500 to-kolkata-sepia text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Settings ⚙️
          </span>
        </motion.button>
      </div>
    </div>
  );
};

// Analytics Component with Kolkata Theme
const Analytics: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'from-kolkata-yellow to-kolkata-gold', change: '+12%', bgPattern: '🏛️' },
    { label: 'New Registrations', value: '45', icon: UserCheck, color: 'from-kolkata-terracotta to-durga-500', change: '+8%', bgPattern: '🚃' },
    { label: 'Total Bookings', value: '789', icon: Calendar, color: 'from-heritage-500 to-kolkata-sepia', change: '+15%', bgPattern: '🪔' },
    { label: 'Revenue', value: '₹2.4L', icon: DollarSign, color: 'from-kolkata-hooghly to-kolkata-blue', change: '+22%', bgPattern: '🎭' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Analytics Dashboard 
          <span className="text-2xl">🏛️</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Monitor platform performance across the City of Joy
        </p>
      </motion.div>

      {/* Stats Grid with Kolkata Theme */}
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
              {/* Background Pattern */}
              <span className="absolute -right-2 -bottom-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.bgPattern}
              </span>
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-kolkata-terracotta" />
            User Growth
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-kolkata-yellow/5 to-kolkata-terracotta/5 rounded-xl border border-dashed border-kolkata-yellow/30">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-kolkata-yellow mx-auto mb-2" />
              <p className="text-kolkata-sepia dark:text-gray-400">Interactive chart - User growth over time</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-kolkata-terracotta" />
            Revenue Trends
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-heritage-50 to-durga-50 dark:from-heritage-900/20 dark:to-durga-900/20 rounded-xl border border-dashed border-heritage-300/30">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-heritage-500 mx-auto mb-2" />
              <p className="text-kolkata-sepia dark:text-gray-400">Interactive chart - Revenue trends</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10"
      >
        <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🪔 Recent Activity in Kolkata
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New tourist registered', user: 'Anjali Sharma', time: '2 mins ago', icon: '🏛️' },
            { action: 'Guide verified', user: 'Ravi Kumar', time: '15 mins ago', icon: '🚃' },
            { action: 'Booking confirmed', user: 'Victoria Memorial Tour', time: '1 hour ago', icon: '🎭' },
            { action: 'New vendor approved', user: 'Kumartuli Crafts', time: '2 hours ago', icon: '🎨' },
          ].map((activity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-kolkata-yellow/5 to-transparent rounded-xl hover:from-kolkata-yellow/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400">{activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ManageUsers Component with Kolkata Theme
const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState(adminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Blocked'>('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (userId: string, newStatus: 'Active' | 'Blocked') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ));
  };

  const handleRoleChange = (userId: string, newRole: 'tourist' | 'guide' | 'seller') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Manage Users
          <span className="text-2xl">👥</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Monitor and manage all platform users in the City of Joy
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-kolkata-yellow/30 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          {(['All', 'Active', 'Blocked'] as const).map((status) => (
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

      {/* Users Table */}
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
                {['User', 'Role', 'Status', 'Join Date', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-kolkata-terracotta dark:text-kolkata-gold uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-kolkata-yellow/10">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-kolkata-yellow/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-kolkata-yellow/30"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-kolkata-sepia dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="text-sm bg-kolkata-yellow/10 border border-kolkata-yellow/30 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white capitalize focus:ring-2 focus:ring-kolkata-yellow"
                    >
                      <option value="tourist">🏛️ Tourist</option>
                      <option value="guide">🚃 Guide</option>
                      <option value="seller">🎨 Seller</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {user.status === 'Active' ? '✓ ' : '✗ '}{user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-kolkata-sepia dark:text-gray-400">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Blocked' : 'Active')}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        user.status === 'Active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </motion.button>
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

// ManageGuides Component with Kolkata Theme
const ManageGuides: React.FC = () => {
  const guideUsers = adminUsers.filter(user => user.role === 'guide');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Manage Guides
          <span className="text-2xl">🚃</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Monitor and verify heritage tour guides
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideUsers.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10 overflow-hidden relative group"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-kolkata-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-kolkata-yellow/50"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400">
                    {guide.email}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                    guide.status === 'Active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}>
                    {guide.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-kolkata-sepia dark:text-gray-400">
                <div className="flex items-center p-2 bg-kolkata-yellow/5 rounded-lg">
                  <Calendar className="w-4 h-4 mr-2 text-kolkata-terracotta" />
                  Joined: {new Date(guide.joinDate).toLocaleDateString()}
                </div>
                <div className="flex items-center p-2 bg-kolkata-yellow/5 rounded-lg">
                  <Star className="w-4 h-4 mr-2 text-kolkata-gold fill-current" />
                  Rating: 4.8/5 (24 reviews)
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-3 py-2.5 rounded-xl text-sm font-medium shadow-lg"
                >
                  ✓ Verify Guide
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-2.5 border border-kolkata-yellow/30 rounded-xl text-sm font-medium text-kolkata-terracotta dark:text-kolkata-gold hover:bg-kolkata-yellow/10 transition-colors"
                >
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ManageVendors Component with Kolkata Theme
const ManageVendors: React.FC = () => {
  const vendorUsers = adminUsers.filter(user => user.role === 'seller');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Manage Vendors
          <span className="text-2xl">🎨</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Monitor and verify artisan vendors & marketplace sellers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorUsers.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-kolkata-yellow/10 overflow-hidden relative group"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-heritage-500/50"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400">
                    {vendor.email}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                    vendor.status === 'Active'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-kolkata-sepia dark:text-gray-400">
                <div className="flex items-center p-2 bg-heritage-50 dark:bg-heritage-900/20 rounded-lg">
                  <Calendar className="w-4 h-4 mr-2 text-heritage-500" />
                  Joined: {new Date(vendor.joinDate).toLocaleDateString()}
                </div>
                <div className="flex items-center p-2 bg-heritage-50 dark:bg-heritage-900/20 rounded-lg">
                  <DollarSign className="w-4 h-4 mr-2 text-heritage-500" />
                  Revenue: ₹45,000
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-heritage-500 to-kolkata-sepia text-white px-3 py-2.5 rounded-xl text-sm font-medium shadow-lg"
                >
                  ✓ Verify Vendor
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-2.5 border border-heritage-500/30 rounded-xl text-sm font-medium text-heritage-600 dark:text-heritage-400 hover:bg-heritage-50 dark:hover:bg-heritage-900/20 transition-colors"
                >
                  Products
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
