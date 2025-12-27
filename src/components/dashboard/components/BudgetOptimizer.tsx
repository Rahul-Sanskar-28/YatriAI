import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingDown, 
  PieChart, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  Calculator,
  Percent,
  ArrowRight,
  Zap,
  Star,
  Clock,
  Utensils,
  Train,
  Hotel,
  Camera,
  X,
  Settings,
  User,
  Sparkles,
  Brain,
  ThumbsUp,
  ThumbsDown,
  Heart
} from 'lucide-react';

interface UserPreferences {
  transportation: {
    preferred: string;
    budget: string;
  };
  accommodation: {
    type: string;
    location: string;
  };
  dining: {
    style: string;
    cuisine: string;
  };
  general: {
    travelStyle: string;
    prioritySavings: boolean;
    localExperience: boolean;
    sustainabilityFocus: boolean;
  };
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  estimated: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface OptimizationRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  savings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  impact: 'low' | 'medium' | 'high';
}

interface AIRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  reasoning: string;
  currentCost: number;
  recommendedCost: number;
  savings: number;
  confidence: number;
  userMatch: number;
  alternatives: Array<{
    id: string;
    name: string;
    description: string;
    cost: number;
    rating: number;
    availability: 'high' | 'medium' | 'low';
    matchScore: number;
  }>;
  pros: string[];
  cons: string[];
  tips: string[];
}

interface BudgetOptimizerProps {
  totalBudget: number;
  categories: BudgetCategory[];
  onBudgetUpdate: (categories: BudgetCategory[]) => void;
  onOptimizationApply: (optimization: OptimizationRecommendation) => void;
}

