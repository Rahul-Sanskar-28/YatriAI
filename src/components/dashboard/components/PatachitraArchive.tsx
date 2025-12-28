import React, { useState, useEffect } from 'react';
import { 
  Palette, Clock, Users, Heart, Share2, BookOpen, 
  Play, Volume2, VolumeX, Star, Filter, Search,
  Flame, Sparkles, Globe, Camera, Plus, Bookmark,
  Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle,
  Brush, Award, MapPin, Layers, Zap, PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import ImageUpload from './ImageUpload';

// Types
interface PattachitraArtwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiGeneratedStory: string;
  editedStory?: string;
  artistNotes: string;
  region: string;
  artStyle: string;
  colors: string[];
  techniques: string[];
  culturalSignificance: string;
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
    specialization?: string;
  };
}

interface PattachitraStats {
  totalArtworks: number;
  totalViews: number;
  artStyleStats: Record<string, number>;
  regionStats: Record<string, number>;
}

// API Service
class PattachitraService {
  private baseUrl = 'http://localhost:3001/api/pattachitra';

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token') || 'mock-token-guide-123456789';
    
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

  async getArtworks(params: {
    page?: number;
    limit?: number;
    artStyle?: string;
    region?: string;
    search?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    
    return this.request(`?${queryParams}`);
  }

  async getArtworkById(id: string) {
    return this.request(`/${id}`);
  }

  async createArtwork(artwork: Partial<PattachitraArtwork>) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(artwork),
    });
  }

  async updateArtwork(id: string, artwork: Partial<PattachitraArtwork>) {
    return this.request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artwork),
    });
  }

  async updateStory(id: string, editedStory: string) {
    return this.request(`/${id}/story`, {
      method: 'PATCH',
      body: JSON.stringify({ editedStory }),
    });
  }

  async deleteArtwork(id: string) {
    return this.request(`/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyArtworks() {
    return this.request('/my-artworks');
  }

  async getStats() {
    return this.request('/stats');
  }

  async uploadImage(file: File) {
    const token = localStorage.getItem('auth_token') || 'mock-token-guide-123456789';
    const formData = new FormData();
    formData.append('recipeImage', file); // Using same field name as recipe upload

    const response = await fetch(`${this.baseUrl}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }
}

const pattachitraService = new PattachitraService();

