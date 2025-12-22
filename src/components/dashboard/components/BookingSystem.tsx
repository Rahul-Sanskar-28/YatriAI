import React, { useState } from 'react';
import { Calendar, CreditCard, Shield, CheckCircle, Clock, AlertCircle, Ticket, Home, Users, ArrowRight, ExternalLink, Loader2, Wallet, Receipt, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookings } from '../../../data/mockData';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { WalletConnect, BlockchainVerification } from '../../blockchain';
import { blockchainService, paymentService, type VerificationResult, type PaymentResult, type PaymentIntent, type WalletState, type BlockchainRecord, isDodoPaymentsConfigured } from '../../../lib/services';
import { DodoPaymentsConfig, isMetaMaskAvailable, ActiveNetwork } from '../../../lib/services/config';
import { useLanguage } from '../../../contexts/LanguageContext';

const BookingSystem: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'new'>('current');
  const [verificationResults, setVerificationResults] = useState<Record<string, VerificationResult>>({});
  const [blockchainRecords, setBlockchainRecords] = useState<Record<string, BlockchainRecord>>({});
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  // Dodo Payments state
  const [paymentResults, setPaymentResults] = useState<Record<string, PaymentResult>>({});
  const [paymentStatuses, setPaymentStatuses] = useState<Record<string, PaymentIntent>>({});
  const [verifyingPayment, setVerifyingPayment] = useState<string | null>(null);
  
  // ETHIndia blockchain state
  const [walletState, setWalletState] = useState<WalletState>(blockchainService.getWalletState());
  const [recordingOnChain, setRecordingOnChain] = useState<string | null>(null);

  const currentBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const historyBookings = bookings.filter(b => b.status === 'cancelled');

  // Handle wallet connection (ETHIndia)
  const handleWalletConnect = (state: WalletState) => {
    setWalletState(state);
    console.log('🔗 Wallet connected:', state.address);
  };

  // Record booking on blockchain (requires wallet) - ETHIndia
  const handleRecordOnBlockchain = async (booking: typeof bookings[0]) => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setRecordingOnChain(booking.id);
    try {
      const record = await blockchainService.recordBooking({
        id: booking.id,
        userId: 'user-123', // Would come from auth context
        guideId: booking.type === 'guide' ? 'guide-456' : undefined,
        amount: booking.amount,
        type: booking.type,
        details: {
          title: booking.title,
          date: booking.date,
        },
      });

      setBlockchainRecords(prev => ({ ...prev, [booking.id]: record }));
      console.log('✅ Booking recorded on blockchain:', record.txHash);
    } catch (error: any) {
      console.error('Failed to record on blockchain:', error);
      alert(error.message || 'Failed to record on blockchain');
    } finally {
      setRecordingOnChain(null);
    }
  };

  // Verify booking on blockchain via ETHIndia service
  const handleVerifyOnBlockchain = async (bookingId: string, txHash: string) => {
    setVerifyingId(bookingId);
    try {
      const result = await blockchainService.verifyBooking(txHash);
      setVerificationResults(prev => ({ ...prev, [bookingId]: result }));
    } catch (error) {
      console.error('Blockchain verification failed:', error);
    } finally {
      setVerifyingId(null);
    }
  };

  // Process payment via Dodo Payments service
  const handleCompletePayment = async (booking: typeof bookings[0]) => {
    setProcessingPayment(booking.id);
    try {
      const result: PaymentResult = await paymentService.createPayment({
        amount: booking.amount,
        currency: DodoPaymentsConfig.DEFAULT_CURRENCY,
        description: booking.title,
        items: [{
          id: booking.id,
          name: booking.title,
          price: booking.amount,
          quantity: 1,
        }],
        metadata: {
          bookingId: booking.id,
          type: booking.type,
        }
      });

      if (result.success) {
        setPaymentResults(prev => ({ ...prev, [booking.id]: result }));
        
        // If Dodo Payments is configured and we have a checkout URL, redirect
        if (isDodoPaymentsConfigured() && result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
        } else if (result.redirectUrl) {
          // Show modal or redirect for mock payments
          console.log('💳 Payment initiated:', result);
          alert(`Payment initiated!\n\nPayment ID: ${result.paymentId}\nOrder ID: ${result.orderId || 'N/A'}\n\n${result.message || 'Please complete payment to confirm booking.'}`);
        }
      } else {
        alert('Payment creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('An error occurred while processing payment.');
    } finally {
      setProcessingPayment(null);
    }
  };

  // Verify payment status (Dodo Payments)
  const handleVerifyPayment = async (booking: typeof bookings[0]) => {
    const paymentResult = paymentResults[booking.id];
    if (!paymentResult?.paymentId) return;

    setVerifyingPayment(booking.id);
    try {
      const status = await paymentService.verifyPayment(paymentResult.paymentId);
      setPaymentStatuses(prev => ({ ...prev, [booking.id]: status }));
      
      if (status.status === 'completed') {
        alert(`✅ Payment verified!\n\nStatus: ${status.status}\nAmount: ${paymentService.formatAmount(status.amount)}\n\nReceipt: ${status.receiptUrl || 'Will be sent via email'}`);
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
    } finally {
      setVerifyingPayment(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const tabs = [
    { id: 'current', label: 'Current Bookings', count: currentBookings.length, icon: Ticket },
    { id: 'history', label: 'Booking History', count: historyBookings.length, icon: Clock },
    { id: 'new', label: 'New Booking', count: 0, icon: Calendar }
  ];

  return (
    <div className="space-y-8">
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Secure Booking System{' '}
                <AnimatedGradientText className="text-3xl">🔒</AnimatedGradientText>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Blockchain-verified bookings on {ActiveNetwork.name}
              </p>
            </div>
          </div>
          
          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            <WalletConnect 
              compact 
              onConnect={handleWalletConnect}
              onDisconnect={() => setWalletState(blockchainService.getWalletState())}
            />
          </div>
        </div>
      </BlurFade>

      {/* Tab Navigation */}
      <BlurFade delay={0.2} inView>
        <MagicCard gradientColor="#3b82f6" gradientOpacity={0.1}>
          <div className="p-2">
            <div className="flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id 
                          ? 'bg-white/20' 
                          : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </MagicCard>
      </BlurFade>

      {/* Current Bookings */}
      <AnimatePresence mode="wait">
        {activeTab === 'current' && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {currentBookings.map((booking, index) => (
              <BlurFade key={booking.id} delay={0.1 * index} inView>
                <MagicCard 
                  gradientColor={booking.status === 'confirmed' ? '#22c55e' : '#eab308'}
                  gradientOpacity={0.1}
                >
                  <div className="p-6 relative">
                    <BorderBeam 
                      size={300} 
                      duration={15} 
                      colorFrom={booking.status === 'confirmed' ? '#22c55e' : '#eab308'} 
                      colorTo="#3b82f6" 
                    />
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {booking.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>{new Date(booking.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                            <CreditCard className="w-4 h-4 text-green-500" />
                            <span className="font-semibold">₹{booking.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>

                    {/* Blockchain Verification Section */}
                    {(booking.blockchainHash || blockchainRecords[booking.id]) ? (
                      <BlockchainVerification
                        txHash={blockchainRecords[booking.id]?.txHash || booking.blockchainHash}
                        record={blockchainRecords[booking.id] || (verificationResults[booking.id]?.record as BlockchainRecord)}
                        showDetails={false}
                        className="mb-4"
                      />
                    ) : (
                      /* Record on Blockchain Button */
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-4 border border-amber-200 dark:border-amber-800"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                              Not Yet on Blockchain
                            </span>
                          </div>
                          {walletState.isConnected ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRecordOnBlockchain(booking)}
                              disabled={recordingOnChain === booking.id}
                              className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                              {recordingOnChain === booking.id ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  Recording...
                                </>
                              ) : (
                                <>
                                  <Shield className="w-3 h-3" />
                                  Record on {ActiveNetwork.name.split(' ')[0]}
                                </>
                              )}
                            </motion.button>
                          ) : (
                            <span className="text-xs text-amber-600 dark:text-amber-400">
                              Connect wallet to record
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                          Record this booking on the blockchain for immutable verification and transparency.
                        </p>
                      </motion.div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <ShimmerButton className="flex-1 py-2.5" background="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)">
                        View Details
                      </ShimmerButton>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        Contact Support
                      </motion.button>
                      {booking.status === 'pending' && (
                        <ShimmerButton 
                          className="flex-1 py-2.5" 
                          background="linear-gradient(135deg, #ea580c 0%, #f97316 100%)"
                          onClick={() => handleCompletePayment(booking)}
                          disabled={processingPayment === booking.id}
                        >
                          {processingPayment === booking.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Complete Payment
                            </>
                          )}
                        </ShimmerButton>
                      )}
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}

            {currentBookings.length === 0 && (
              <BlurFade delay={0.2} inView>
                <MagicCard className="text-center py-16">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    📅
                  </motion.div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    No Current Bookings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start planning your next Jharkhand adventure!
                  </p>
                  <ShimmerButton onClick={() => setActiveTab('new')}>
                    <Calendar className="w-5 h-5" />
                    Create New Booking
                  </ShimmerButton>
                </MagicCard>
              </BlurFade>
            )}
          </motion.div>
        )}

        {/* Booking History */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BlurFade delay={0.2} inView>
              <MagicCard gradientColor="#6366f1" gradientOpacity={0.1}>
                <div className="overflow-hidden rounded-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Booking
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                        {bookings.map((booking, index) => (
                          <motion.tr 
                            key={booking.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {booking.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {booking.type}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {new Date(booking.date).toLocaleDateString('en-IN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gradient">
                              ₹{booking.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="capitalize">{booking.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                              <button className="text-green-600 hover:text-green-800 dark:hover:text-green-400 transition-colors">
                                View
                              </button>
                              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
                                Download
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          </motion.div>
        )}

        {/* New Booking */}
        {activeTab === 'new' && (
          <motion.div
            key="new"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BlurFade delay={0.2} inView>
              <MagicCard gradientColor="#8b5cf6" gradientOpacity={0.1}>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    What would you like to book?
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Book a Guide',
                        description: 'Connect with verified local guides',
                        icon: Users,
                        color: 'from-blue-500 to-cyan-500',
                        emoji: '👨‍🏫'
                      },
                      {
                        title: 'Accommodation',
                        description: 'Eco-friendly stays and homestays',
                        icon: Home,
                        color: 'from-green-500 to-emerald-500',
                        emoji: '🏠'
                      },
                      {
                        title: 'Tour Packages',
                        description: 'Complete travel packages',
                        icon: Ticket,
                        color: 'from-orange-500 to-red-500',
                        emoji: '🎒'
                      }
                    ].map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative p-8 rounded-2xl text-left group overflow-hidden"
                      >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10 group-hover:opacity-100 transition-opacity duration-300`} />
                        
                        {/* Border */}
                        <div className="absolute inset-0 border-2 border-gray-200 dark:border-gray-700 rounded-2xl group-hover:border-transparent transition-colors" />
                        
                        <div className="relative z-10">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            className="text-5xl mb-4"
                          >
                            {option.emoji}
                          </motion.div>
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-white text-xl mb-2 transition-colors">
                            {option.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors mb-4">
                            {option.description}
                          </p>
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 group-hover:text-white font-medium text-sm transition-colors">
                            <span>Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingSystem;
