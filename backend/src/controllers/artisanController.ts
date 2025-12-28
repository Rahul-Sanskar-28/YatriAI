import { Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler.js';
import { generateArtisanStory } from '../services/geminiService.js';

// Types
interface ArtisanProfile {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  experience: number; // years
  generation: string; // e.g., "5th Generation"
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
    verifiedAt?: Date;
    documents?: string[];
    notes?: string;
  };
  status: 'Draft' | 'Published' | 'Featured';
  authorId: string;
  views: number;
  likes: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    role: string;
  };
}

// Mock data store
let mockArtisans: ArtisanProfile[] = [
  {
    id: 'artisan_1',
    name: 'Kartik Pal',
    title: 'Master Craftsman',
    specialization: 'Kumartuli Clay Idol Making',
    location: 'Kumartuli, North Kolkata',
    experience: 45,
    generation: '5th Generation',
    profileImage: '/uploads/artisans/kartik_pal_profile.jpg',
    coverImage: '/uploads/artisans/kartik_pal_workshop.jpg',
    bio: 'Kartik Pal is a renowned clay idol maker from the historic Kumartuli district of Kolkata. Following in the footsteps of his forefathers, he has been crafting exquisite Durga idols for over four decades.',
    aiGeneratedStory: 'In the narrow lanes of Kumartuli, where the air is thick with the scent of wet clay and the sound of artisans at work, Kartik Pal continues a family tradition that spans five generations. At the age of 8, young Kartik first touched clay under his grandfather\'s watchful eyes. The clay speaks to you, his grandfather would say, and you must learn to listen. Today, at 53, Kartik\'s hands move with the wisdom of decades, shaping clay into divine forms that will soon grace pandals across Bengal during Durga Puja.',
    editedStory: null,
    skills: ['Clay Modeling', 'Traditional Sculpting', 'Idol Making', 'Color Application', 'Fine Detailing'],
    achievements: [
      'Featured in National Geographic documentary on Durga Puja',
      'Winner of State Artisan Award 2015',
      'UNESCO Recognition for Cultural Heritage Preservation 2020'
    ],
    products: ['Durga Idols', 'Kali Idols', 'Saraswati Idols', 'Custom Sculptures', 'Decorative Items'],
    gallery: [
      '/uploads/artisans/kartik_durga_1.jpg',
      '/uploads/artisans/kartik_workshop_1.jpg',
      '/uploads/artisans/kartik_process_1.jpg'
    ],
    contactInfo: {
      phone: '+91 98765 43210',
      address: '23, Kumartuli Street, North Kolkata',
      workshop: 'Pal Family Workshop, Kumartuli'
    },
    socialMedia: {
      facebook: 'kartikpal.kumartuli',
      instagram: '@kartikpal_artisan'
    },
    awards: [
      {
        title: 'National Award 2018',
        year: 2018,
        organization: 'Ministry of Culture, India',
        description: 'For excellence in traditional clay craftsmanship'
      },
      {
        title: 'State Artisan Award 2015',
        year: 2015,
        organization: 'West Bengal Government',
        description: 'Recognition for preserving cultural heritage'
      },
      {
        title: 'UNESCO Recognition 2020',
        year: 2020,
        organization: 'UNESCO',
        description: 'Cultural Heritage Preservation Award'
      }
    ],
    verification: {
      status: 'Verified',
      verifiedBy: 'admin-987654321',
      verifiedAt: new Date('2025-01-01'),
      documents: ['artisan_certificate.pdf', 'heritage_proof.pdf'],
      notes: 'Verified master craftsman with documented heritage'
    },
    status: 'Featured',
    authorId: 'seller-123456789',
    views: 1250,
    likes: 89,
    featured: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-15'),
    author: {
      id: 'seller-123456789',
      name: 'Heritage Crafts Collective',
      role: 'seller'
    }
  },
  {
    id: 'artisan_2',
    name: 'Mrinmoyee Devi',
    title: 'Master Weaver',
    specialization: 'Baluchari Silk Weaving',
    location: 'Bishnupur, Bankura',
    experience: 35,
    generation: '4th Generation',
    profileImage: '/uploads/artisans/mrinmoyee_profile.jpg',
    coverImage: '/uploads/artisans/mrinmoyee_loom.jpg',
    bio: 'Mrinmoyee Devi is a master weaver specializing in the intricate art of Baluchari silk sarees. Her work preserves the ancient storytelling tradition woven into fabric.',
    aiGeneratedStory: 'In the quiet town of Bishnupur, where the morning mist carries the rhythmic sound of looms, Mrinmoyee Devi weaves stories into silk. Each thread she places tells a tale from the Ramayana or Mahabharata, continuing a tradition that her great-grandmother began. The Baluchari sarees that emerge from her loom are not just garments, but chronicles of Bengali culture, each motif a chapter in an ancient story.',
    editedStory: null,
    skills: ['Silk Weaving', 'Pattern Design', 'Traditional Motifs', 'Color Coordination', 'Loom Operation'],
    achievements: [
      'Padma Shri Recommendation 2022',
      'National Handloom Award 2019',
      'Bengal Handloom Excellence Award 2017'
    ],
    products: ['Baluchari Sarees', 'Silk Stoles', 'Traditional Fabrics', 'Custom Weaves'],
    gallery: [
      '/uploads/artisans/mrinmoyee_saree_1.jpg',
      '/uploads/artisans/mrinmoyee_loom_1.jpg',
      '/uploads/artisans/mrinmoyee_process_1.jpg'
    ],
    contactInfo: {
      phone: '+91 97654 32109',
      address: 'Weaver\'s Colony, Bishnupur, Bankura',
      workshop: 'Devi Handloom Center'
    },
    socialMedia: {
      instagram: '@mrinmoyee_baluchari'
    },
    awards: [
      {
        title: 'National Handloom Award 2019',
        year: 2019,
        organization: 'Ministry of Textiles, India',
        description: 'Excellence in traditional handloom weaving'
      },
      {
        title: 'Bengal Handloom Excellence Award 2017',
        year: 2017,
        organization: 'West Bengal Handloom Board',
        description: 'Outstanding contribution to Baluchari weaving'
      }
    ],
    verification: {
      status: 'Verified',
      verifiedBy: 'admin-987654321',
      verifiedAt: new Date('2025-01-02'),
      documents: ['weaver_certificate.pdf', 'handloom_registration.pdf'],
      notes: 'Verified master weaver with authentic Baluchari expertise'
    },
    status: 'Published',
    authorId: 'admin-987654321',
    views: 890,
    likes: 67,
    featured: false,
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-10'),
    author: {
      id: 'admin-987654321',
      name: 'Admin User',
      role: 'admin'
    }
  },
  {
    id: 'artisan_3',
    name: 'Abdul Karim',
    title: 'Master Craftsman',
    specialization: 'Dokra Metal Cast',
    location: 'Dariapur, Bardhaman',
    experience: 28,
    generation: '3rd Generation',
    profileImage: '/uploads/artisans/abdul_karim_profile.jpg',
    bio: 'Abdul Karim specializes in the ancient art of Dokra metal casting, creating intricate bronze artifacts using the lost-wax technique.',
    aiGeneratedStory: 'In the village of Dariapur, where the sound of hammering metal echoes through narrow lanes, Abdul Karim practices the 4000-year-old art of Dokra casting. Using techniques passed down through generations, he transforms brass and bronze into exquisite figurines and decorative items. Each piece tells a story of tribal life, mythology, and the rich cultural heritage of Bengal.',
    editedStory: null,
    skills: ['Lost-wax Casting', 'Metal Working', 'Traditional Designs', 'Bronze Crafting', 'Tribal Art'],
    achievements: [
      'Featured in International Craft Fair 2021',
      'State Craft Award 2018'
    ],
    products: ['Dokra Figurines', 'Tribal Art', 'Bronze Decoratives', 'Custom Metal Work'],
    gallery: [
      '/uploads/artisans/abdul_dokra_1.jpg',
      '/uploads/artisans/abdul_workshop_1.jpg'
    ],
    contactInfo: {
      phone: '+91 96543 21098',
      address: 'Artisan Quarter, Dariapur, Bardhaman',
      workshop: 'Karim Metal Craft Center'
    },
    socialMedia: {},
    awards: [
      {
        title: 'State Craft Award 2018',
        year: 2018,
        organization: 'West Bengal Craft Council',
        description: 'Excellence in traditional metal craftsmanship'
      }
    ],
    verification: {
      status: 'Pending',
      documents: ['craft_certificate.pdf'],
      notes: 'Awaiting verification of traditional techniques'
    },
    status: 'Published',
    authorId: 'seller-456789123',
    views: 456,
    likes: 34,
    featured: false,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
    author: {
      id: 'seller-456789123',
      name: 'Bengal Craft Sellers',
      role: 'seller'
    }
  }
];

