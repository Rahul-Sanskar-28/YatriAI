import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Plus, 
  TrendingUp, 
  Package, 
  DollarSign,
  Eye,
  Edit,
  Search,
  Upload,
  X,
  LogOut,
  MessageCircle,
  Star,
  Palette,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { vendorProducts } from '../../data/mockData';

const MarketplaceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: TrendingUp, color: 'from-kolkata-yellow to-kolkata-gold' },
    { id: 'products', label: 'My Artisan Products', icon: ShoppingBag, color: 'from-kolkata-terracotta to-durga-500' },
    { id: 'orders', label: 'Orders', icon: Package, color: 'from-heritage-500 to-kolkata-sepia' },
    { id: 'analytics', label: 'Analytics', icon: DollarSign, color: 'from-kolkata-hooghly to-kolkata-blue' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MarketplaceDashboardHome />;
      case 'products':
        return <MyProducts />;
      case 'orders':
        return <Orders />;
      case 'analytics':
        return <VendorAnalytics />;
      default:
        return <MarketplaceDashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-kolkata-cream/30 to-heritage-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-heritage-500 to-kolkata-terracotta rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-heritage">
              YatriAI - Marketplace
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-kolkata-terracotta dark:hover:text-kolkata-gold transition-colors rounded-lg hover:bg-kolkata-yellow/10 dark:hover:bg-kolkata-gold/10"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-heritage-500"
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
          <div className="p-6 border-b border-kolkata-yellow/20 bg-gradient-to-r from-heritage-500/10 to-kolkata-terracotta/10">
            <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-heritage-500/50"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                <div className="flex items-center gap-1 text-xs">
                  <Award className="w-3 h-3 text-heritage-500" />
                  <span className="text-heritage-600 dark:text-kolkata-gold font-medium">Artisan Seller</span>
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
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-heritage-500/20`
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-heritage-500/10 hover:to-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : `bg-gradient-to-r ${item.color} bg-opacity-10`}`}>
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-heritage-600 dark:text-kolkata-gold'}`} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="sellerActiveIndicator"
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
              <span className="font-medium">Logout</span>
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
        {/* Support Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group"
          title="Support Chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-durga-500 rounded-full" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Support 💬
          </span>
        </motion.button>

        {/* Quick Add Product */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          title="Add Product"
        >
          <Plus className="w-6 h-6" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Add Product 🎨
          </span>
        </motion.button>
      </div>
    </div>
  );
};

