import React, { useState, useEffect } from 'react';
import { 
  Train, Bus, Clock, Navigation, Info, Volume2, 
  Sparkles, RefreshCw, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { TramIcon, HowrahBridgeIcon } from '../../kolkata/KolkataIcons';

// Kolkata Transport Data
const tramRoutes = [
  {
    id: 'tram-36',
    routeNumber: '36',
    name: 'Esplanade - Gariahat',
    from: 'Esplanade',
    to: 'Gariahat',
    stops: [
      { name: 'Esplanade', heritage: 'British-era commercial hub, near Victoria Memorial' },
      { name: 'Park Street', heritage: 'The party street of Kolkata, historic restaurants since 1800s' },
      { name: 'Hazra', heritage: 'Educational hub, near Presidency University' },
      { name: 'Kalighat', heritage: 'One of 51 Shakti Peethas, ancient Kali temple' },
      { name: 'Gariahat', heritage: 'Famous shopping district, traditional saree hub' }
    ],
    frequency: '15 min',
    status: 'running',
    nextArrival: 3,
    color: '#FFB800'
  },
  {
    id: 'tram-5',
    routeNumber: '5',
    name: 'Howrah Station - Esplanade',
    from: 'Howrah Station',
    to: 'Esplanade',
    stops: [
      { name: 'Howrah Station', heritage: 'Iconic railway terminus, built 1854, 23 platforms' },
      { name: 'Howrah Bridge', heritage: 'Cantilever bridge over Hooghly, no nuts & bolts used!' },
      { name: 'BBD Bagh', heritage: 'Writers\' Building, colonial-era administrative hub' },
      { name: 'Esplanade', heritage: 'Heart of Kolkata, near Victoria Memorial' }
    ],
    frequency: '20 min',
    status: 'running',
    nextArrival: 8,
    color: '#E23D28'
  },
  {
    id: 'tram-25',
    routeNumber: '25',
    name: 'Shyambazar - Tollygunge',
    from: 'Shyambazar',
    to: 'Tollygunge',
    stops: [
      { name: 'Shyambazar', heritage: 'Historic north Kolkata, famous Durga Puja pandals' },
      { name: 'Bagbazar', heritage: 'One of the oldest Durga Puja pandals (since 1919)' },
      { name: 'Sealdah', heritage: 'Major railway terminus, connects to entire Bengal' },
      { name: 'Park Circus', heritage: 'Multi-cultural area, famous for Biryani' },
      { name: 'Tollygunge', heritage: 'Tollywood film studios, Bengali cinema hub' }
    ],
    frequency: '12 min',
    status: 'delayed',
    nextArrival: 15,
    color: '#C45C26'
  }
];

const metroLines = [
  {
    id: 'metro-blue',
    name: 'Blue Line (North-South)',
    from: 'Dakshineswar',
    to: 'Kavi Subhash',
    stops: [
      { name: 'Dakshineswar', heritage: 'Famous Kali Temple, Ramakrishna connection' },
      { name: 'Dum Dum', heritage: 'Netaji Subhas Chandra Bose International Airport nearby' },
      { name: 'Shyambazar', heritage: 'Historic north Kolkata junction' },
      { name: 'Sovabazar', heritage: 'Raja Ram Mohan Roy\'s residence' },
      { name: 'Girish Park', heritage: 'Named after legendary theatre director Girish Ghosh' },
      { name: 'Mahatma Gandhi Road', heritage: 'College Street book market nearby' },
      { name: 'Central', heritage: 'Central Kolkata hub, Chandni Chowk' },
      { name: 'Park Street', heritage: 'Christmas celebrations, iconic restaurants' },
      { name: 'Maidan', heritage: 'Largest urban park in India, 1000+ acres' },
      { name: 'Rabindra Sadan', heritage: 'Cultural hub, Nandan cinema complex' },
      { name: 'Kalighat', heritage: 'Ancient Kali temple, Shakti Peetha' }
    ],
    status: 'running',
    frequency: '5 min',
    nextTrain: 2,
    color: '#1E3A5F'
  },
  {
    id: 'metro-green',
    name: 'Green Line (East-West)',
    from: 'Salt Lake Sector V',
    to: 'Howrah Maidan',
    stops: [
      { name: 'Salt Lake Sector V', heritage: 'IT hub, modern Kolkata' },
      { name: 'Karunamoyee', heritage: 'City Centre 2 mall area' },
      { name: 'Central Park', heritage: 'Largest artificial lake in Salt Lake' },
      { name: 'Sealdah', heritage: 'Historic railway station' },
      { name: 'Esplanade', heritage: 'Victoria Memorial, Maidan' },
      { name: 'Howrah Maidan', heritage: 'Near Howrah Bridge and Station' }
    ],
    status: 'running',
    frequency: '8 min',
    nextTrain: 4,
    color: '#2D5A27'
  }
];

const localTrains = [
  {
    id: 'sealdah-main',
    name: 'Sealdah Main Line',
    from: 'Sealdah',
    to: 'Ranaghat',
    majorStops: ['Sealdah', 'Dum Dum Jn', 'Barrackpore', 'Naihati', 'Ranaghat'],
    frequency: '10 min',
    status: 'running',
    nextTrain: 5,
    heritage: 'Connects to Krishnanagar, the clay idol hub'
  },
  {
    id: 'howrah-main',
    name: 'Howrah Main Line',
    from: 'Howrah',
    to: 'Bardhaman',
    majorStops: ['Howrah', 'Liluah', 'Bandel', 'Hooghly', 'Bardhaman'],
    frequency: '15 min',
    status: 'running',
    nextTrain: 8,
    heritage: 'Passes through historic Bandel Church area'
  },
  {
    id: 'circular',
    name: 'Kolkata Circular Railway',
    from: 'Majerhat',
    to: 'Dum Dum',
    majorStops: ['Majerhat', 'Park Circus', 'Ballygunge', 'Bidhannagar', 'Dum Dum'],
    frequency: '20 min',
    status: 'delayed',
    nextTrain: 12,
    heritage: 'Historic circular route, British-era infrastructure'
  }
];

const busRoutes = [
  {
    id: 'bus-s12',
    routeNumber: 'S12',
    name: 'Airport - Howrah',
    from: 'Airport',
    to: 'Howrah',
    type: 'AC Volvo',
    frequency: '20 min',
    status: 'running',
    nextBus: 7,
    heritage: 'Passes through Salt Lake IT hub and BBD Bagh'
  },
  {
    id: 'bus-230',
    routeNumber: '230',
    name: 'Garia - Esplanade',
    from: 'Garia',
    to: 'Esplanade',
    type: 'Non-AC',
    frequency: '10 min',
    status: 'running',
    nextBus: 3,
    heritage: 'Historic South Kolkata to Central route'
  },
  {
    id: 'bus-heritage',
    routeNumber: 'H1',
    name: 'Heritage Special',
    from: 'Victoria Memorial',
    to: 'Howrah Bridge',
    type: 'Heritage Bus',
    frequency: '30 min',
    status: 'running',
    nextBus: 15,
    heritage: 'Special heritage route with audio guide onboard!'
  }
];

const TransportTracker: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'tram' | 'metro' | 'train' | 'bus'>('tram');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [isLive, setIsLive] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Simulate countdown
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const tabs = [
    { id: 'tram', label: 'Tram', labelBn: 'ট্রাম', icon: TramIcon, color: '#FFB800', count: tramRoutes.length },
    { id: 'metro', label: 'Metro', labelBn: 'মেট্রো', icon: Train, color: '#1E3A5F', count: metroLines.length },
    { id: 'train', label: 'Local Train', labelBn: 'লোকাল ট্রেন', icon: Train, color: '#C45C26', count: localTrains.length },
    { id: 'bus', label: 'Bus', labelBn: 'বাস', icon: Bus, color: '#2D5A27', count: busRoutes.length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      case 'delayed': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'suspended': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const renderRouteList = () => {
    let routes: any[] = [];
    
    switch (activeTab) {
      case 'tram':
        routes = tramRoutes;
        break;
      case 'metro':
        routes = metroLines;
        break;
      case 'train':
        routes = localTrains;
        break;
      case 'bus':
        routes = busRoutes;
        break;
    }

    return (
      <div className="space-y-4">
        {routes.map((route, index) => (
          <BlurFade key={route.id} delay={0.05 * index} inView>
            <MagicCard
              gradientColor={route.color || '#FFB800'}
              gradientOpacity={0.1}
              className="cursor-pointer"
            >
              <div className="p-5 relative" onClick={() => setSelectedRoute(route)} role="button" tabIndex={0}>
                <BorderBeam size={200} duration={15} colorFrom={route.color} colorTo="#FFB800" />
                
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ backgroundColor: route.color }}
                      >
                        {route.routeNumber || route.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {route.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {route.from} → {route.to}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-kolkata-yellow" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Every {route.frequency}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-kolkata-terracotta" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {route.stops?.length || route.majorStops?.length || 0} {t('dashboard.stops')}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                        {route.status === 'running' ? '● Live' : route.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta text-white px-4 py-2 rounded-xl shadow-lg">
                      <p className="text-2xl font-bold">{route.nextArrival || route.nextTrain || route.nextBus}</p>
                      <p className="text-xs opacity-80">{t('dashboard.min')}</p>
                    </div>
                  </div>
                </div>

                {route.heritage && (
                  <div className="mt-4 p-3 bg-kolkata-yellow/10 dark:bg-kolkata-gold/10 rounded-lg border border-kolkata-yellow/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-kolkata-yellow flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-kolkata-terracotta dark:text-kolkata-gold">
                        {route.heritage}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-kolkata-yellow to-kolkata-terracotta rounded-2xl flex items-center justify-center shadow-lg">
              <TramIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heritage">
                {t('brand.name')}{' '}
                <AnimatedGradientText className="text-3xl">{t('dashboard.transport')}</AnimatedGradientText>
                {' '}🚃
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('dashboard.liveTracking')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isLive ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className={`text-sm font-medium ${isLive ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {isLive ? t('tips.live') : t('dashboard.pauseTour')}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
            </motion.button>

            <ShimmerButton
              background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
              onClick={() => setIsLive(!isLive)}
            >
              <Zap className="w-4 h-4" />
              <span>{isLive ? t('dashboard.pauseTour') : t('tips.live')}</span>
            </ShimmerButton>
          </div>
        </div>
      </BlurFade>

      {/* Transport Type Tabs */}
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedRoute(null);
                }}
                className={`relative p-5 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-white dark:bg-gray-800 shadow-lg' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                }`}
                style={{ 
                  borderColor: isActive ? tab.color : 'transparent',
                  boxShadow: isActive ? `0 0 0 3px ${tab.color}33` : undefined
                }}
              >
                {isActive && (
                  <BorderBeam size={150} duration={10} colorFrom={tab.color} colorTo="#FFB800" />
                )}
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${tab.color}20` }}
                  >
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: tab.color }}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">{tab.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bengali">{tab.labelBn}</p>
                  </div>
                  <div 
                    className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: tab.color }}
                  >
                    {tab.count}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </BlurFade>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Routes List */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderRouteList()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Route Details / Heritage Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <MagicCard gradientColor="#D4A015" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-heritage flex items-center gap-2">
                  <Info className="w-5 h-5 text-kolkata-yellow" />
                  {selectedRoute ? 'Route Details' : 'Heritage Highlights'}
                </h3>

                {selectedRoute ? (
                  <div className="space-y-4">
                    <div 
                      className="w-full h-20 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      style={{ backgroundColor: selectedRoute.color }}
                    >
                      {selectedRoute.routeNumber || selectedRoute.name}
                    </div>

                    <div className="space-y-3">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedRoute.from} → {selectedRoute.to}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-kolkata-yellow" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Every {selectedRoute.frequency}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRoute.status)}`}>
                          {selectedRoute.status === 'running' ? '● Running' : selectedRoute.status}
                        </span>
                      </div>
                    </div>

                    {/* Stops with Heritage Info */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Stops & Heritage</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                        {(selectedRoute.stops || selectedRoute.majorStops || []).map((stop: any, index: number) => {
                          const stopName = typeof stop === 'string' ? stop : stop.name;
                          const heritage = typeof stop === 'object' ? stop.heritage : null;
                          
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative pl-6 pb-3 border-l-2 border-kolkata-yellow/30 last:border-l-0"
                            >
                              <div 
                                className="absolute left-0 top-0 w-3 h-3 rounded-full transform -translate-x-1/2"
                                style={{ backgroundColor: selectedRoute.color }}
                              />
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{stopName}</p>
                              {heritage && (
                                <p className="text-xs text-kolkata-terracotta dark:text-kolkata-gold mt-1">
                                  {heritage}
                                </p>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <ShimmerButton
                      className="w-full mt-4"
                      background="linear-gradient(135deg, #FFB800 0%, #C45C26 100%)"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Audio Guide</span>
                    </ShimmerButton>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-kolkata-yellow/10 to-kolkata-terracotta/10 rounded-xl border border-kolkata-yellow/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TramIcon className="w-6 h-6 text-kolkata-yellow" />
                        <span className="font-semibold text-gray-900 dark:text-white">Asia's Oldest Tram</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Kolkata's tram network started in 1873 - the only operating tram system in India!
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-durga-500/10 to-kolkata-vermillion/10 rounded-xl border border-durga-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Train className="w-6 h-6 text-durga-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">India's First Metro</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Kolkata Metro opened in 1984 - India's first underground rail system!
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-heritage-500/10 to-kolkata-sepia/10 rounded-xl border border-heritage-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <HowrahBridgeIcon className="w-6 h-6 text-kolkata-terracotta" />
                        <span className="font-semibold text-gray-900 dark:text-white">Howrah Bridge</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Carries 100,000+ vehicles daily - no nuts or bolts used in construction!
                      </p>
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      <span className="font-bengali">একটি রুট নির্বাচন করুন</span>
                      <br />
                      Select a route to see heritage details
                    </p>
                  </div>
                )}
              </div>
            </MagicCard>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <BlurFade delay={0.4} inView>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tram Routes', value: '3', icon: '🚃', color: 'from-kolkata-yellow to-kolkata-gold' },
            { label: 'Metro Lines', value: '2', icon: '🚇', color: 'from-blue-500 to-blue-600' },
            { label: 'Local Trains', value: '3', icon: '🚆', color: 'from-kolkata-terracotta to-kolkata-maroon' },
            { label: 'Bus Routes', value: '3', icon: '🚌', color: 'from-green-500 to-green-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </BlurFade>
    </div>
  );
};

export default TransportTracker;