let nextId = 4;

// Helper functions
const generateId = () => `artisan_${nextId++}`;

const getUserFromToken = (req: Request) => {
  if (!req.user) return null;
  
  const userId = req.user.userId;
  const role = req.user.role;
  
  return {
    id: userId,
    role: role,
    name: role === 'admin' ? 'Admin User' : 
          role === 'seller' ? 'Seller User' : 'Tourist User'
  };
};

// Get all artisan profiles (accessible to all authenticated users)
export const getArtisanProfiles = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      specialization, 
      location, 
      search,
      status,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    // Filter published profiles for non-admin users
    let filteredProfiles = req.user?.role === 'admin' 
      ? mockArtisans 
      : mockArtisans.filter(profile => profile.status === 'Published' || profile.status === 'Featured');

    // Apply filters
    if (specialization) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.specialization.toLowerCase().includes((specialization as string).toLowerCase())
      );
    }

    if (location) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }

    if (status && req.user?.role === 'admin') {
      filteredProfiles = filteredProfiles.filter(profile => profile.status === status);
    }

    if (featured === 'true') {
      filteredProfiles = filteredProfiles.filter(profile => profile.featured);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.specialization.toLowerCase().includes(searchTerm) ||
        profile.location.toLowerCase().includes(searchTerm) ||
        profile.bio.toLowerCase().includes(searchTerm)
      );
    }

    // Sort profiles
    filteredProfiles.sort((a, b) => {
      const aValue = a[sortBy as keyof ArtisanProfile];
      const bValue = b[sortBy as keyof ArtisanProfile];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Paginate
    const paginatedProfiles = filteredProfiles.slice(skip, skip + Number(limit));
    const total = filteredProfiles.length;

    res.json({
      success: true,
      data: {
        profiles: paginatedProfiles,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get artisan profiles error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artisan profiles' });
  }
};

// Get single artisan profile by ID
export const getArtisanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profile = mockArtisans.find(p => p.id === id);

    if (!profile) {
      throw new AppError('Artisan profile not found', 404);
    }

    // Check access permissions
    const canView = profile.status === 'Published' || 
                   profile.status === 'Featured' || 
                   req.user?.role === 'admin' ||
                   req.user?.userId === profile.authorId;

    if (!canView) {
      throw new AppError('Artisan profile not found', 404);
    }

    // Increment view count
    profile.views += 1;

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Get artisan profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artisan profile' });
  }
};

// Create new artisan profile (Admin and Seller only)
export const createArtisanProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!['admin', 'seller'].includes(req.user.role)) {
      throw new AppError('Only admins and sellers can create artisan profiles', 403);
    }

    const {
      name,
      title,
      specialization,
      location,
      experience,
      generation,
      profileImage,
      coverImage,
      bio,
      skills,
      achievements,
      products,
      gallery,
      contactInfo,
      socialMedia,
      awards
    } = req.body;

    // Validate required fields
    if (!name || !specialization || !location || !bio) {
      throw new AppError('Missing required fields: name, specialization, location, bio', 400);
    }

    const user = getUserFromToken(req);
    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    // Generate AI story
    let aiGeneratedStory = '';
    try {
      aiGeneratedStory = await generateArtisanStory({
        name,
        specialization,
        location,
        experience: experience || 0,
        generation: generation || '',
        bio
      });
    } catch (error) {
      console.warn('Failed to generate AI story:', error);
      aiGeneratedStory = `${name} is a skilled artisan specializing in ${specialization} from ${location}. ${bio}`;
    }

    // Create profile
    const newProfile: ArtisanProfile = {
      id: generateId(),
      name,
      title: title || 'Artisan',
      specialization,
      location,
      experience: Number(experience) || 0,
      generation: generation || '',
      profileImage: profileImage || '',
      coverImage: coverImage || '',
      bio,
      aiGeneratedStory,
      editedStory: null,
      skills: Array.isArray(skills) ? skills : (skills ? [skills] : []),
      achievements: Array.isArray(achievements) ? achievements : (achievements ? [achievements] : []),
      products: Array.isArray(products) ? products : (products ? [products] : []),
      gallery: Array.isArray(gallery) ? gallery : (gallery ? [gallery] : []),
      contactInfo: contactInfo || {},
      socialMedia: socialMedia || {},
      awards: Array.isArray(awards) ? awards : [],
      verification: {
        status: 'Pending'
      },
      status: req.user.role === 'admin' ? 'Published' : 'Draft',
      authorId: req.user.userId,
      views: 0,
      likes: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    };

    mockArtisans.push(newProfile);

    res.status(201).json({
      success: true,
      data: newProfile,
      message: req.user.role === 'admin' 
        ? 'Artisan profile created and published successfully'
        : 'Artisan profile created successfully and saved as draft'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Create artisan profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to create artisan profile' });
  }
};

