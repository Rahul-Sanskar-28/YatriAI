import React, { useState, useEffect } from 'react';
import { 
  Users, Clock, MapPin, Heart, Share2, BookOpen, 
  Play, Volume2, VolumeX, Star, Filter, Search,
  Award, Sparkles, Globe, Camera, Plus, Bookmark,
  Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle,
  Brush, PenTool, Phone, Mail, Facebook, Instagram,
  Youtube, ExternalLink, Verified, Trophy, Medal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import ImageUpload from './ImageUpload';

// Types
interface ArtisanProfile {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  experience: number;
  generation: string;
  profileImage: string;
  coverImage?: string;
  bio: string;
  aiGeneratedStory: string;
  editedStory?: string;
  skills: string[];
  achievements: string[];
  products: string[];
  gallery: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
    workshop?: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  awards: Array<{
    title: string;
    year: number;
    organization: string;
    description?: string;
  }>;
  verification: {
    status: 'Pending' | 'Verified' | 'Rejected';
    verifiedBy?: string;
    verifiedAt?: string;
    documents?: string[];
    notes?: string;
  };
  status: 'Draft' | 'Published' | 'Featured';
  authorId: string;
  views: number;
  likes: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
}

interface ArtisanStats {
  totalProfiles: number;
  totalViews: number;
  featuredCount: number;
  specializationStats: Record<string, number>;
  locationStats: Record<string, number>;
  verificationStats: Record<string, number>;
}

// API Service
class ArtisanService {
  private baseUrl = 'http://localhost:3001/api/artisans';

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token') || 'mock-token-seller-123456789';
    
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

  async getProfiles(params: {
    page?: number;
    limit?: number;
    specialization?: string;
    location?: string;
    search?: string;
    featured?: boolean;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    return this.request(`?${queryParams}`);
  }

  async getProfileById(id: string) {
    return this.request(`/${id}`);
  }

  async createProfile(profile: Partial<ArtisanProfile>) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProfile(id: string, profile: Partial<ArtisanProfile>) {
    return this.request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  async deleteProfile(id: string) {
    return this.request(`/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyProfiles() {
    return this.request('/my-profiles');
  }

  async verifyProfile(id: string, status: 'Verified' | 'Rejected', notes?: string) {
    return this.request(`/${id}/verify`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  async getStats() {
    return this.request('/stats');
  }

  async uploadImage(file: File) {
    const token = localStorage.getItem('auth_token') || 'mock-token-seller-123456789';
    const formData = new FormData();
    formData.append('recipeImage', file);

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

const artisanService = new ArtisanService();

// Add/Edit Profile Modal Component
const AddProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProfile?: ArtisanProfile | null;
}> = ({ isOpen, onClose, onSuccess, editProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialization: '',
    location: '',
    experience: 0,
    generation: '',
    profileImage: '',
    coverImage: '',
    bio: '',
    skills: [''],
    achievements: [''],
    products: [''],
    gallery: [''],
    contactInfo: {
      phone: '',
      email: '',
      address: '',
      workshop: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      youtube: ''
    },
    awards: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editProfile) {
      setFormData({
        name: editProfile.name,
        title: editProfile.title,
        specialization: editProfile.specialization,
        location: editProfile.location,
        experience: editProfile.experience,
        generation: editProfile.generation,
        profileImage: editProfile.profileImage,
        coverImage: editProfile.coverImage || '',
        bio: editProfile.bio,
        skills: editProfile.skills.length ? editProfile.skills : [''],
        achievements: editProfile.achievements.length ? editProfile.achievements : [''],
        products: editProfile.products.length ? editProfile.products : [''],
        gallery: editProfile.gallery.length ? editProfile.gallery : [''],
        contactInfo: editProfile.contactInfo,
        socialMedia: editProfile.socialMedia,
        awards: editProfile.awards
      });
    }
  }, [editProfile]);

  const addArrayItem = (field: 'skills' | 'achievements' | 'products' | 'gallery') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'skills' | 'achievements' | 'products' | 'gallery', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'skills' | 'achievements' | 'products' | 'gallery', index: number) => {
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
        skills: formData.skills.filter(item => item.trim()),
        achievements: formData.achievements.filter(item => item.trim()),
        products: formData.products.filter(item => item.trim()),
        gallery: formData.gallery.filter(item => item.trim())
      };

      if (editProfile) {
        await artisanService.updateProfile(editProfile.id, cleanedData);
      } else {
        await artisanService.createProfile(cleanedData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editProfile ? 'Edit Artisan Profile' : 'Add New Artisan Profile'}
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
                Artisan Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Master Craftsman, Master Weaver"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialization *
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                placeholder="e.g., Kumartuli Clay Idol Making"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Kumartuli, North Kolkata"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience (Years)
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generation
              </label>
              <input
                type="text"
                value={formData.generation}
                onChange={(e) => setFormData(prev => ({ ...prev, generation: e.target.value }))}
                placeholder="e.g., 5th Generation"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Biography *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              placeholder="Tell the story of this artisan's journey and expertise..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image
            </label>
            <ImageUpload
              onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, profileImage: imageUrl }))}
              currentImage={formData.profileImage}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Skills & Techniques
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateArrayItem('skills', index, e.target.value)}
                  placeholder={`Skill ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('skills')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Skill
            </button>
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Products & Creations
            </label>
            {formData.products.map((product, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={product}
                  onChange={(e) => updateArrayItem('products', index, e.target.value)}
                  placeholder={`Product ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('products', index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('products')}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              + Add Product
            </button>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Contact Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                value={formData.contactInfo.phone}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  contactInfo: { ...prev.contactInfo, phone: e.target.value }
                }))}
                placeholder="Phone Number"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  contactInfo: { ...prev.contactInfo, email: e.target.value }
                }))}
                placeholder="Email Address"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                value={formData.contactInfo.workshop}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  contactInfo: { ...prev.contactInfo, workshop: e.target.value }
                }))}
                placeholder="Workshop Name"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                value={formData.contactInfo.address}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  contactInfo: { ...prev.contactInfo, address: e.target.value }
                }))}
                placeholder="Address"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
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
              {isSubmitting ? 'Saving...' : (editProfile ? 'Update Profile' : 'Create Profile')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Artisan Chronicles Component
const ArtisanChronicles: React.FC = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ArtisanProfile[]>([]);
  const [myProfiles, setMyProfiles] = useState<ArtisanProfile[]>([]);
  const [stats, setStats] = useState<ArtisanStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<ArtisanProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<ArtisanProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'featured'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller';
  const canCreate = isAdmin || isSeller;
  const canVerify = isAdmin;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const promises = [
        artisanService.getProfiles({ 
          search: searchQuery, 
          specialization: specializationFilter, 
          location: locationFilter,
          featured: activeTab === 'featured' ? true : undefined
        }),
        artisanService.getStats()
      ];

      if (canCreate) {
        promises.push(artisanService.getMyProfiles());
      }

      const results = await Promise.all(promises);
      
      setProfiles(results[0].data.profiles);
      setStats(results[1].data);
      
      if (canCreate && results[2]) {
        setMyProfiles(results[2].data.profiles);
      }
      
      if (results[0].data.profiles.length > 0 && !selectedProfile) {
        setSelectedProfile(results[0].data.profiles[0]);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this artisan profile?')) return;

    try {
      await artisanService.deleteProfile(profileId);
      loadData();
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(null);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile');
    }
  };

  const handleVerifyProfile = async (profileId: string, status: 'Verified' | 'Rejected', notes?: string) => {
    try {
      await artisanService.verifyProfile(profileId, status, notes);
      loadData();
    } catch (error) {
      console.error('Error verifying profile:', error);
      alert('Failed to verify profile');
    }
  };

  const getVerificationBadge = (verification: ArtisanProfile['verification']) => {
    const badges = {
      Pending: { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
      Verified: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      Rejected: { color: 'bg-red-100 text-red-700', icon: XCircle }
    };
    
    const badge = badges[verification.status];
    const IconComponent = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <IconComponent className="w-3 h-3" />
        {verification.status}
      </span>
    );
  };

  const currentProfiles = activeTab === 'my' ? myProfiles : 
                         activeTab === 'featured' ? profiles.filter(p => p.featured) : 
                         profiles;

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
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Artisan Chronicles 🎨
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Preserving stories of Bengal's master craftspeople • {stats?.totalProfiles || 0} artisans featured
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
              placeholder="Search artisans..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Add Profile Button - Only for Sellers and Admins */}
          {canCreate && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-700 hover:to-red-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Artisan
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
          All Artisans ({profiles.length})
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'featured'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Featured ({stats?.featuredCount || 0})
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
            My Profiles ({myProfiles.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
          placeholder="Filter by specialization..."
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        />

        <input
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Filter by location..."
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
        />

        <button
          onClick={loadData}
          className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Artisan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedProfile(profile)}
          >
            <div className="relative h-48">
              <img
                src={profile.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=300&q=80'}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-2 left-2 flex gap-1">
                {getVerificationBadge(profile.verification)}
                {profile.featured && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              {activeTab === 'my' && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProfile(profile);
                      setShowAddModal(true);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(profile.id);
                    }}
                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{profile.name}</h3>
                <p className="text-gray-200 text-sm">{profile.title}</p>
                <p className="text-gray-300 text-xs">{profile.specialization}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{profile.location}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.experience} years • {profile.generation}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {profile.bio}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {profile.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {profile.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-80">
              <img
                src={selectedProfile.coverImage || selectedProfile.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=400&q=80'}
                alt={selectedProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              >
                <XCircle className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 mb-2">
                  {getVerificationBadge(selectedProfile.verification)}
                  {selectedProfile.featured && (
                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
                      Featured Artisan
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedProfile.name}</h2>
                <p className="text-gray-200">{selectedProfile.title} • {selectedProfile.specialization}</p>
                <p className="text-gray-300">{selectedProfile.location} • {selectedProfile.experience} years experience</p>
              </div>
            </div>

            <div className="p-6">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Brush className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{selectedProfile.specialization}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{selectedProfile.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{selectedProfile.experience} years</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">{selectedProfile.generation}</span>
                </div>
              </div>

              {/* Biography */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Biography</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedProfile.bio}
                </p>
              </div>

              {/* AI Story */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Artisan's Story
                </h3>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedProfile.editedStory || selectedProfile.aiGeneratedStory}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills and Products */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    Skills & Products
                  </h3>
                  
                  {selectedProfile.skills.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProfile.products.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Products:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.products.map((product, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Awards and Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Recognition & Contact
                  </h3>
                  
                  {selectedProfile.awards.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Awards:</h4>
                      <div className="space-y-2">
                        {selectedProfile.awards.map((award, index) => (
                          <div key={index} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <div className="font-medium text-sm">{award.title} ({award.year})</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{award.organization}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {(selectedProfile.contactInfo.phone || selectedProfile.contactInfo.email) && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Contact:</h4>
                      <div className="space-y-1 text-sm">
                        {selectedProfile.contactInfo.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{selectedProfile.contactInfo.phone}</span>
                          </div>
                        )}
                        {selectedProfile.contactInfo.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{selectedProfile.contactInfo.email}</span>
                          </div>
                        )}
                        {selectedProfile.contactInfo.workshop && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{selectedProfile.contactInfo.workshop}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Verification Controls */}
              {canVerify && selectedProfile.verification.status === 'Pending' && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Admin Verification</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVerifyProfile(selectedProfile.id, 'Verified')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </button>
                    <button
                      onClick={() => handleVerifyProfile(selectedProfile.id, 'Rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Profile Modal */}
      <AddProfileModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingProfile(null);
        }}
        onSuccess={loadData}
        editProfile={editingProfile}
      />
    </div>
  );
};

export default ArtisanChronicles;