// Add Artwork Modal Component
const AddArtworkModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editArtwork?: PattachitraArtwork | null;
}> = ({ isOpen, onClose, onSuccess, editArtwork }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    artistNotes: '',
    region: '',
    artStyle: 'Traditional Pattachitra',
    colors: [''],
    techniques: [''],
    culturalSignificance: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editArtwork) {
      setFormData({
        title: editArtwork.title,
        description: editArtwork.description,
        imageUrl: editArtwork.imageUrl,
        artistNotes: editArtwork.artistNotes,
        region: editArtwork.region,
        artStyle: editArtwork.artStyle,
        colors: editArtwork.colors,
        techniques: editArtwork.techniques,
        culturalSignificance: editArtwork.culturalSignificance
      });
    }
  }, [editArtwork]);

  const addArrayItem = (field: 'colors' | 'techniques') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'colors' | 'techniques', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'colors' | 'techniques', index: number) => {
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
        colors: formData.colors.filter(item => item.trim()),
        techniques: formData.techniques.filter(item => item.trim())
      };

      if (editArtwork) {
        await pattachitraService.updateArtwork(editArtwork.id, cleanedData);
      } else {
        await pattachitraService.createArtwork(cleanedData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving artwork:', error);
      alert('Failed to save artwork. Please try again.');
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
              {editArtwork ? 'Edit Artwork' : 'Add New Pattachitra Artwork'}
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
                Artwork Title *
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
                Art Style *
              </label>
              <select
                value={formData.artStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, artStyle: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="Traditional Pattachitra">Traditional Pattachitra</option>
                <option value="Classical Pattachitra">Classical Pattachitra</option>
                <option value="Modern Pattachitra">Modern Pattachitra</option>
                <option value="Contemporary Pattachitra">Contemporary Pattachitra</option>
                <option value="Folk Art">Folk Art</option>
                <option value="Miniature Painting">Miniature Painting</option>
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

          {/* Image Upload */}
          <ImageUpload
            onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, imageUrl }))}
            currentImage={formData.imageUrl}
          />

          {/* Region and Cultural Significance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Region *
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                placeholder="e.g., Puri, Odisha"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cultural Significance
              </label>
              <input
                type="text"
                value={formData.culturalSignificance}
                onChange={(e) => setFormData(prev => ({ ...prev, culturalSignificance: e.target.value }))}
                placeholder="e.g., Depicts Jagannath festival traditions"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Colors Used */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Colors Used
            </label>
            {formData.colors.map((color, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateArrayItem('colors', index, e.target.value)}
                  placeholder={`Color ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('colors', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('colors')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Color
            </button>
          </div>

          {/* Techniques */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Techniques Used
            </label>
            {formData.techniques.map((technique, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={technique}
                  onChange={(e) => updateArrayItem('techniques', index, e.target.value)}
                  placeholder={`Technique ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.techniques.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('techniques', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('techniques')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Technique
            </button>
          </div>

          {/* Artist Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Artist Notes
            </label>
            <textarea
              value={formData.artistNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, artistNotes: e.target.value }))}
              rows={4}
              placeholder="Share your thoughts about this artwork, the inspiration behind it, or the process..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg hover:from-orange-700 hover:to-red-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (editArtwork ? 'Update Artwork' : 'Add Artwork')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Story Edit Modal Component
const StoryEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  artwork: PattachitraArtwork | null;
}> = ({ isOpen, onClose, onSuccess, artwork }) => {
  const [editedStory, setEditedStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (artwork) {
      setEditedStory(artwork.editedStory || artwork.aiGeneratedStory);
    }
  }, [artwork]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artwork) return;

    setIsSubmitting(true);
    try {
      await pattachitraService.updateStory(artwork.id, editedStory);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating story:', error);
      alert('Failed to update story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !artwork) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Story - {artwork.title}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              AI Generated Story (Original)
            </label>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {artwork.aiGeneratedStory}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Edited Story
            </label>
            <textarea
              value={editedStory}
              onChange={(e) => setEditedStory(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Edit the AI-generated story to add your personal touch and expertise..."
              required
            />
          </div>

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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg hover:from-purple-700 hover:to-indigo-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Pattachitra Archive Component
const PatachitraArchive: React.FC = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<PattachitraArtwork[]>([]);
  const [myArtworks, setMyArtworks] = useState<PattachitraArtwork[]>([]);
  const [stats, setStats] = useState<PattachitraStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<PattachitraArtwork | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<PattachitraArtwork | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [artStyleFilter, setArtStyleFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const isTourist = user?.role === 'tourist';
  const isGuide = user?.role === 'guide';
  const isAdmin = user?.role === 'admin';
  const canCreate = isTourist || isGuide || isAdmin;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const promises = [
        pattachitraService.getArtworks({ search: searchQuery, artStyle: artStyleFilter, region: regionFilter }),
        pattachitraService.getStats()
      ];

      if (canCreate) {
        promises.push(pattachitraService.getMyArtworks());
      }

      const results = await Promise.all(promises);
      
      setArtworks(results[0].data.artworks);
      setStats(results[1].data);
      
      if (canCreate && results[2]) {
        setMyArtworks(results[2].data.artworks);
      }
      
      if (results[0].data.artworks.length > 0 && !selectedArtwork) {
        setSelectedArtwork(results[0].data.artworks[0]);
      }
    } catch (error) {
      console.error('Error loading artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArtwork = async (artworkId: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      await pattachitraService.deleteArtwork(artworkId);
      loadData();
      if (selectedArtwork?.id === artworkId) {
        setSelectedArtwork(null);
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      alert('Failed to delete artwork');
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

  const currentArtworks = activeTab === 'all' ? artworks : myArtworks;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Palette className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Pattachitra Archive 🎨
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Traditional art with AI-powered storytelling • {stats?.totalArtworks || 0} artworks preserved
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
              placeholder="Search artworks..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Add Artwork Button - For Tourists, Guides and Admins */}
          {canCreate && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-700 hover:to-red-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Artwork
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          All Artworks ({artworks.length})
        </button>
        {canCreate && (
          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'my'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            My Artworks ({myArtworks.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={artStyleFilter}
          onChange={(e) => setArtStyleFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        >
          <option value="">All Art Styles</option>
          <option value="Traditional Pattachitra">Traditional Pattachitra</option>
          <option value="Classical Pattachitra">Classical Pattachitra</option>
          <option value="Modern Pattachitra">Modern Pattachitra</option>
          <option value="Contemporary Pattachitra">Contemporary Pattachitra</option>
          <option value="Folk Art">Folk Art</option>
          <option value="Miniature Painting">Miniature Painting</option>
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        >
          <option value="">All Regions</option>
          <option value="Puri">Puri, Odisha</option>
          <option value="Raghurajpur">Raghurajpur, Odisha</option>
          <option value="Kolkata">Kolkata, West Bengal</option>
          <option value="Bengal">Bengal</option>
        </select>

        <button
          onClick={loadData}
          className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentArtworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="relative h-48">
              <img
                src={artwork.imageUrl || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&h=300&q=80'}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-2 left-2">
                {getStatusBadge(artwork.status)}
              </div>

              {activeTab === 'my' && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingArtwork(artwork);
                      setShowAddModal(true);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArtwork(artwork);
                      setShowStoryModal(true);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <PenTool className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteArtwork(artwork.id);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{artwork.title}</h3>
                <p className="text-gray-200 text-sm">{artwork.artStyle}</p>
              </div>
            </div>

            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {artwork.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {artwork.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {artwork.views}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Brush className="w-4 h-4" />
                  {artwork.author.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-80">
              <img
                src={selectedArtwork.imageUrl || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&h=400&q=80'}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusBadge(selectedArtwork.status)}
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
                    {selectedArtwork.artStyle}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedArtwork.title}</h2>
                <p className="text-gray-200">by {selectedArtwork.author.name} • {selectedArtwork.region}</p>
              </div>
            </div>

            <div className="p-6">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Palette className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{selectedArtwork.artStyle}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{selectedArtwork.region}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Eye className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{selectedArtwork.views} views</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{selectedArtwork.likes} likes</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedArtwork.description}
                </p>
              </div>

              {/* AI Story */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    {selectedArtwork.editedStory ? 'Artist\'s Story' : 'AI-Generated Story'}
                  </h3>
                  {selectedArtwork.editedStory && (
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      Edited by Artist
                    </span>
                  )}
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedArtwork.editedStory || selectedArtwork.aiGeneratedStory}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colors and Techniques */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-500" />
                    Colors & Techniques
                  </h3>
                  
                  {selectedArtwork.colors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Colors Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtwork.colors.map((color, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-sm"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtwork.techniques.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Techniques:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtwork.techniques.map((technique, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cultural Significance & Artist Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Cultural Context
                  </h3>
                  
                  {selectedArtwork.culturalSignificance && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Cultural Significance:</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {selectedArtwork.culturalSignificance}
                      </p>
                    </div>
                  )}

                  {selectedArtwork.artistNotes && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Artist's Notes:</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                        "{selectedArtwork.artistNotes}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Artwork Modal */}
      <AddArtworkModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingArtwork(null);
        }}
        onSuccess={loadData}
        editArtwork={editingArtwork}
      />

      {/* Story Edit Modal */}
      <StoryEditModal
        isOpen={showStoryModal}
        onClose={() => setShowStoryModal(false)}
        onSuccess={loadData}
        artwork={selectedArtwork}
      />
    </div>
  );
};

export default PatachitraArchive;