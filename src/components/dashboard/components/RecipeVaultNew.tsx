import React, { useState, useEffect } from 'react';
import { 
  ChefHat, Clock, Users, Heart, Share2, BookOpen, 
  Play, Volume2, VolumeX, Star, Filter, Search,
  Flame, Sparkles, Globe, Camera, Plus, Bookmark,
  Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import ImageUpload from './ImageUpload';

// Types
interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
  nutritionInfo?: any;
  tips: string[];
  story?: string;
  region?: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  authorId: string;
  approvedBy?: string;
  approvedAt?: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface RecipeStats {
  totalRecipes: number;
  totalViews: number;
  categoryStats: Record<string, number>;
  difficultyStats: Record<string, number>;
}

// API Service
class RecipeService {
  private baseUrl = 'http://localhost:3001/api/recipes';

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token') || 'mock-token-tourist-123456789';
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  async getRecipes(params: {
    page?: number;
    limit?: number;
    category?: string;
    difficulty?: string;
    search?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    
    return this.request(`?${queryParams}`);
  }

  async getRecipeById(id: string) {
    return this.request(`/${id}`);
  }

  async createRecipe(recipe: Partial<Recipe>) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  }

  async updateRecipe(id: string, recipe: Partial<Recipe>) {
    return this.request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
    });
  }

  async deleteRecipe(id: string) {
    return this.request(`/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyRecipes() {
    return this.request('/my-recipes');
  }

  async getStats() {
    return this.request('/stats');
  }
}

const recipeService = new RecipeService();

// Add Recipe Modal Component
const AddRecipeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editRecipe?: Recipe | null;
}> = ({ isOpen, onClose, onSuccess, editRecipe }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    category: 'Bengali_Sweets',
    tags: [''],
    image: '',
    videoUrl: '',
    tips: [''],
    story: '',
    region: 'Bengal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editRecipe) {
      setFormData({
        title: editRecipe.title,
        description: editRecipe.description,
        ingredients: editRecipe.ingredients,
        instructions: editRecipe.instructions,
        prepTime: editRecipe.prepTime,
        cookTime: editRecipe.cookTime,
        servings: editRecipe.servings,
        difficulty: editRecipe.difficulty,
        category: editRecipe.category,
        tags: editRecipe.tags,
        image: editRecipe.image || '',
        videoUrl: editRecipe.videoUrl || '',
        tips: editRecipe.tips,
        story: editRecipe.story || '',
        region: editRecipe.region || 'Bengal'
      });
    }
  }, [editRecipe]);

  const addArrayItem = (field: 'ingredients' | 'instructions' | 'tags' | 'tips') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'ingredients' | 'instructions' | 'tags' | 'tips', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions' | 'tags' | 'tips', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(item => item.trim()),
        instructions: formData.instructions.filter(item => item.trim()),
        tags: formData.tags.filter(item => item.trim()),
        tips: formData.tips.filter(item => item.trim())
      };

      if (editRecipe) {
        await recipeService.updateRecipe(editRecipe.id, cleanedData);
      } else {
        await recipeService.createRecipe(cleanedData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editRecipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="Bengali_Sweets">Bengali Sweets</option>
                <option value="Street_Food">Street Food</option>
                <option value="Traditional_Meals">Traditional Meals</option>
                <option value="Festival_Specials">Festival Specials</option>
                <option value="Tea_Snacks">Tea Snacks</option>
                <option value="Fish_Curry">Fish Curry</option>
                <option value="Rice_Dishes">Rice Dishes</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Time and Servings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prep Time (min)
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={(e) => setFormData(prev => ({ ...prev, prepTime: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cook Time (min)
              </label>
              <input
                type="number"
                value={formData.cookTime}
                onChange={(e) => setFormData(prev => ({ ...prev, cookTime: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Servings
              </label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ingredients *
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateArrayItem('ingredients', index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instructions *
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <textarea
                  value={instruction}
                  onChange={(e) => updateArrayItem('instructions', index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows={2}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('instructions', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Step
            </button>
          </div>

          {/* Image Upload */}
          <ImageUpload
            onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
            currentImage={formData.image}
          />

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video URL (Optional)
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Region
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                placeholder="e.g., Bengal, Kolkata"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Family Story (Optional)
            </label>
            <textarea
              value={formData.story}
              onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
              rows={4}
              placeholder="Share the story behind this recipe..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateArrayItem('tags', index, e.target.value)}
                  placeholder={`Tag ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tags', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tags')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Tag
            </button>
          </div>

          {/* Tips */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cooking Tips
            </label>
            {formData.tips.map((tip, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tip}
                  onChange={(e) => updateArrayItem('tips', index, e.target.value)}
                  placeholder={`Tip ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.tips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tips', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tips')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Tip
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (editRecipe ? 'Update Recipe' : 'Add Recipe')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Recipe Vault Component
const RecipeVaultNew: React.FC = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [stats, setStats] = useState<RecipeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recipesRes, myRecipesRes, statsRes] = await Promise.all([
        recipeService.getRecipes({ search: searchQuery, category: categoryFilter, difficulty: difficultyFilter }),
        recipeService.getMyRecipes(),
        recipeService.getStats()
      ]);

      setRecipes(recipesRes.data.recipes);
      setMyRecipes(myRecipesRes.data.recipes);
      setStats(statsRes.data);
      
      if (recipesRes.data.recipes.length > 0 && !selectedRecipe) {
        setSelectedRecipe(recipesRes.data.recipes[0]);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await recipeService.deleteRecipe(recipeId);
      loadData();
      if (selectedRecipe?.id === recipeId) {
        setSelectedRecipe(null);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      Draft: { color: 'bg-gray-100 text-gray-700', icon: Edit },
      Pending: { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
      Approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      Rejected: { color: 'bg-red-100 text-red-700', icon: XCircle }
    };
    
    const badge = badges[status as keyof typeof badges];
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const currentRecipes = activeTab === 'all' ? recipes : myRecipes;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recipe Vault 🍛
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Preserving Bengali heritage recipes • {stats?.totalRecipes || 0} recipes preserved
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Recipe Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Recipe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          All Recipes ({recipes.length})
        </button>
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'my'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          My Recipes ({myRecipes.length})
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        >
          <option value="">All Categories</option>
          <option value="Bengali_Sweets">Bengali Sweets</option>
          <option value="Street_Food">Street Food</option>
          <option value="Traditional_Meals">Traditional Meals</option>
          <option value="Festival_Specials">Festival Specials</option>
          <option value="Tea_Snacks">Tea Snacks</option>
          <option value="Fish_Curry">Fish Curry</option>
          <option value="Rice_Dishes">Rice Dishes</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="relative h-48">
              <img
                src={recipe.image || 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&h=300&q=80'}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-2 left-2">
                {getStatusBadge(recipe.status)}
              </div>

              {activeTab === 'my' && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingRecipe(recipe);
                      setShowAddModal(true);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRecipe(recipe.id);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{recipe.title}</h3>
                <p className="text-gray-200 text-sm">{recipe.category.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {recipe.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.prepTime + recipe.cookTime}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servings}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {recipe.views}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {recipe.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  by {recipe.author.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedRecipe.image || 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&h=400&q=80'}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusBadge(selectedRecipe.status)}
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
                    {selectedRecipe.category.replace('_', ' ')}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedRecipe.title}</h2>
                <p className="text-gray-200">by {selectedRecipe.author.name}</p>
              </div>
            </div>

            <div className="p-6">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Prep: {selectedRecipe.prepTime}m</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Cook: {selectedRecipe.cookTime}m</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{selectedRecipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Flame className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">{selectedRecipe.difficulty}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedRecipe.description}
                </p>
              </div>

              {/* Story */}
              {selectedRecipe.story && (
                <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Family Story</h3>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    {selectedRecipe.story}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Ingredients
                  </h3>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Instructions
                  </h3>
                  <div className="space-y-4">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 pt-1">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips */}
              {selectedRecipe.tips.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-yellow-500" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-1">
                    {selectedRecipe.tips.map((tip, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {selectedRecipe.tags.length > 0 && (
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Recipe Modal */}
      <AddRecipeModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingRecipe(null);
        }}
        onSuccess={loadData}
        editRecipe={editingRecipe}
      />
    </div>
  );
};

export default RecipeVaultNew;