// Update artisan profile
export const updateArtisanProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;
    const updateData = req.body;

    const profileIndex = mockArtisans.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      throw new AppError('Artisan profile not found', 404);
    }

    const existingProfile = mockArtisans[profileIndex];

    // Check permissions: only owner or admin can update
    if (req.user.role !== 'admin' && req.user.userId !== existingProfile.authorId) {
      throw new AppError('Not authorized to update this profile', 403);
    }

    // Process arrays properly
    const processedData = {
      ...updateData,
      ...(updateData.skills && {
        skills: Array.isArray(updateData.skills) ? updateData.skills : [updateData.skills]
      }),
      ...(updateData.achievements && {
        achievements: Array.isArray(updateData.achievements) ? updateData.achievements : [updateData.achievements]
      }),
      ...(updateData.products && {
        products: Array.isArray(updateData.products) ? updateData.products : [updateData.products]
      }),
      ...(updateData.gallery && {
        gallery: Array.isArray(updateData.gallery) ? updateData.gallery : [updateData.gallery]
      }),
      updatedAt: new Date()
    };

    // Update profile
    mockArtisans[profileIndex] = { ...existingProfile, ...processedData };

    res.json({
      success: true,
      data: mockArtisans[profileIndex],
      message: 'Artisan profile updated successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update artisan profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update artisan profile' });
  }
};