// Marketplace Dashboard Home Component with Kolkata Theme
const MarketplaceDashboardHome: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Products', value: vendorProducts.length.toString(), icon: ShoppingBag, color: 'from-kolkata-yellow to-kolkata-gold', bgPattern: '🎨' },
    { label: 'Active Products', value: vendorProducts.filter(p => p.status === 'Active').length.toString(), icon: Package, color: 'from-kolkata-terracotta to-durga-500', bgPattern: '🏺' },
    { label: 'Total Sales', value: vendorProducts.reduce((sum, p) => sum + p.sales, 0).toString(), icon: TrendingUp, color: 'from-heritage-500 to-kolkata-sepia', bgPattern: '📈' },
    { label: 'Revenue', value: '₹1.2L', icon: DollarSign, color: 'from-kolkata-hooghly to-kolkata-blue', bgPattern: '💰' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Welcome back, {user?.name}! 
          <span className="text-2xl">🎨</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Manage your artisan crafts and track sales in the City of Joy marketplace
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
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10 overflow-hidden group"
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
        {/* Top Products */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-kolkata-gold fill-current" />
            Top Selling Crafts
          </h3>
          <div className="space-y-4">
            {vendorProducts.slice(0, 3).map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-heritage-50 to-transparent dark:from-heritage-900/20 dark:to-transparent rounded-xl hover:from-heritage-100 dark:hover:from-heritage-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-heritage-500/30"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-kolkata-terracotta dark:text-kolkata-gold font-semibold">₹{product.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{product.sales} sales</p>
                  <p className="text-sm text-kolkata-sepia dark:text-gray-400">{product.stock} in stock</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-heritage-500" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white p-4 rounded-xl shadow-lg flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Artisan Product</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-heritage-500/30 text-heritage-600 dark:text-kolkata-gold p-4 rounded-xl hover:bg-heritage-50 dark:hover:bg-heritage-900/20 transition-colors flex items-center justify-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Manage Inventory</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-heritage-500/30 text-heritage-600 dark:text-kolkata-gold p-4 rounded-xl hover:bg-heritage-50 dark:hover:bg-heritage-900/20 transition-colors flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>View Analytics</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Artisan Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
      >
        <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🏺 Kolkata Artisan Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-heritage-50 to-transparent dark:from-heritage-900/20 rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🎭 Patachitra Art</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Traditional scroll paintings are trending this season</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-kolkata-yellow/10 to-transparent rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🪔 Pujo Season</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Add Durga idols and dhunuchi to your collection</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-durga-50 to-transparent dark:from-durga-900/20 rounded-xl">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">🧵 Baluchari Sarees</p>
            <p className="text-sm text-kolkata-sepia dark:text-gray-400">Heritage textiles with blockchain verification boost sales</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// My Products Component with Kolkata Theme
const MyProducts: React.FC = () => {
  const [products, setProducts] = useState(vendorProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            My Artisan Products
            <span className="text-2xl">🏺</span>
          </h1>
          <p className="text-kolkata-sepia dark:text-gray-400">
            Manage your Kolkata craft catalog and inventory
          </p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </motion.button>
      </div>

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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-heritage-500/30 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          {['All', 'Active', 'Out of Stock'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterStatus(status)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-heritage-50 dark:hover:bg-heritage-900/20 border border-heritage-500/20'
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-heritage-500/10 group"
          >
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  product.status === 'Active'
                    ? 'bg-green-500/80 text-white'
                    : 'bg-red-500/80 text-white'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-heritage-500/80 text-white backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold font-heritage text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              
              <p className="text-kolkata-sepia dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="text-xl font-bold text-heritage-600 dark:text-kolkata-gold">₹{product.price}</span>
                <span className="px-2 py-1 bg-heritage-50 dark:bg-heritage-900/20 rounded-lg text-heritage-600 dark:text-heritage-400">
                  {product.stock} in stock
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center gap-1 text-kolkata-sepia dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {product.sales} sales
                </div>
                <div className="flex items-center text-kolkata-gold">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  4.8
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white px-3 py-2.5 rounded-xl text-sm font-medium shadow-lg flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-heritage-500/30 text-heritage-600 dark:text-kolkata-gold px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-heritage-50 dark:hover:bg-heritage-900/20 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(payload) => {
            const newId = (products.length + 1).toString();
            const newProduct = {
              id: newId,
              name: payload.name,
              description: payload.description,
              price: Number(payload.price) || 0,
              stock: Number(payload.stock) || 0,
              imageUrl: payload.imageUrl || 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
              category: payload.category,
              status: (payload.stock && Number(payload.stock) > 0) ? 'Active' as const : 'Out of Stock' as const,
              sales: 0
            };
            setProducts([newProduct, ...products]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

// Add Product Modal Component with Kolkata Theme
type AddProductPayload = { name: string; description: string; price: string; stock: string; category: string; imageUrl?: string };

const AddProductModal: React.FC<{ onClose: () => void; onAdd: (payload: AddProductPayload) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<AddProductPayload>({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Handicrafts',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-heritage-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-heritage-500" />
            Add Artisan Product
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Patachitra Scroll Painting"
              className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe your artisan craft..."
              className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
            >
              <option value="Handicrafts">🏺 Handicrafts</option>
              <option value="Art">🎨 Art & Paintings</option>
              <option value="Textiles">🧵 Textiles & Sarees</option>
              <option value="Jewelry">💍 Jewelry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-kolkata-sepia dark:text-gray-300 mb-2">
              Product Image
            </label>
            <div className="space-y-2">
              <div className="border-2 border-dashed border-heritage-500/30 rounded-xl p-6 text-center bg-heritage-50/30 dark:bg-heritage-900/10">
                <Upload className="w-8 h-8 text-heritage-500 mx-auto mb-2" />
                <p className="text-sm text-kolkata-sepia dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
              </div>
              <input
                type="url"
                placeholder="Or paste image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-3 border border-heritage-500/30 rounded-xl bg-heritage-50/50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-heritage-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 border border-heritage-500/30 text-heritage-600 dark:text-kolkata-gold px-4 py-3 rounded-xl hover:bg-heritage-50 dark:hover:bg-heritage-900/20 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white px-4 py-3 rounded-xl shadow-lg"
            >
              Add Product
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Orders Component with Kolkata Theme
const Orders: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Orders
          <span className="text-2xl">📦</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Track and manage your artisan product orders
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center border border-heritage-500/10"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-heritage-100 to-heritage-50 dark:from-heritage-900/30 dark:to-heritage-900/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package className="w-10 h-10 text-heritage-500" />
        </div>
        <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-2">
          No Orders Yet
        </h3>
        <p className="text-kolkata-sepia dark:text-gray-400 mb-6 max-w-md mx-auto">
          Orders will appear here once tourists start purchasing your beautiful Kolkata crafts.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-heritage-500 to-kolkata-terracotta text-white px-6 py-3 rounded-xl shadow-lg"
        >
          View Product Tips
        </motion.button>
      </motion.div>
    </div>
  );
};

// Vendor Analytics Component with Kolkata Theme
const VendorAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heritage text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          Analytics
          <span className="text-2xl">📊</span>
        </h1>
        <p className="text-kolkata-sepia dark:text-gray-400">
          Track your artisan sales performance and insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-heritage-500" />
            Sales Overview
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-heritage-50 to-kolkata-cream dark:from-heritage-900/20 dark:to-heritage-900/10 rounded-xl border border-dashed border-heritage-500/30">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-heritage-500 mx-auto mb-2" />
              <p className="text-kolkata-sepia dark:text-gray-400">Interactive chart - Sales over time</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
        >
          <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-kolkata-gold fill-current" />
            Product Performance
          </h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-kolkata-yellow/10 to-heritage-50 dark:from-kolkata-yellow/5 dark:to-heritage-900/10 rounded-xl border border-dashed border-kolkata-yellow/30">
            <div className="text-center">
              <Palette className="w-12 h-12 text-kolkata-terracotta mx-auto mb-2" />
              <p className="text-kolkata-sepia dark:text-gray-400">Interactive chart - Product performance</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-heritage-500/10"
      >
        <h3 className="text-xl font-semibold font-heritage text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🏆 Top Performing Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Handicrafts', sales: 45, icon: '🏺', color: 'from-kolkata-yellow to-kolkata-gold' },
            { name: 'Art', sales: 32, icon: '🎨', color: 'from-kolkata-terracotta to-durga-500' },
            { name: 'Textiles', sales: 28, icon: '🧵', color: 'from-heritage-500 to-kolkata-sepia' },
            { name: 'Jewelry', sales: 18, icon: '💍', color: 'from-kolkata-hooghly to-kolkata-blue' },
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 bg-gradient-to-r from-heritage-50 to-transparent dark:from-heritage-900/20 dark:to-transparent rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{category.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${category.color}`}>
                  #{index + 1}
                </span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
              <p className="text-sm text-kolkata-sepia dark:text-gray-400">{category.sales} sales</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketplaceDashboard;
