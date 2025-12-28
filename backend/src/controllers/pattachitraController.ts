import { Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler.js';
import { generateArtStory } from '../services/geminiService.js';

// Mock data store (in production, this would be the database)
let mockPattachitra: any[] = [
  {
    id: 'patta_1',
    title: 'Jagannath Rath Yatra',
    description: 'Traditional Pattachitra depicting the grand Rath Yatra festival of Lord Jagannath',
    imageUrl: '/uploads/pattachitra/sample_jagannath_rath.jpg',
    aiGeneratedStory: 'In the sacred city of Puri, where the ocean meets devotion, Lord Jagannath embarks on his annual journey. The massive wooden chariots, adorned with vibrant fabrics and flowers, roll through streets filled with millions of devotees. This Pattachitra captures the divine moment when the Lord of the Universe blesses his people, as painted by generations of skilled artisans who have preserved this sacred tradition through their brushstrokes.',
    editedStory: null,
    artistNotes: 'This piece represents the culmination of three months of work, using traditional natural pigments and palm leaf canvas.',
    region: 'Puri, Odisha',
    artStyle: 'Traditional Pattachitra',
    colors: ['Vermillion', 'Yellow Ochre', 'Indigo', 'White', 'Black'],
    techniques: ['Natural Pigments', 'Palm Leaf Canvas', 'Fine Brush Work'],
    culturalSignificance: 'Represents the annual Rath Yatra festival, one of the most important Hindu festivals',
    status: 'Approved',
    authorId: '456789123',
    approvedBy: 'admin-987654321',
    approvedAt: new Date('2025-01-01'),
    views: 245,
    likes: 38,
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-10'),
    author: {
      id: 'guide-456789123',
      name: 'Rajesh Mahapatra',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Traditional Pattachitra Art'
    }
  },
  {
    id: 'patta_2',
    title: 'Radha Krishna Leela',
    description: 'Exquisite Pattachitra showcasing the eternal love story of Radha and Krishna',
    imageUrl: '/uploads/pattachitra/sample_radha_krishna.jpg',
    aiGeneratedStory: 'In the mystical groves of Vrindavan, where every leaf whispers tales of divine love, Radha and Krishna dance in eternal bliss. This Pattachitra painting captures their celestial romance through intricate brushwork and vibrant colors. The artist has masterfully depicted the divine couple surrounded by gopis and peacocks, symbolizing the soul\'s yearning for the divine. Each stroke tells a story of devotion, love, and spiritual awakening.',
    editedStory: 'In the sacred groves of Vrindavan, where divine love blooms eternal, Radha and Krishna dance in perfect harmony. This traditional Pattachitra brings to life their celestial romance through generations-old techniques passed down in my family. The vibrant colors and intricate details represent not just artistic skill, but deep spiritual devotion. Every element - from the peacocks to the lotus flowers - carries profound meaning in our cultural tradition.',
    artistNotes: 'This painting took four months to complete. I used traditional techniques learned from my grandfather, including natural pigments made from minerals and plants.',
    region: 'Raghurajpur, Odisha',
    artStyle: 'Classical Pattachitra',
    colors: ['Deep Blue', 'Golden Yellow', 'Rose Pink', 'Emerald Green', 'Pure White'],
    techniques: ['Natural Pigments', 'Cloth Canvas', 'Gold Leaf Work', 'Miniature Detailing'],
    culturalSignificance: 'Depicts the divine love of Radha-Krishna, central to Vaishnavism and Bengali culture',
    status: 'Approved',
    authorId: '456789123',
    approvedBy: 'admin-987654321',
    approvedAt: new Date('2025-01-02'),
    views: 189,
    likes: 29,
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-16'),
    author: {
      id: 'guide-456789123',
      name: 'Rajesh Mahapatra',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Traditional Pattachitra Art'
    }
  },
  {
    id: 'patta_3',
    title: 'Durga Mahishasura Mardini',
    description: 'Powerful depiction of Goddess Durga slaying the demon Mahishasura',
    imageUrl: '/uploads/pattachitra/sample_durga_mahishasura.jpg',
    aiGeneratedStory: 'When darkness threatened to engulf the world, the divine feminine power manifested as Goddess Durga. This Pattachitra masterpiece captures the climactic moment of her battle with Mahishasura, the buffalo demon. With her ten arms wielding divine weapons gifted by the gods, she represents the triumph of good over evil. The artist has brilliantly portrayed her fierce yet compassionate expression, surrounded by her lion mount and the cosmic energy that flows through her being.',
    editedStory: null,
    artistNotes: 'Created during Durga Puja season, this piece embodies the divine feminine power. The red background symbolizes Shakti energy.',
    region: 'Kolkata, West Bengal',
    artStyle: 'Modern Pattachitra',
    colors: ['Crimson Red', 'Golden Yellow', 'Deep Black', 'Pure White', 'Royal Blue'],
    techniques: ['Acrylic on Canvas', 'Traditional Motifs', 'Contemporary Styling'],
    culturalSignificance: 'Celebrates Durga Puja, the most important festival of Bengal',
    status: 'Pending',
    authorId: '789123456',
    views: 67,
    likes: 12,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    author: {
      id: 'guide-789123456',
      name: 'Priya Chatterjee',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: 'Contemporary Pattachitra'
    }
  }
];

let nextId = 4;

// Helper function to generate unique IDs
const generateId = () => `patta_${nextId++}`;

// Helper function to get user info from token
const getUserFromToken = (req: Request) => {
  if (!req.user) return null;
  
  const userId = req.user.userId;
  const role = req.user.role;
  
  return {
    id: userId,
    role: role,
    name: role === 'admin' ? 'Admin User' : 
          role === 'guide' ? 'Guide User' : 'Tourist User',
    avatar: role === 'admin' 
      ? 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      : role === 'guide'
      ? 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      : 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    specialization: role === 'guide' ? 'Traditional Art Guide' : undefined
  };
};

// Get all approved Pattachitra artworks (accessible to all authenticated users)
export const getPattachitraArtworks = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      artStyle, 
      region, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    // Filter approved artworks
    let filteredArtworks = mockPattachitra.filter(artwork => artwork.status === 'Approved');

    // Apply filters
    if (artStyle) {
      filteredArtworks = filteredArtworks.filter(artwork => artwork.artStyle === artStyle);
    }

    if (region) {
      filteredArtworks = filteredArtworks.filter(artwork => 
        artwork.region.toLowerCase().includes((region as string).toLowerCase())
      );
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredArtworks = filteredArtworks.filter(artwork => 
        artwork.title.toLowerCase().includes(searchTerm) ||
        artwork.description.toLowerCase().includes(searchTerm) ||
        artwork.culturalSignificance.toLowerCase().includes(searchTerm)
      );
    }

    // Sort artworks
    filteredArtworks.sort((a, b) => {
      const aValue = a[sortBy as string];
      const bValue = b[sortBy as string];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Paginate
    const paginatedArtworks = filteredArtworks.slice(skip, skip + Number(limit));
    const total = filteredArtworks.length;

    res.json({
      success: true,
      data: {
        artworks: paginatedArtworks,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get Pattachitra artworks error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artworks' });
  }
};

// Get single artwork by ID
export const getPattachitraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artwork = mockPattachitra.find(a => a.id === id);

    if (!artwork) {
      throw new AppError('Artwork not found', 404);
    }

    // Only allow viewing approved artworks unless user is admin or owner
    if (artwork.status !== 'Approved') {
      if (!req.user || (req.user.role !== 'admin' && req.user.userId !== artwork.authorId)) {
        throw new AppError('Artwork not found', 404);
      }
    }

    // Increment view count
    artwork.views += 1;

    res.json({
      success: true,
      data: artwork
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Get artwork error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artwork' });
  }
};

// Create new Pattachitra artwork (guides and admins only)
export const createPattachitraArtwork = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    // Only guides and admins can create artworks
    if (req.user.role !== 'guide' && req.user.role !== 'admin') {
      throw new AppError('Only guides and admins can create artworks', 403);
    }

    const {
      title,
      description,
      imageUrl,
      artistNotes,
      region,
      artStyle,
      colors,
      techniques,
      culturalSignificance
    } = req.body;

    // Validate required fields
    if (!title || !description || !imageUrl || !region || !artStyle) {
      throw new AppError('Missing required fields', 400);
    }

    const user = getUserFromToken(req);
    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    // Generate AI story for the artwork
    let aiGeneratedStory = '';
    try {
      aiGeneratedStory = await generateArtStory({
        title,
        description,
        artStyle,
        region,
        culturalSignificance: culturalSignificance || '',
        colors: Array.isArray(colors) ? colors : [],
        techniques: Array.isArray(techniques) ? techniques : []
      });
    } catch (error) {
      console.error('AI story generation failed:', error);
      aiGeneratedStory = `This beautiful ${artStyle} artwork titled "${title}" represents the rich cultural heritage of ${region}. The intricate details and traditional techniques showcase the artist's mastery of this ancient art form.`;
    }

    // Create artwork
    const newArtwork = {
      id: generateId(),
      title,
      description,
      imageUrl,
      aiGeneratedStory,
      editedStory: null,
      artistNotes: artistNotes || '',
      region,
      artStyle,
      colors: Array.isArray(colors) ? colors : (colors ? [colors] : []),
      techniques: Array.isArray(techniques) ? techniques : (techniques ? [techniques] : []),
      culturalSignificance: culturalSignificance || '',
      status: req.user.role === 'admin' ? 'Approved' : 'Pending',
      authorId: req.user.userId,
      approvedBy: req.user.role === 'admin' ? req.user.userId : null,
      approvedAt: req.user.role === 'admin' ? new Date() : null,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        specialization: user.specialization
      }
    };

    mockPattachitra.push(newArtwork);

    res.status(201).json({
      success: true,
      data: newArtwork,
      message: req.user.role === 'admin' 
        ? 'Artwork created and approved successfully'
        : 'Artwork created successfully and submitted for approval'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Create artwork error:', error);
    res.status(500).json({ success: false, message: 'Failed to create artwork' });
  }
};

// Update artwork (owner and admin only)
export const updatePattachitraArtwork = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;
    const updateData = req.body;

    const artworkIndex = mockPattachitra.findIndex(a => a.id === id);
    if (artworkIndex === -1) {
      throw new AppError('Artwork not found', 404);
    }

    const existingArtwork = mockPattachitra[artworkIndex];

    // Check permissions: only owner or admin can update
    if (req.user.role !== 'admin' && req.user.userId !== existingArtwork.authorId) {
      throw new AppError('Not authorized to update this artwork', 403);
    }

    // If non-admin updates an approved artwork, set status back to pending
    let statusUpdate = {};
    if (req.user.role !== 'admin' && existingArtwork.status === 'Approved') {
      statusUpdate = { status: 'Pending', approvedBy: null, approvedAt: null };
    }

    // Process arrays properly
    const processedData = {
      ...updateData,
      ...(updateData.colors && {
        colors: Array.isArray(updateData.colors) ? updateData.colors : [updateData.colors]
      }),
      ...(updateData.techniques && {
        techniques: Array.isArray(updateData.techniques) ? updateData.techniques : [updateData.techniques]
      }),
      ...statusUpdate,
      updatedAt: new Date()
    };

    // Update artwork
    mockPattachitra[artworkIndex] = { ...existingArtwork, ...processedData };

    res.json({
      success: true,
      data: mockPattachitra[artworkIndex],
      message: statusUpdate.status ? 'Artwork updated and resubmitted for approval' : 'Artwork updated successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update artwork error:', error);
    res.status(500).json({ success: false, message: 'Failed to update artwork' });
  }
};

// Update story (owner only - guides can edit AI-generated stories)
export const updateArtworkStory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;
    const { editedStory } = req.body;

    if (!editedStory || typeof editedStory !== 'string') {
      throw new AppError('Edited story is required', 400);
    }

    const artworkIndex = mockPattachitra.findIndex(a => a.id === id);
    if (artworkIndex === -1) {
      throw new AppError('Artwork not found', 404);
    }

    const existingArtwork = mockPattachitra[artworkIndex];

    // Only the owner (guide) can edit the story
    if (req.user.userId !== existingArtwork.authorId) {
      throw new AppError('Only the artwork owner can edit the story', 403);
    }

    // Update the edited story
    mockPattachitra[artworkIndex] = {
      ...existingArtwork,
      editedStory,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: mockPattachitra[artworkIndex],
      message: 'Story updated successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update story error:', error);
    res.status(500).json({ success: false, message: 'Failed to update story' });
  }
};