// Delete artisan profile (Admin and owner only)
export const deleteArtisanProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;

    const profileIndex = mockArtisans.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      throw new AppError('Artisan profile not found', 404);
    }

    const existingProfile = mockArtisans[profileIndex];

    // Check permissions: only owner or admin can delete
    if (req.user.role !== 'admin' && req.user.userId !== existingProfile.authorId) {
      throw new AppError('Not authorized to delete this profile', 403);
    }

    mockArtisans.splice(profileIndex, 1);

    res.json({
      success: true,
      message: 'Artisan profile deleted successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Delete artisan profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete artisan profile' });
  }
};

// Get user's own profiles (Admin and Seller only)
export const getMyArtisanProfiles = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!['admin', 'seller'].includes(req.user.role)) {
      throw new AppError('Only admins and sellers can access this endpoint', 403);
    }

    const { page = 1, limit = 12, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let userProfiles = mockArtisans.filter(profile => profile.authorId === req.user!.userId);

    if (status) {
      userProfiles = userProfiles.filter(profile => profile.status === status);
    }

    // Sort by creation date (newest first)
    userProfiles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Paginate
    const paginatedProfiles = userProfiles.slice(skip, skip + Number(limit));
    const total = userProfiles.length;

    res.json({
      success: true,
      data: {
        profiles: paginatedProfiles,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Get my artisan profiles error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your artisan profiles' });
  }
};

// Admin: Verify artisan profile (Admin only)
export const verifyArtisanProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      throw new AppError('Admin access required', 403);
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['Verified', 'Rejected'].includes(status)) {
      throw new AppError('Invalid verification status', 400);
    }

    const profileIndex = mockArtisans.findIndex(p => p.id === id);
    if (profileIndex === -1) {
      throw new AppError('Artisan profile not found', 404);
    }

    const profile = mockArtisans[profileIndex];

    // Update verification status
    mockArtisans[profileIndex] = {
      ...profile,
      verification: {
        ...profile.verification,
        status: status as 'Verified' | 'Rejected',
        verifiedBy: req.user.userId,
        verifiedAt: new Date(),
        notes: notes || profile.verification.notes
      },
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: mockArtisans[profileIndex],
      message: `Artisan profile ${status.toLowerCase()} successfully`
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Verify artisan profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify artisan profile' });
  }
};

// Get artisan statistics
export const getArtisanStats = async (req: Request, res: Response) => {
  try {
    const publishedProfiles = mockArtisans.filter(profile => 
      profile.status === 'Published' || profile.status === 'Featured'
    );

    // Get specialization stats
    const specializationStats = publishedProfiles.reduce((acc, profile) => {
      acc[profile.specialization] = (acc[profile.specialization] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get location stats
    const locationStats = publishedProfiles.reduce((acc, profile) => {
      acc[profile.location] = (acc[profile.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get verification stats
    const verificationStats = mockArtisans.reduce((acc, profile) => {
      acc[profile.verification.status] = (acc[profile.verification.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get total stats
    const totalProfiles = publishedProfiles.length;
    const totalViews = publishedProfiles.reduce((sum, profile) => sum + profile.views, 0);
    const featuredCount = publishedProfiles.filter(p => p.featured).length;

    res.json({
      success: true,
      data: {
        totalProfiles,
        totalViews,
        featuredCount,
        specializationStats,
        locationStats,
        verificationStats
      }
    });
  } catch (error) {
    console.error('Get artisan stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artisan statistics' });
  }
};

// Upload artisan image
export const uploadArtisanImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!['admin', 'seller'].includes(req.user.role)) {
      throw new AppError('Only admins and sellers can upload images', 403);
    }

    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/artisans/${req.file.filename}`;
    
    console.log('✅ Artisan image uploaded:', {
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: imageUrl
    });

    res.json({
      success: true,
      data: {
        imageUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      message: 'Artisan image uploaded successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Upload artisan image error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};