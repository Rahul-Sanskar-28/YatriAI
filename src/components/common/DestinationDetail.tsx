import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, Calendar, Globe, Phone, 
  Navigation, Train, Bus, Car, ParkingCircle, Info,
  Star, Tag, Accessibility
} from 'lucide-react';

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

interface DestinationDetailProps {
  destination: Destination;
  onClose?: () => void;
}

export const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination, onClose }) => {
  const { location, details, howToReach, tags, amenities } = destination;

  const getTransportIcon = (transport: string) => {
    const icons: Record<string, JSX.Element> = {
      metro: <Train className="w-4 h-4" />,
      bus: <Bus className="w-4 h-4" />,
      taxi: <Car className="w-4 h-4" />,
      car: <Car className="w-4 h-4" />,
      walking: <Navigation className="w-4 h-4" />,
      ferry: <Navigation className="w-4 h-4" />
    };
    return icons[transport.toLowerCase()] || <Navigation className="w-4 h-4" />;
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header Image */}
      <div className="relative h-64 md:h-96">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">{destination.rating}</span>
            </div>
            <span className="px-3 py-1 bg-kolkata-yellow/20 backdrop-blur-sm rounded-full text-white text-sm">
              {destination.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{destination.name}</h2>
          {location.address && (
            <p className="text-white/90 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {location.address}, {location.city}
            </p>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-kolkata-yellow" />
            About
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Key Details */}
        {details && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.openingHours && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-5 h-5 text-kolkata-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Opening Hours</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{details.openingHours}</p>
                </div>
              </div>
            )}
            
            {details.entryFee && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <DollarSign className="w-5 h-5 text-kolkata-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Entry Fee</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{details.entryFee}</p>
                </div>
              </div>
            )}
            
            {details.bestTimeToVisit && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="w-5 h-5 text-kolkata-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Best Time to Visit</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{details.bestTimeToVisit}</p>
                </div>
              </div>
            )}
            
            {details.estimatedDuration && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-5 h-5 text-kolkata-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Estimated Duration</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{details.estimatedDuration}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Information */}
        {(details?.website || details?.phoneNumber) && (
          <div className="flex flex-wrap gap-4">
            {details.website && (
              <a 
                href={details.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            )}
            {details.phoneNumber && (
              <a 
                href={`tel:${details.phoneNumber}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {details.phoneNumber}
              </a>
            )}
          </div>
        )}

        {/* How to Reach */}
        {howToReach && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-kolkata-yellow" />
              How to Reach
            </h3>

            {/* Transportation Options */}
            {howToReach.accessibleBy && howToReach.accessibleBy.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Accessible By:
                </p>
                <div className="flex flex-wrap gap-2">
                  {howToReach.accessibleBy.map((transport) => (
                    <span
                      key={transport}
                      className="flex items-center gap-1 px-3 py-1 bg-kolkata-yellow/10 text-kolkata-yellow border border-kolkata-yellow/30 rounded-full text-sm capitalize"
                    >
                      {getTransportIcon(transport)}
                      {transport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nearest Stations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {howToReach.nearestMetro && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Train className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Nearest Metro</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{howToReach.nearestMetro}</p>
                  </div>
                </div>
              )}
              
              {howToReach.nearestBusStop && (
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Bus className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Nearest Bus Stop</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{howToReach.nearestBusStop}</p>
                  </div>
                </div>
              )}
              
              {howToReach.nearestRailway && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <Train className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Nearest Railway</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{howToReach.nearestRailway}</p>
                  </div>
                </div>
              )}
              
              {howToReach.parkingAvailable && (
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <ParkingCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Parking</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Available on-site</p>
                  </div>
                </div>
              )}
            </div>

            {/* Distance from City */}
            {howToReach.distanceFromCity && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Distance from City Center:</span> {howToReach.distanceFromCity} km
                </p>
              </div>
            )}

            {/* Detailed Directions */}
            {howToReach.directions && (
              <div className="p-4 bg-kolkata-yellow/5 border border-kolkata-yellow/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Directions:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {howToReach.directions}
                </p>
              </div>
            )}

            {/* Google Maps Button */}
            <button
              onClick={openGoogleMaps}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-kolkata-yellow to-kolkata-gold text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <MapPin className="w-5 h-5" />
              Open in Google Maps
            </button>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-kolkata-yellow" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-kolkata-yellow" />
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                >
                  <div className="w-2 h-2 bg-kolkata-yellow rounded-full" />
                  <span className="capitalize">{amenity.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DestinationDetail;
