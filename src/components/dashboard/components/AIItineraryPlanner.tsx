import React, { useState } from 'react';
import { Calendar, MapPin, Clock, DollarSign, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { destinations, itineraries } from '../../../data/mockData';

const AIItineraryPlanner: React.FC = () => {
  const [preferences, setPreferences] = useState({
    interests: [] as string[],
    budget: 'mid-range',
    travelStyle: 'solo',
    duration: 3,
    startDate: '',
    groupSize: 1
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock itinerary based on preferences
    const relevantDestinations = destinations.filter(d => 
      preferences.interests.length === 0 || preferences.interests.includes(d.category)
    );
    
    const mockItinerary = {
      id: Date.now().toString(),
      title: `AI-Generated ${preferences.duration}-Day Jharkhand Adventure`,
      duration: preferences.duration,
      destinations: relevantDestinations.slice(0, preferences.duration),
      dailyPlan: Array.from({ length: preferences.duration }, (_, index) => ({
        day: index + 1,
        destination: relevantDestinations[index % relevantDestinations.length],
        activities: [
          'Morning: Arrival and check-in',
          'Afternoon: Guided tour and exploration',
          'Evening: Local cultural experience'
        ],
        accommodation: 'Eco-friendly resort',
        meals: 'Traditional Jharkhandi cuisine',
        transport: 'Private vehicle with driver'
      })),
      estimatedCost: preferences.budget === 'budget' ? 8000 : preferences.budget === 'mid-range' ? 15000 : 25000,
      highlights: [
        'AI-optimized route planning',
        'Weather-based activity suggestions',
        'Local guide recommendations',
        'Cultural immersion experiences'
      ]
    };
    
    setGeneratedItinerary(mockItinerary);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Itinerary Planner ✨
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let our AI create the perfect Jharkhand adventure tailored just for you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preferences Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Tell us your preferences</h3>
            
            {/* Interests */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                What interests you? (Select multiple)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleInterestToggle(option.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      preferences.interests.includes(option.id)
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
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
                  <button
                    key={option.id}
                    onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      preferences.budget === option.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{option.range}</div>
                  </button>
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
                  <button
                    key={style.id}
                    onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      preferences.travelStyle === style.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.icon}</div>
                    <div className="text-sm font-medium">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trip Duration (days)
                </label>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={preferences.duration}
                  onChange={(e) => setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>1 day</span>
                  <span className="font-medium">{preferences.duration} days</span>
                  <span>14 days</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={preferences.startDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <button
              onClick={generateItinerary}
              disabled={isGenerating || preferences.interests.length === 0}
              className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-4 rounded-lg font-medium hover:from-green-700 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI is crafting your perfect itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Itinerary */}
        <div className="space-y-6">
          {generatedItinerary ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {generatedItinerary.title}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{generatedItinerary.duration} days</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span>₹{generatedItinerary.estimatedCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{generatedItinerary.destinations.length} destinations</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Highlights:</h4>
                {generatedItinerary.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Full Itinerary
                </button>
                <button className="w-full border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  Customize Further
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                AI Ready to Help!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Fill in your preferences and let our AI create the perfect Jharkhand itinerary for you.
              </p>
            </div>
          )}

          {/* Saved Itineraries */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Itineraries</h3>
            <div className="space-y-3">
              {itineraries.slice(0, 2).map((itinerary) => (
                <div key={itinerary.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{itinerary.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {itinerary.duration} days • ₹{itinerary.estimatedCost.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIItineraryPlanner;