import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Bus, Train, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { destinations } from '../../../data/mockData';

const InteractiveMap: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [userLocation, setUserLocation] = useState({ lat: 23.3441, lng: 85.3096 }); // Ranchi
  const [transportMode, setTransportMode] = useState<'bus' | 'train' | 'car'>('car');

  const transportOptions = [
    { id: 'bus', label: 'Bus', icon: Bus, color: 'text-blue-600' },
    { id: 'train', label: 'Train', icon: Train, color: 'text-green-600' },
    { id: 'car', label: 'Car', icon: Car, color: 'text-orange-600' }
  ];

  const liveTransportData = [
    { type: 'bus', route: 'Ranchi - Betla', time: '2:30 PM', status: 'On Time', delay: 0 },
    { type: 'train', route: 'Ranchi - Jamshedpur', time: '3:15 PM', status: 'Delayed', delay: 15 },
    { type: 'bus', route: 'Dhanbad - Hundru Falls', time: '4:00 PM', status: 'On Time', delay: 0 },
    { type: 'train', route: 'Bokaro - Ranchi', time: '5:45 PM', status: 'On Time', delay: 0 }
  ];

  const nearbyAttractions = [
    { name: 'Rock Garden', distance: '2.3 km', type: 'Park' },
    { name: 'Tagore Hill', distance: '3.1 km', type: 'Viewpoint' },
    { name: 'Kanke Dam', distance: '5.7 km', type: 'Lake' },
    { name: 'Birsa Zoological Park', distance: '8.2 km', type: 'Zoo' }
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Interactive Maps & Navigation 🗺️
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore Jharkhand with real-time location tracking and transport information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Container */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 to-blue-900 relative">
              {/* Mock Map Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Interactive Map View
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your current location: Ranchi, Jharkhand
                  </p>
                  <button
                    onClick={getCurrentLocation}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Current Location</span>
                  </button>
                </div>
              </div>

              {/* Destination Markers */}
              {destinations.map((destination, index) => (
                <button
                  key={destination.id}
                  onClick={() => setSelectedDestination(destination)}
                  className="absolute bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors transform hover:scale-110"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                >
                  <MapPin className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Map Controls */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {transportOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setTransportMode(option.id as any)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          transportMode === option.id
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${option.color}`} />
                        <span className="text-sm">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Destination Info */}
          {selectedDestination && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedDestination.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedDestination.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        12.5 km away
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        25 min drive
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Transport Updates */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Transport</span>
            </h3>
            
            <div className="space-y-3">
              {liveTransportData.map((transport, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {transport.type === 'bus' ? (
                        <Bus className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Train className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {transport.route}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transport.status === 'On Time'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}>
                      {transport.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{transport.time}</span>
                    {transport.delay > 0 && (
                      <span className="text-red-600 dark:text-red-400">
                        +{transport.delay} min
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Attractions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nearby Attractions
            </h3>
            
            <div className="space-y-3">
              {nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {attraction.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {attraction.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {attraction.distance}
                    </p>
                    <button className="text-xs text-green-600 hover:text-green-700 transition-colors">
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Download Offline Map
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Share Location
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;