const BudgetOptimizer: React.FC<BudgetOptimizerProps> = ({
  totalBudget,
  categories: initialCategories,
  onBudgetUpdate,
  onOptimizationApply
}) => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [optimizations, setOptimizations] = useState<OptimizationRecommendation[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    transportation: {
      preferred: 'mixed',
      budget: 'medium'
    },
    accommodation: {
      type: 'mid-range',
      location: 'central'
    },
    dining: {
      style: 'mixed',
      cuisine: 'mixed'
    },
    general: {
      travelStyle: 'mid-range',
      prioritySavings: false,
      localExperience: true,
      sustainabilityFocus: false
    }
  });
  const [showOptimizations, setShowOptimizations] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [budgetHealth, setBudgetHealth] = useState<'good' | 'warning' | 'danger'>('good');
  const [totalSavings, setTotalSavings] = useState(0);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [isAutoOptimizing, setIsAutoOptimizing] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([]);
  const [savedOptimizations, setSavedOptimizations] = useState<string[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info' | 'warning'} | null>(null);

  // Initialize budget categories with mock data
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setBudgetCategories(initialCategories);
    } else {
      // Mock data for demonstration
      const mockCategories: BudgetCategory[] = [
        {
          id: '1',
          name: 'Transportation',
          allocated: 15000,
          spent: 8500,
          estimated: 12000,
          icon: Train,
          color: 'from-blue-500 to-blue-600'
        },
        {
          id: '2',
          name: 'Accommodation',
          allocated: 25000,
          spent: 18000,
          estimated: 22000,
          icon: Hotel,
          color: 'from-purple-500 to-purple-600'
        },
        {
          id: '3',
          name: 'Food & Dining',
          allocated: 12000,
          spent: 7500,
          estimated: 10000,
          icon: Utensils,
          color: 'from-orange-500 to-orange-600'
        },
        {
          id: '4',
          name: 'Activities',
          allocated: 8000,
          spent: 3200,
          estimated: 6500,
          icon: Camera,
          color: 'from-green-500 to-green-600'
        }
      ];
      setBudgetCategories(mockCategories);
    }
  }, [initialCategories]);

  // Calculate budget health
  useEffect(() => {
    const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
    const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const spentPercentage = (totalSpent / totalAllocated) * 100;

    if (spentPercentage > 90) {
      setBudgetHealth('danger');
    } else if (spentPercentage > 75) {
      setBudgetHealth('warning');
    } else {
      setBudgetHealth('good');
    }
  }, [budgetCategories]);

  // Show notification helper
  const showNotification = (message: string, type: 'success' | 'info' | 'warning') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Update preferences helper
  const updatePreferences = (category: keyof UserPreferences, updates: any) => {
    setUserPreferences(prev => ({
      ...prev,
      [category]: { ...prev[category], ...updates }
    }));
  };

  // Generate AI recommendations based on user preferences
  const generateAIRecommendations = async () => {
    setIsGeneratingAI(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI recommendations based on preferences
    const mockRecommendations: AIRecommendation[] = [
      {
        id: '1',
        category: 'transportation',
        title: 'Switch to Metro + Walking Combination',
        description: 'Based on your mixed transportation preference, combining metro with short walks can save significantly.',
        reasoning: 'Your preference for mixed transportation and medium budget aligns perfectly with metro usage. Kolkata Metro is efficient and cost-effective.',
        currentCost: 12000,
        recommendedCost: 8500,
        savings: 3500,
        confidence: 92,
        userMatch: 88,
        alternatives: [
          {
            id: '1a',
            name: 'Metro Day Pass',
            description: 'Unlimited metro rides for the day',
            cost: 45,
            rating: 4.5,
            availability: 'high',
            matchScore: 95
          },
          {
            id: '1b',
            name: 'Metro + Bus Combo',
            description: 'Metro for long distances, bus for short trips',
            cost: 35,
            rating: 4.2,
            availability: 'high',
            matchScore: 85
          }
        ],
        pros: [
          'Significant cost savings',
          'Environmentally friendly',
          'Avoids traffic congestion',
          'Reliable timing'
        ],
        cons: [
          'Limited to metro routes',
          'May require some walking',
          'Peak hour crowds'
        ],
        tips: [
          'Buy weekly passes for better rates',
          'Use metro during off-peak hours',
          'Download metro map app for navigation'
        ]
      },
      {
        id: '2',
        category: 'accommodation',
        title: 'Heritage Area Homestay',
        description: 'Switch from mid-range hotel to authentic heritage homestay for cultural experience.',
        reasoning: 'Your preference for local experiences and central location makes heritage homestays perfect. They offer cultural immersion at lower costs.',
        currentCost: 22000,
        recommendedCost: 16000,
        savings: 6000,
        confidence: 85,
        userMatch: 92,
        alternatives: [
          {
            id: '2a',
            name: 'Kumartuli Heritage Home',
            description: 'Traditional Bengali home in artisan quarter',
            cost: 1800,
            rating: 4.7,
            availability: 'medium',
            matchScore: 95
          },
          {
            id: '2b',
            name: 'Shyambazar Family Stay',
            description: 'Family-run homestay near heritage sites',
            cost: 1500,
            rating: 4.4,
            availability: 'high',
            matchScore: 88
          }
        ],
        pros: [
          'Authentic cultural experience',
          'Home-cooked Bengali meals',
          'Local insights and guidance',
          'Cost-effective'
        ],
        cons: [
          'Less privacy than hotels',
          'Basic amenities',
          'Language barriers possible'
        ],
        tips: [
          'Book through verified platforms',
          'Communicate dietary preferences',
          'Learn basic Bengali phrases'
        ]
      }
    ];

    setAiRecommendations(mockRecommendations);
    setShowAIRecommendations(true);
    setIsGeneratingAI(false);
    showNotification('AI recommendations generated based on your preferences!', 'success');
  };

  // Auto-optimize budget
  const autoOptimize = async () => {
    setIsAutoOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Apply optimizations
    const optimizedCategories = budgetCategories.map(category => {
      let optimizedAmount = category.estimated;
      
      // Apply optimization logic based on category
      switch (category.name.toLowerCase()) {
        case 'transportation':
          optimizedAmount = Math.max(category.estimated * 0.7, category.spent);
          break;
        case 'accommodation':
          optimizedAmount = Math.max(category.estimated * 0.8, category.spent);
          break;
        case 'food & dining':
          optimizedAmount = Math.max(category.estimated * 0.85, category.spent);
          break;
        case 'activities':
          optimizedAmount = Math.max(category.estimated * 0.9, category.spent);
          break;
      }
      
      return {
        ...category,
        estimated: Math.round(optimizedAmount)
      };
    });

    setBudgetCategories(optimizedCategories);
    
    const totalSaved = budgetCategories.reduce((sum, cat, index) => 
      sum + (cat.estimated - optimizedCategories[index].estimated), 0
    );
    
    setTotalSavings(totalSaved);
    setIsAutoOptimizing(false);
    showNotification(`Auto-optimization complete! Saved ₹${totalSaved.toLocaleString()}`, 'success');
  };

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalEstimated = budgetCategories.reduce((sum, cat) => sum + cat.estimated, 0);
  const remainingBudget = totalBudget - totalSpent;
  const projectedSavings = totalAllocated - totalEstimated;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Optimizer</h2>
              <p className="text-gray-600 dark:text-gray-400">AI-powered budget optimization with personalized recommendations</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            budgetHealth === 'good' ? 'bg-green-100 text-green-800' :
            budgetHealth === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {budgetHealth === 'good' ? '✅ On Track' :
             budgetHealth === 'warning' ? '⚠️ Monitor' :
             '🚨 Over Budget'}
          </div>
        </div>

        {/* Budget Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ₹{totalBudget.toLocaleString()}
                </p>
              </div>
              <Calculator className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">Spent So Far</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Remaining</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  ₹{remainingBudget.toLocaleString()}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Projected Savings</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  ₹{projectedSavings.toLocaleString()}
                </p>
              </div>
              <Percent className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
          {budgetCategories.map((category) => {
            const IconComponent = category.icon;
            const spentPercentage = (category.spent / category.allocated) * 100;
            const estimatedPercentage = (category.estimated / category.allocated) * 100;
            
            return (
              <div key={category.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₹{category.spent.toLocaleString()} spent of ₹{category.allocated.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Estimated</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ₹{category.estimated.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Spent</span>
                    <span className="text-gray-600 dark:text-gray-400">{spentPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Estimated</span>
                    <span className="text-gray-600 dark:text-gray-400">{estimatedPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gray-400 dark:bg-gray-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(estimatedPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => setShowOptimizations(!showOptimizations)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showOptimizations ? 'Hide' : 'Show'} Optimizations
          </button>
          
          <button
            onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PieChart className="w-4 h-4" />
            Detailed Breakdown
          </button>
          
          <button
            onClick={autoOptimize}
            disabled={isAutoOptimizing}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Zap className="w-4 h-4" />
            {isAutoOptimizing ? 'Optimizing...' : 'Auto-Optimize'}
          </button>
        </div>

        {/* AI-Powered Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI-Powered Optimization
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get personalized recommendations based on your travel preferences
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {showPreferences ? 'Hide' : 'Set'} Preferences
            </button>
            <button
              onClick={generateAIRecommendations}
              disabled={isGeneratingAI}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isGeneratingAI ? 'Generating...' : 'Generate AI Recommendations'}
            </button>
            <button
              onClick={autoOptimize}
              disabled={isAutoOptimizing}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4" />
              {isAutoOptimizing ? 'Optimizing...' : 'Auto-Optimize'}
            </button>
          </div>
        </div>
      </div>

      {/* User Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPreferences(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Travel Preferences
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customize your preferences for personalized budget optimization
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Transportation Preferences */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Train className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Transportation</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Mode
                      </label>
                      <select
                        value={userPreferences.transportation.preferred}
                        onChange={(e) => updatePreferences('transportation', { preferred: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="metro">Metro Only</option>
                        <option value="taxi">Taxi/Cab</option>
                        <option value="bus">Bus</option>
                        <option value="walking">Walking + Public Transport</option>
                        <option value="mixed">Mixed (Recommended)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget Level
                      </label>
                      <select
                        value={userPreferences.transportation.budget}
                        onChange={(e) => updatePreferences('transportation', { budget: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="low">Low (₹500-1000)</option>
                        <option value="medium">Medium (₹1000-2500)</option>
                        <option value="high">High (₹2500+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Accommodation Preferences */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Hotel className="w-5 h-5 text-purple-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Accommodation</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Accommodation Type
                      </label>
                      <select
                        value={userPreferences.accommodation.type}
                        onChange={(e) => updatePreferences('accommodation', { type: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="hostel">Hostel/Backpacker</option>
                        <option value="budget-hotel">Budget Hotel</option>
                        <option value="mid-range">Mid-range Hotel</option>
                        <option value="luxury">Luxury Hotel</option>
                        <option value="homestay">Homestay</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Location
                      </label>
                      <select
                        value={userPreferences.accommodation.location}
                        onChange={(e) => updatePreferences('accommodation', { location: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="central">Central Kolkata</option>
                        <option value="heritage-area">Heritage Area</option>
                        <option value="business-district">Business District</option>
                        <option value="outskirts">Outskirts (Budget)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dining Preferences */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Utensils className="w-5 h-5 text-orange-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Dining</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Dining Style
                      </label>
                      <select
                        value={userPreferences.dining.style}
                        onChange={(e) => updatePreferences('dining', { style: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="street-food">Street Food Focus</option>
                        <option value="local-restaurants">Local Restaurants</option>
                        <option value="fine-dining">Fine Dining</option>
                        <option value="mixed">Mixed Experience</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cuisine Preference
                      </label>
                      <select
                        value={userPreferences.dining.cuisine}
                        onChange={(e) => updatePreferences('dining', { cuisine: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="bengali">Bengali Traditional</option>
                        <option value="north-indian">North Indian</option>
                        <option value="international">International</option>
                        <option value="mixed">Mixed Cuisines</option>
                      </select>
                    </div>
                  </div>

                  {/* General Preferences */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">General</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Travel Style
                      </label>
                      <select
                        value={userPreferences.general.travelStyle}
                        onChange={(e) => updatePreferences('general', { travelStyle: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="budget">Budget Traveler</option>
                        <option value="mid-range">Mid-range Comfort</option>
                        <option value="luxury">Luxury Experience</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={userPreferences.general.prioritySavings}
                          onChange={(e) => updatePreferences('general', { prioritySavings: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Priority on savings</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={userPreferences.general.localExperience}
                          onChange={(e) => updatePreferences('general', { localExperience: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Focus on local experiences</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={userPreferences.general.sustainabilityFocus}
                          onChange={(e) => updatePreferences('general', { sustainabilityFocus: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Sustainability focus</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button
                    onClick={() => {
                      setShowPreferences(false);
                      showNotification('Preferences saved! Generate AI recommendations for personalized suggestions.', 'success');
                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              {notification.type === 'info' && <Clock className="w-5 h-5" />}
              <span className="font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetOptimizer;