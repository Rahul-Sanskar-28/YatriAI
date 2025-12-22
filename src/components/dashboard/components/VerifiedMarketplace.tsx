import React, { useState } from 'react';
import { 
  ShoppingCart, Shield, Star, CheckCircle, Package, 
  CreditCard, Truck, Award, MapPin, User, Clock,
  Heart, Share2, Eye, Loader2, ExternalLink, Wallet,
  BadgeCheck, FileText, QrCode, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { TerracottaIcon, PatachitraIcon } from '../../kolkata/KolkataIcons';
import { useLanguage } from '../../../contexts/LanguageContext';

// Verified Artisan Products with blockchain certificates
const verifiedProducts = [
  {
    id: 'prod-001',
    name: 'Durga Idol - Ekchala Style',
    nameBengali: 'দুর্গা প্রতিমা - একচালা শৈলী',
    category: 'Clay Sculpture',
    artist: {
      name: 'Kartik Pal',
      nameBengali: 'কার্তিক পাল',
      location: 'Kumartuli, Kolkata',
      verified: true,
      rating: 4.9,
      sales: 156,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
    },
    images: [
      'https://images.unsplash.com/photo-1599030641314-e7f9e2f5e8e1?auto=format&fit=crop&w=600&h=600&q=80',
      'https://images.unsplash.com/photo-1599030641314-e7f9e2f5e8e1?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    inStock: true,
    handmade: true,
    deliveryDays: '15-20',
    description: 'Hand-crafted Durga idol using traditional Ekchala technique. Made with Ganges clay and natural pigments. Each piece is unique and comes with a certificate of authenticity.',
    descriptionBengali: 'ঐতিহ্যবাহী একচালা কৌশল ব্যবহার করে হাতে তৈরি দুর্গা প্রতিমা। গঙ্গার মাটি এবং প্রাকৃতিক রঞ্জক দিয়ে তৈরি।',
    materials: ['Ganges Clay', 'Natural Pigments', 'Straw', 'Jute'],
    dimensions: '24 x 12 x 36 inches',
    weight: '15 kg',
    certificationId: 'KUM-2024-001-DRG',
    blockchainHash: '0x7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d',
    featured: true
  },
  {
    id: 'prod-002',
    name: 'Ramayana Patachitra Scroll',
    nameBengali: 'রামায়ণ পটচিত্র স্ক্রোল',
    category: 'Patachitra',
    artist: {
      name: 'Mrinmoyee Devi',
      nameBengali: 'মৃন্ময়ী দেবী',
      location: 'Naya, Pingla',
      verified: true,
      rating: 4.8,
      sales: 89,
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80'
    },
    images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    inStock: true,
    handmade: true,
    deliveryDays: '10-15',
    description: 'Authentic Patachitra scroll depicting scenes from Ramayana. Painted using traditional natural pigments on handmade paper. UNESCO recognized folk art form.',
    descriptionBengali: 'রামায়ণের দৃশ্য চিত্রিত অথেন্টিক পটচিত্র স্ক্রোল। হাতে তৈরি কাগজে প্রাকৃতিক রঞ্জক ব্যবহার করে আঁকা।',
    materials: ['Handmade Paper', 'Natural Pigments', 'Tree Gum'],
    dimensions: '60 x 24 inches',
    weight: '0.5 kg',
    certificationId: 'PAT-2024-045-RAM',
    blockchainHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
    featured: true
  },
  {
    id: 'prod-003',
    name: 'Dokra Dancing Lady',
    nameBengali: 'ডোকরা নৃত্যরতা',
    category: 'Metal Craft',
    artist: {
      name: 'Abdul Karim',
      nameBengali: 'আবদুল করিম',
      location: 'Bikna, Bankura',
      verified: true,
      rating: 4.9,
      sales: 234,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80'
    },
    images: [
      'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    inStock: true,
    handmade: true,
    deliveryDays: '7-10',
    description: 'Lost-wax cast bronze figurine using 4000-year-old Dokra technique. Each piece is unique as the mold is destroyed after casting.',
    descriptionBengali: '৪০০০ বছরের পুরনো ডোকরা কৌশল ব্যবহার করে লস্ট-ওয়াক্স কাস্ট ব্রোঞ্জ মূর্তি।',
    materials: ['Bronze', 'Brass', 'Beeswax', 'Clay'],
    dimensions: '12 x 4 x 4 inches',
    weight: '2.5 kg',
    certificationId: 'DOK-2024-112-DNC',
    blockchainHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    featured: false
  },
  {
    id: 'prod-004',
    name: 'Baluchari Silk Saree',
    nameBengali: 'বালুচরী সিল্ক শাড়ি',
    category: 'Textile',
    artist: {
      name: 'Shyamal Das',
      nameBengali: 'শ্যামল দাস',
      location: 'Bishnupur, Bankura',
      verified: true,
      rating: 5.0,
      sales: 67,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
    },
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&h=600&q=80'
    ],
    price: 85000,
    originalPrice: 100000,
    discount: 15,
    inStock: true,
    handmade: true,
    deliveryDays: '20-30',
    description: 'Handwoven Baluchari silk saree with Mahabharata scenes on pallu. GI tagged product. Takes 15-45 days to weave a single piece.',
    descriptionBengali: 'পল্লুতে মহাভারতের দৃশ্য সহ হাতে বোনা বালুচরী সিল্ক শাড়ি। জিআই ট্যাগযুক্ত পণ্য।',
    materials: ['Pure Silk', 'Gold/Silver Zari'],
    dimensions: '5.5 meters with blouse piece',
    weight: '0.8 kg',
    certificationId: 'BAL-2024-023-MHB',
    blockchainHash: '0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    featured: true
  }
];

interface CartItem {
  product: typeof verifiedProducts[0];
  quantity: number;
}

const VerifiedMarketplace: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(verifiedProducts[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToCart = (product: typeof verifiedProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsPurchasing(false);
    setPurchaseComplete(true);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-kolkata-terracotta to-heritage-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heritage">
                Verified Artisan{' '}
                <AnimatedGradientText className="text-3xl">Marketplace</AnimatedGradientText>
                {' '}🛡️
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Blockchain-verified authentic handicrafts • <span className="font-bengali">প্রমাণিত শিল্প</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Blockchain Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl border border-green-200 dark:border-green-800">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Sepolia Testnet</span>
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCheckoutOpen(true)}
              className="relative bg-kolkata-terracotta text-white p-3 rounded-xl shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-durga-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </BlurFade>

      {/* Trust Badges */}
      <BlurFade delay={0.15} inView>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BadgeCheck, label: 'Verified Artisans', value: '50+' },
            { icon: Shield, label: 'Blockchain Certified', value: '100%' },
            { icon: Truck, label: 'Safe Delivery', value: 'Insured' },
            { icon: Award, label: 'GI Tagged', value: 'Authentic' }
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-kolkata-yellow/20 rounded-lg flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-kolkata-terracotta" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{badge.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{badge.label}</p>
              </div>
            </div>
          ))}
        </div>
      </BlurFade>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedProducts.map((product, index) => {
              const isFavorite = favorites.includes(product.id);
              const isSelected = selectedProduct.id === product.id;

              return (
                <BlurFade key={product.id} delay={0.1 * index} inView>
                  <MagicCard 
                    gradientColor={isSelected ? '#C45C26' : '#D4A015'} 
                    gradientOpacity={0.1}
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className={`relative ${isSelected ? 'ring-2 ring-kolkata-terracotta' : ''}`}>
                      {isSelected && <BorderBeam size={200} duration={15} />}
                      
                      {/* Image */}
                      <div className="relative h-48 rounded-t-xl overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {product.featured && (
                            <span className="px-2 py-1 bg-kolkata-yellow text-gray-900 rounded-full text-xs font-bold">
                              Featured
                            </span>
                          )}
                          {product.artist.verified && (
                            <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>

                        {/* Favorite */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                        >
                          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>

                        {/* Discount */}
                        {product.discount > 0 && (
                          <div className="absolute bottom-3 left-3 px-2 py-1 bg-durga-500 text-white rounded text-xs font-bold">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-kolkata-terracotta font-bengali">
                              {product.nameBengali}
                            </p>
                          </div>
                        </div>

                        {/* Artist */}
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={product.artist.avatar}
                            alt={product.artist.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {product.artist.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-kolkata-yellow text-kolkata-yellow" />
                            <span className="text-xs text-gray-600">{product.artist.rating}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-kolkata-terracotta">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-400 line-through ml-2">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="p-2 bg-kolkata-terracotta text-white rounded-lg hover:bg-kolkata-terracotta/90"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </BlurFade>
              );
            })}
          </div>
        </div>

        {/* Product Detail Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Selected Product */}
            <MagicCard gradientColor="#C45C26" gradientOpacity={0.15}>
              <div className="p-6">
                <BorderBeam size={200} duration={20} colorFrom="#C45C26" colorTo="#D4A015" />
                
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedProduct.name}
                </h2>
                <p className="text-kolkata-terracotta font-bengali mb-4">
                  {selectedProduct.nameBengali}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProduct.description}
                </p>

                {/* Artist Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                  <img
                    src={selectedProduct.artist.avatar}
                    alt={selectedProduct.artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedProduct.artist.name}
                      </span>
                      {selectedProduct.artist.verified && (
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{selectedProduct.artist.location}</p>
                  </div>
                </div>

                {/* Blockchain Certificate */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      Blockchain Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Certificate ID: {selectedProduct.certificationId}
                  </p>
                  <p className="text-xs text-gray-500 font-mono truncate">
                    {selectedProduct.blockchainHash}
                  </p>
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="text-xs text-green-600 hover:underline mt-2 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Certificate
                  </button>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-kolkata-terracotta">
                      ₹{selectedProduct.price.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500">
                      Delivery: {selectedProduct.deliveryDays} days
                    </p>
                  </div>
                </div>

                <ShimmerButton
                  className="w-full py-3"
                  background="linear-gradient(135deg, #C45C26 0%, #D4A015 100%)"
                  onClick={() => addToCart(selectedProduct)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </ShimmerButton>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isPurchasing && setIsCheckoutOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gradient-to-r from-kolkata-terracotta to-heritage-500 p-6">
                <BorderBeam size={300} duration={20} />
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  {purchaseComplete ? 'Purchase Complete!' : 'Checkout'}
                </h2>
                <p className="text-white/80 text-sm">
                  {purchaseComplete ? 'Your order has been placed' : 'Blockchain-verified purchase'}
                </p>
              </div>

              <div className="p-6">
                {!purchaseComplete ? (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {cart.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                      ) : (
                        cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <span className="font-bold text-kolkata-terracotta">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {cart.length > 0 && (
                      <>
                        {/* Total */}
                        <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                          <span className="text-2xl font-bold text-kolkata-terracotta">
                            ₹{cartTotal.toLocaleString()}
                          </span>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-3 mb-6">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</p>
                          <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 border-2 border-kolkata-terracotta bg-kolkata-terracotta/10 rounded-xl flex items-center gap-2">
                              <Wallet className="w-5 h-5 text-kolkata-terracotta" />
                              <span className="text-sm font-medium">Crypto Wallet</span>
                            </button>
                            <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-500">UPI/Cards</span>
                            </button>
                          </div>
                        </div>

                        {/* Purchase Button */}
                        <ShimmerButton
                          className="w-full py-4"
                          background="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                          onClick={handlePurchase}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Processing on Blockchain...</span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-5 h-5" />
                              <span>Complete Purchase</span>
                            </>
                          )}
                        </ShimmerButton>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Order Confirmed!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Your purchase has been recorded on the blockchain.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                      <p className="text-sm font-mono text-gray-900 dark:text-white">
                        0x8f7e6d5c4b3a2190...7a8b9c
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">View Receipt</span>
                      </button>
                      <button className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Certificate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-kolkata-cream to-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-heritage">
                  Certificate of Authenticity
                </h2>
                <p className="text-kolkata-terracotta">Blockchain Verified</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Product</span>
                  <span className="font-medium text-gray-900">{selectedProduct.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Artisan</span>
                  <span className="font-medium text-gray-900">{selectedProduct.artist.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Certificate ID</span>
                  <span className="font-mono text-sm text-gray-900">{selectedProduct.certificationId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Network</span>
                  <span className="font-medium text-gray-900">Ethereum Sepolia</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 text-center">
                <QrCode className="w-24 h-24 mx-auto mb-2 text-gray-400" />
                <p className="text-xs text-gray-500 font-mono break-all">
                  {selectedProduct.blockchainHash}
                </p>
              </div>

              <button
                className="w-full mt-6 py-3 bg-kolkata-terracotta text-white rounded-xl flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View on Etherscan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifiedMarketplace;