// Delete artwork (owner and admin only)
export const deletePattachitraArtwork = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;

    const artworkIndex = mockPattachitra.findIndex(a => a.id === id);
    if (artworkIndex === -1) {
      throw new AppError('Artwork not found', 404);
    }

    const existingArtwork = mockPattachitra[artworkIndex];

    // Check permissions: only owner or admin can delete
    if (req.user.role !== 'admin' && req.user.userId !== existingArtwork.authorId) {
      throw new AppError('Not authorized to delete this artwork', 403);
    }

    mockPattachitra.splice(artworkIndex, 1);

    res.json({
      success: true,
      message: 'Artwork deleted successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Delete artwork error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete artwork' });
  }
};

// Get user's own artworks (guides only)
export const getMyPattachitraArtworks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (req.user.role !== 'guide' && req.user.role !== 'admin') {
      throw new AppError('Only guides and admins can access this endpoint', 403);
    }

    const { page = 1, limit = 12, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let userArtworks = mockPattachitra.filter(artwork => artwork.authorId === req.user!.userId);

    if (status) {
      userArtworks = userArtworks.filter(artwork => artwork.status === status);
    }

    // Sort by creation date (newest first)
    userArtworks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Paginate
    const paginatedArtworks = userArtworks.slice(skip, skip + Number(limit));
    const total = userArtworks.length;

    res.json({
      success: true,
      data: {
        artworks: paginatedArtworks,
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
    console.error('Get my artworks error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your artworks' });
  }
};

// Admin: Get all artworks with any status
export const getAllPattachitraAdmin = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      status,
      artStyle,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    let filteredArtworks = [...mockPattachitra];

    // Apply filters
    if (status) {
      filteredArtworks = filteredArtworks.filter(artwork => artwork.status === status);
    }

    if (artStyle) {
      filteredArtworks = filteredArtworks.filter(artwork => artwork.artStyle === artStyle);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredArtworks = filteredArtworks.filter(artwork => 
        artwork.title.toLowerCase().includes(searchTerm) ||
        artwork.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort artworks
    filteredArtworks.sort((a, b) => {
      const aValue = a[sortBy as string];
      const bValue = b[sortBy as string];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Paginate
    const paginatedArtworks = filteredArtworks.slice(skip, skip + Number(limit));
    const total = filteredArtworks.length;

    // Get status counts
    const statusCounts = mockPattachitra.reduce((acc, artwork) => {
      acc[artwork.status] = (acc[artwork.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        artworks: paginatedArtworks,
        statusCounts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get all artworks admin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artworks' });
  }
};

// Admin: Approve/Reject artwork
export const updatePattachitraStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    const artworkIndex = mockPattachitra.findIndex(a => a.id === id);
    if (artworkIndex === -1) {
      throw new AppError('Artwork not found', 404);
    }

    const artwork = mockPattachitra[artworkIndex];

    // Update artwork status
    mockPattachitra[artworkIndex] = {
      ...artwork,
      status,
      approvedBy: req.user?.userId,
      approvedAt: status === 'Approved' ? new Date() : null,
      updatedAt: new Date()
    };

    if (status === 'Rejected' && rejectionReason) {
      console.log(`Artwork ${id} rejected. Reason: ${rejectionReason}`);
    }

    res.json({
      success: true,
      data: mockPattachitra[artworkIndex],
      message: `Artwork ${status.toLowerCase()} successfully`
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update artwork status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update artwork status' });
  }
};

// Get artwork statistics
export const getPattachitraStats = async (req: Request, res: Response) => {
  try {
    const approvedArtworks = mockPattachitra.filter(artwork => artwork.status === 'Approved');

    // Get art style counts
    const artStyleStats = approvedArtworks.reduce((acc, artwork) => {
      acc[artwork.artStyle] = (acc[artwork.artStyle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get region stats
    const regionStats = approvedArtworks.reduce((acc, artwork) => {
      acc[artwork.region] = (acc[artwork.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get total stats
    const totalArtworks = approvedArtworks.length;
    const totalViews = approvedArtworks.reduce((sum, artwork) => sum + artwork.views, 0);

    res.json({
      success: true,
      data: {
        totalArtworks,
        totalViews,
        artStyleStats,
        regionStats
      }
    });
  } catch (error) {
    console.error('Get Pattachitra stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artwork statistics' });
  }
};

// Upload Pattachitra image
export const uploadPattachitraImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    // Only guides and admins can upload
    if (req.user.role !== 'guide' && req.user.role !== 'admin') {
      throw new AppError('Only guides and admins can upload artwork images', 403);
    }

    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/pattachitra/${req.file.filename}`;
    
    console.log('✅ Pattachitra image uploaded:', {
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
      message: 'Artwork image uploaded successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Upload Pattachitra image error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};