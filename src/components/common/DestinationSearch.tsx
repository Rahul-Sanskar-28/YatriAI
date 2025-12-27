import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, X, Search, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { DestinationDetail } from './DestinationDetail';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  details?: {
    openingHours?: string;
    entryFee?: string;
    bestTimeToVisit?: string;
    estimatedDuration?: string;
    website?: string;
    phoneNumber?: string;
  };
  howToReach?: {
    nearestMetro?: string;
    nearestBusStop?: string;
    nearestRailway?: string;
    parkingAvailable?: boolean;
    accessibleBy?: string[];
    directions?: string;
    distanceFromCity?: number;
  };
  tags?: string[];
  amenities?: string[];
}

const DestinationSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState('');

  // Read query parameters
  const queryParam = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category') || '';
  const cityParam = searchParams.get('city') || '';

  const fetchDestinations = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (categoryParam) params.append('category', categoryParam);
      if (cityParam) params.append('city', cityParam);

      const response = await axios.get(
        `http://localhost:3001/api/destinations/search?${params.toString()}`
      );

      if (response.data.success) {
        setDestinations(response.data.data);
      } else {
        setError('No destinations found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search destinations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryParam) {
      setLocalSearch(queryParam);
      fetchDestinations(queryParam);
    }
  }, [queryParam, categoryParam, cityParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/search?query=${encodeURIComponent(localSearch)}${categoryParam ? `&category=${categoryParam}` : ''}${cityParam ? `&city=${cityParam}` : ''}`);
    }
  };

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-kolkata-yellow hover:text-kolkata-gold transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Destinations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {destinations.length} {destinations.length === 1 ? 'place' : 'places'} found
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search for places, landmarks, attractions..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-kolkata-yellow focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-kolkata-yellow animate-spin" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">Searching destinations...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => fetchDestinations(localSearch)}
              className="px-6 py-2 bg-kolkata-yellow text-white rounded-lg hover:bg-kolkata-gold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Destination Cards */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {selectedDestination ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="mb-4 flex items-center gap-2 text-kolkata-yellow hover:text-kolkata-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                  Back to Results
                </button>
                <DestinationDetail destination={selectedDestination} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleDestinationClick(destination)}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-kolkata-yellow/90 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-semibold text-white capitalize">{destination.category}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-kolkata-yellow transition-colors">
                        {destination.name}
                      </h3>
                      
                      {destination.location.address && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 mb-3">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{destination.location.address}</span>
                        </p>
                      )}

                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                        {destination.description}
                      </p>

                      {/* Transportation Icons */}
                      {destination.howToReach?.accessibleBy && destination.howToReach.accessibleBy.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {destination.howToReach.accessibleBy.slice(0, 3).map((transport) => (
                            <span
                              key={transport}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded capitalize"
                            >
                              {transport}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Click to view more */}
                      <div className="mt-4 text-kolkata-yellow text-sm font-semibold group-hover:underline">
                        View Details →
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* No Results */}
                {destinations.length === 0 && !loading && !error && (
                  <div className="col-span-full text-center py-12">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">No destinations found</p>
                    <p className="text-gray-500 dark:text-gray-500">Try searching with different keywords</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default DestinationSearch;
