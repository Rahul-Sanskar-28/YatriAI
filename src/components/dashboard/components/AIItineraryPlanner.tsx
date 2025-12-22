import React, { useState } from 'react';
import { Calendar, MapPin, Clock, DollarSign, Users, Sparkles, Wand2, Route, CheckCircle, Cloud, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, itineraries } from '../../../data/mockData';
import { MagicCard } from '../../magicui/MagicCard';
import { BorderBeam } from '../../magicui/BorderBeam';
import { ShimmerButton } from '../../magicui/ShimmerButton';
import { AnimatedGradientText } from '../../magicui/AnimatedGradientText';
import { BlurFade } from '../../magicui/BlurFade';
import { aiService, weatherService, type ItineraryPreferences, type GeneratedItinerary, type WeatherData } from '../../../lib/services';
import { useLanguage } from '../../../contexts/LanguageContext';

const AIItineraryPlanner: React.FC = () => {
  const { t } = useLanguage();
  const [preferences, setPreferences] = useState({
    interests: [] as string[],
    budget: 'mid-range' as 'budget' | 'mid-range' | 'luxury',
    travelStyle: 'solo' as 'solo' | 'couple' | 'family' | 'group',
    duration: 3,
    startDate: '',
    groupSize: 1
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [generationStep, setGenerationStep] = useState<string>('');

  const interestOptions = [
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'cultural', label: 'Cultural Heritage', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🏔️' },
    { id: 'spiritual', label: 'Spiritual Sites', icon: '🕉️' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'food', label: 'Local Cuisine', icon: '🍽️' }
  ];

  const budgetOptions = [
    { id: 'budget', label: 'Budget', range: '₹1,000-3,000/day', icon: '💰' },
    { id: 'mid-range', label: 'Mid-Range', range: '₹3,000-7,000/day', icon: '💳' },
    { id: 'luxury', label: 'Luxury', range: '₹7,000+/day', icon: '💎' }
  ];

  const travelStyles = [
    { id: 'solo', label: 'Solo Travel', icon: '🚶' },
    { id: 'couple', label: 'Couple', icon: '💑' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'group', label: 'Group', icon: '👥' }
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    setGenerationStep('Analyzing your preferences...');
    
    try {
      // Step 1: Fetch weather data via Beeceptor/service
      setGenerationStep('Checking weather conditions...');
      const weather = await weatherService.getWeather('Ranchi');
      setWeatherData(weather);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 2: Get travel recommendations
      setGenerationStep('Getting AI recommendations...');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Step 3: Generate itinerary via AI service (Beeceptor mock)
      setGenerationStep('Crafting your perfect itinerary...');
      const itineraryPrefs: ItineraryPreferences = {
        interests: preferences.interests,
        budget: preferences.budget,
        travelStyle: preferences.travelStyle,
        duration: preferences.duration,
        startDate: preferences.startDate,
        groupSize: preferences.groupSize,
      };
      
      const generatedResult = await aiService.generateItinerary(itineraryPrefs);
      
      // Step 4: Finalize
      setGenerationStep('Adding final touches...');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setGeneratedItinerary(generatedResult);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Fallback to local generation
      const relevantDestinations = destinations.filter(d => 
        preferences.interests.length === 0 || preferences.interests.includes(d.category)
      );
      
      setGeneratedItinerary({
        id: Date.now().toString(),
        title: `AI-Generated ${preferences.duration}-Day Jharkhand Adventure`,
        duration: preferences.duration,
        destinations: relevantDestinations.slice(0, preferences.duration).map(d => ({
          id: d.id,
          name: d.name,
          category: d.category,
          image: d.image,
          duration: '1 day'
        })),
        dailyPlan: Array.from({ length: preferences.duration }, (_, index) => ({
          day: index + 1,
          destination: relevantDestinations[index % relevantDestinations.length]?.name || 'Ranchi',
          activities: [
            'Morning: Arrival and check-in',
            'Afternoon: Guided tour and exploration',
            'Evening: Local cultural experience'
          ],
          accommodation: 'Eco-friendly resort',
          meals: ['Traditional Jharkhandi cuisine'],
          transport: 'Private vehicle with driver',
          estimatedCost: preferences.budget === 'budget' ? 2500 : preferences.budget === 'mid-range' ? 5000 : 10000
        })),
        estimatedCost: preferences.budget === 'budget' ? 8000 : preferences.budget === 'mid-range' ? 15000 : 25000,
        highlights: [
          'AI-optimized route planning',
          'Weather-based activity suggestions',
          'Local guide recommendations',
          'Cultural immersion experiences'
        ],
        tips: ['Carry cash for remote areas', 'Book guides in advance'],
        weather: weatherData?.conditions || 'Pleasant weather expected',
        bestTimeToVisit: 'Morning activities recommended'
      });
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div className="space-y-8">
      <BlurFade delay={0.1} inView>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wand2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Itinerary Planner{' '}
              <AnimatedGradientText className="text-3xl">✨</AnimatedGradientText>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Let our AI create the perfect Jharkhand adventure tailored just for you
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preferences Form */}
        <div className="lg:col-span-2 space-y-6">
          <BlurFade delay={0.2} inView>
            <MagicCard gradientColor="#22c55e" gradientOpacity={0.1}>
              <div className="p-6">
                <BorderBeam size={300} duration={15} colorFrom="#22c55e" colorTo="#f97316" />
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Tell us your preferences
                </h3>
                
                {/* Interests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    What interests you? (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInterestToggle(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                          preferences.interests.includes(option.id)
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg shadow-green-500/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 bg-white dark:bg-gray-800'
                        }`}
                      >
                        {preferences.interests.includes(option.id) && (
                          <motion.div
                            layoutId="interest-selected"
                            className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                          />
                        )}
                        <div className="relative z-10">
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-sm font-medium">{option.label}</div>
                        </div>
                        {preferences.interests.includes(option.id) && (
                          <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-green-500" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {budgetOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          preferences.budget === option.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg shadow-green-500/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="text-3xl mb-2">{option.icon}</div>
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{option.range}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Travel Style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {travelStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          preferences.travelStyle === style.id
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-lg shadow-green-500/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="text-2xl mb-1">{style.icon}</div>
                        <div className="text-sm font-medium">{style.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Duration and Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Trip Duration: <span className="text-green-600 font-bold">{preferences.duration} days</span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={preferences.duration}
                        onChange={(e) => setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>1 day</span>
                        <span>14 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={preferences.startDate}
                        onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <ShimmerButton
                  onClick={generateItinerary}
                  disabled={isGenerating || preferences.interests.length === 0}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>{generationStep || 'AI is crafting your perfect itinerary...'}</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      <span>Generate AI Itinerary</span>
                    </>
                  )}
                </ShimmerButton>
                
                {/* Weather Preview - fetched via Beeceptor */}
                {weatherData && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{weatherData.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {weatherData.temperature}°C - {weatherData.conditions}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Current weather at {weatherData.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </MagicCard>
          </BlurFade>
        </div>

        {/* Generated Itinerary */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {generatedItinerary ? (
              <BlurFade key="itinerary" delay={0.1} inView>
                <MagicCard gradientColor="#f97316" gradientOpacity={0.15}>
                  <div className="p-6 relative">
                    <BorderBeam size={200} duration={10} colorFrom="#f97316" colorTo="#22c55e" />
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Route className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Your AI Itinerary
                      </h3>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gradient mb-4">
                      {generatedItinerary.title}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>{generatedItinerary.duration} days</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span>₹{generatedItinerary.estimatedCost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{generatedItinerary.destinations.length} destinations</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h5 className="font-medium text-gray-900 dark:text-white text-sm">Highlights:</h5>
                      {generatedItinerary.highlights.map((highlight: string, index: number) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <ShimmerButton className="w-full py-3" background="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)">
                        View Full Itinerary
                      </ShimmerButton>
                      <button className="w-full border-2 border-green-500 text-green-600 dark:text-green-400 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors font-medium">
                        Customize Further
                      </button>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ) : (
              <BlurFade key="placeholder" delay={0.2} inView>
                <MagicCard gradientColor="#6366f1" gradientOpacity={0.1}>
                  <div className="p-8 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🤖
                    </motion.div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      AI Ready to Help!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Fill in your preferences and let our AI create the perfect Jharkhand itinerary for you.
                    </p>
                  </div>
                </MagicCard>
              </BlurFade>
            )}
          </AnimatePresence>

          {/* Saved Itineraries */}
          <BlurFade delay={0.3} inView>
            <MagicCard gradientColor="#8b5cf6" gradientOpacity={0.1}>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Saved Itineraries
                </h3>
                <div className="space-y-3">
                  {itineraries.slice(0, 2).map((itinerary, index) => (
                    <motion.div 
                      key={itinerary.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{itinerary.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {itinerary.duration} days • ₹{itinerary.estimatedCost.toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default AIItineraryPlanner;
