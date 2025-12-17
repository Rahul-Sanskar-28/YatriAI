import React, { useState } from 'react';
import { Calendar, CreditCard, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { bookings } from '../../../data/mockData';

const BookingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'new'>('current');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const currentBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const historyBookings = bookings.filter(b => b.status === 'cancelled');

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
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Secure Booking System 🔒
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Blockchain-verified bookings for complete trust and transparency
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'current', label: 'Current Bookings', count: currentBookings.length },
          { id: 'history', label: 'Booking History', count: historyBookings.length },
          { id: 'new', label: 'New Booking', count: 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Current Bookings */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          {currentBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {booking.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-4 h-4" />
                      <span>₹{booking.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                </div>
              </div>

              {booking.blockchainHash && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Blockchain Verified
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-mono">
                    Hash: {booking.blockchainHash}
                  </p>
                </div>
              )}

              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Contact Support
                </button>
                {booking.status === 'pending' && (
                  <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                    Complete Payment
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {currentBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Current Bookings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start planning your next Jharkhand adventure!
              </p>
              <button
                onClick={() => setActiveTab('new')}
                className="bg-gradient-to-r from-green-600 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-orange-600 transition-all duration-300"
              >
                Create New Booking
              </button>
            </div>
          )}
        </div>
      )}

      {/* Booking History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {booking.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ₹{booking.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 dark:hover:text-green-400 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* New Booking */}
      {activeTab === 'new' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Create New Booking
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Book a Guide',
                description: 'Connect with verified local guides',
                icon: '👨‍🏫',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Accommodation',
                description: 'Eco-friendly stays and homestays',
                icon: '🏠',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Tour Packages',
                description: 'Complete travel packages',
                icon: '🎒',
                color: 'from-orange-500 to-red-500'
              }
            ].map((option, index) => (
              <button
                key={index}
                className={`p-6 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-transparent hover:shadow-lg transition-all duration-300 text-left group bg-gradient-to-r ${option.color} hover:text-white`}
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-white mb-2">
                  {option.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSystem;