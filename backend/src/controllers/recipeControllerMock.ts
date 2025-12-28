import { Request, Response } from 'express';
import { AppError } from '../middleware/errorHandler.js';

// Mock data store (in production, this would be the database)
let mockRecipes: any[] = [
  {
    id: 'recipe_1',
    title: 'Authentic Kolkata Mishti Doi',
    description: 'Traditional Bengali sweet yogurt that melts in your mouth. A signature dessert from the City of Joy.',
    ingredients: [
      '1 liter full-fat milk',
      '4 tbsp sugar',
      '2 tbsp jaggery (gur)',
      '1/4 cup condensed milk',
      '1 tsp cardamom powder',
      'A pinch of saffron',
      '2 tbsp yogurt starter'
    ],
    instructions: [
      'Boil milk in a heavy-bottomed pan until it reduces to 3/4th of original quantity',
      'Add sugar and jaggery, stir until dissolved',
      'Let the milk cool to lukewarm temperature',
      'Add condensed milk, cardamom powder, and saffron',
      'Mix in yogurt starter gently',
      'Pour into earthen pots (bhaar) or glass containers',
      'Keep in a warm place for 6-8 hours to set',
      'Refrigerate before serving'
    ],
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    difficulty: 'Medium',
    category: 'Bengali_Sweets',
    tags: ['traditional', 'dessert', 'kolkata-special', 'vegetarian'],
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
    tips: [
      'Use earthen pots for authentic taste',
      'The milk should be lukewarm when adding yogurt starter',
      'Keep in a warm place for proper fermentation'
    ],
    story: 'Mishti Doi originated in Bengal and became synonymous with Kolkata\'s sweet culture. The earthen pots give it a unique flavor that cannot be replicated.',
    region: 'Kolkata',
    status: 'Approved',
    authorId: 'tourist-123456789',
    approvedBy: 'admin-987654321',
    approvedAt: new Date('2025-01-01'),
    views: 150,
    likes: 25,
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-15'),
    author: {
      id: 'tourist-123456789',
      name: 'Ravi Kumar',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  },
  {
    id: 'recipe_2',
    title: 'Street-Style Kolkata Puchka',
    description: 'The iconic street food of Kolkata - crispy puris filled with spicy tamarind water and chutneys.',
    ingredients: [
      '30 puchka puris (store-bought or homemade)',
      '2 cups tamarind water (tetuler jol)',
      '1 cup boiled chickpeas',
      '2 boiled potatoes, mashed',
      '1 tbsp chaat masala',
      '1 tsp black salt',
      '1 tsp roasted cumin powder',
      'Mint-coriander chutney',
      'Sweet tamarind chutney',
      'Chopped onions and green chilies'
    ],
    instructions: [
      'Prepare tamarind water by soaking tamarind in water for 2 hours, then strain',
      'Add black salt, chaat masala, and cumin powder to tamarind water',
      'Mix boiled chickpeas with mashed potatoes',
      'Make a small hole in each puri',
      'Fill with potato-chickpea mixture',
      'Add both chutneys',
      'Pour spiced tamarind water just before eating',
      'Garnish with chopped onions and green chilies'
    ],
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    category: 'Street_Food',
    tags: ['street-food', 'spicy', 'tangy', 'vegetarian', 'kolkata-famous'],
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Approved',
    authorId: 'admin-987654321',
    approvedBy: 'admin-987654321',
    approvedAt: new Date('2025-01-02'),
    views: 89,
    likes: 15,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
    author: {
      id: 'admin-987654321',
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  },
  {
    id: 'recipe_3',
    title: 'Traditional Bengali Fish Curry (Macher Jhol)',
    description: 'A light and flavorful Bengali fish curry that pairs perfectly with steamed rice.',
    ingredients: [
      '500g rohu or katla fish, cut in pieces',
      '2 potatoes, quartered',
      '1 tbsp mustard oil',
      '1 tsp panch phoron (Bengali five spice)',
      '2 bay leaves',
      '1 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tsp ginger-garlic paste',
      '2 tomatoes, chopped',
      '1 tsp cumin powder',
      '1 tsp coriander powder',
      'Salt to taste',
      'Fresh coriander leaves',
      '2 green chilies, slit'
    ],
    instructions: [
      'Marinate fish pieces with turmeric and salt for 15 minutes',
      'Heat mustard oil in a pan until smoking, then reduce heat',
      'Fry fish pieces until golden, remove and set aside',
      'In the same oil, fry potato pieces until golden',
      'Add panch phoron and bay leaves, let them splutter',
      'Add ginger-garlic paste and green chilies',
      'Add tomatoes and cook until soft',
      'Add all spice powders and cook for 2 minutes',
      'Add 2 cups water and bring to boil',
      'Add fried potatoes and fish pieces',
      'Simmer for 10-15 minutes until fish is cooked',
      'Garnish with fresh coriander'
    ],
    prepTime: 25,
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium',
    category: 'Fish_Curry',
    tags: ['traditional', 'bengali-cuisine', 'main-course', 'comfort-food'],
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Pending',
    authorId: 'tourist-123456789',
    views: 12,
    likes: 3,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
    author: {
      id: 'tourist-123456789',
      name: 'Ravi Kumar',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  }
];

let nextId = 4;

// Helper function to generate unique IDs
const generateId = () => `recipe_${nextId++}`;

// Helper function to get user info from token
const getUserFromToken = (req: Request) => {
  if (!req.user) return null;
  
  // Extract user ID from mock token format: mock-token-{role}-{userId}
  const userId = req.user.userId;
  const role = req.user.role;
  
  return {
    id: userId,
    role: role,
    name: role === 'admin' ? 'Admin User' : 'Tourist User',
    avatar: role === 'admin' 
      ? 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
      : 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  };
};

// Get all approved recipes (accessible to tourists and admins)
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      difficulty, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    // Filter approved recipes
    let filteredRecipes = mockRecipes.filter(recipe => recipe.status === 'Approved');

    // Apply filters
    if (category) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }

    if (difficulty) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort recipes
    filteredRecipes.sort((a, b) => {
      const aValue = a[sortBy as string];
      const bValue = b[sortBy as string];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Paginate
    const paginatedRecipes = filteredRecipes.slice(skip, skip + Number(limit));
    const total = filteredRecipes.length;

    res.json({
      success: true,
      data: {
        recipes: paginatedRecipes,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
  }
};

// Get single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recipe = mockRecipes.find(r => r.id === id);

    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    // Only allow viewing approved recipes unless user is admin or owner
    if (recipe.status !== 'Approved') {
      if (!req.user || (req.user.role !== 'admin' && req.user.userId !== recipe.authorId)) {
        throw new AppError('Recipe not found', 404);
      }
    }

    // Increment view count
    recipe.views += 1;

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Get recipe error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipe' });
  }
};

// Create new recipe
export const createRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      category,
      tags,
      image,
      videoUrl,
      nutritionInfo,
      tips,
      story,
      region
    } = req.body;

    // Validate required fields
    if (!title || !description || !ingredients || !instructions || !category) {
      throw new AppError('Missing required fields', 400);
    }

    const user = getUserFromToken(req);
    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    // Create recipe
    const newRecipe = {
      id: generateId(),
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      difficulty: difficulty || 'Medium',
      category,
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      image,
      videoUrl,
      nutritionInfo,
      tips: Array.isArray(tips) ? tips : (tips ? [tips] : []),
      story,
      region,
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
        avatar: user.avatar
      }
    };

    mockRecipes.push(newRecipe);

    res.status(201).json({
      success: true,
      data: newRecipe,
      message: req.user.role === 'admin' 
        ? 'Recipe created and approved successfully'
        : 'Recipe created successfully and submitted for approval'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Create recipe error:', error);
    res.status(500).json({ success: false, message: 'Failed to create recipe' });
  }
};

// Update recipe
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;
    const updateData = req.body;

    const recipeIndex = mockRecipes.findIndex(r => r.id === id);
    if (recipeIndex === -1) {
      throw new AppError('Recipe not found', 404);
    }

    const existingRecipe = mockRecipes[recipeIndex];

    // Check permissions: only owner or admin can update
    if (req.user.role !== 'admin' && req.user.userId !== existingRecipe.authorId) {
      throw new AppError('Not authorized to update this recipe', 403);
    }

    // If non-admin updates an approved recipe, set status back to pending
    let statusUpdate = {};
    if (req.user.role !== 'admin' && existingRecipe.status === 'Approved') {
      statusUpdate = { status: 'Pending', approvedBy: null, approvedAt: null };
    }

    // Process arrays properly
    const processedData = {
      ...updateData,
      ...(updateData.ingredients && {
        ingredients: Array.isArray(updateData.ingredients) ? updateData.ingredients : [updateData.ingredients]
      }),
      ...(updateData.instructions && {
        instructions: Array.isArray(updateData.instructions) ? updateData.instructions : [updateData.instructions]
      }),
      ...(updateData.tags && {
        tags: Array.isArray(updateData.tags) ? updateData.tags : [updateData.tags]
      }),
      ...(updateData.tips && {
        tips: Array.isArray(updateData.tips) ? updateData.tips : [updateData.tips]
      }),
      ...statusUpdate,
      updatedAt: new Date()
    };

    // Update recipe
    mockRecipes[recipeIndex] = { ...existingRecipe, ...processedData };

    res.json({
      success: true,
      data: mockRecipes[recipeIndex],
      message: statusUpdate.status ? 'Recipe updated and resubmitted for approval' : 'Recipe updated successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update recipe error:', error);
    res.status(500).json({ success: false, message: 'Failed to update recipe' });
  }
};

// Delete recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;

    const recipeIndex = mockRecipes.findIndex(r => r.id === id);
    if (recipeIndex === -1) {
      throw new AppError('Recipe not found', 404);
    }

    const existingRecipe = mockRecipes[recipeIndex];

    // Check permissions: only owner or admin can delete
    if (req.user.role !== 'admin' && req.user.userId !== existingRecipe.authorId) {
      throw new AppError('Not authorized to delete this recipe', 403);
    }

    mockRecipes.splice(recipeIndex, 1);

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Delete recipe error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete recipe' });
  }
};

// Get user's own recipes
export const getMyRecipes = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { page = 1, limit = 12, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let userRecipes = mockRecipes.filter(recipe => recipe.authorId === req.user!.userId);

    if (status) {
      userRecipes = userRecipes.filter(recipe => recipe.status === status);
    }

    // Sort by creation date (newest first)
    userRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Paginate
    const paginatedRecipes = userRecipes.slice(skip, skip + Number(limit));
    const total = userRecipes.length;

    res.json({
      success: true,
      data: {
        recipes: paginatedRecipes,
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
    console.error('Get my recipes error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your recipes' });
  }
};

// Admin: Get all recipes with any status
export const getAllRecipesAdmin = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      status,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    let filteredRecipes = [...mockRecipes];

    // Apply filters
    if (status) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.status === status);
    }

    if (category) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort recipes
    filteredRecipes.sort((a, b) => {
      const aValue = a[sortBy as string];
      const bValue = b[sortBy as string];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Paginate
    const paginatedRecipes = filteredRecipes.slice(skip, skip + Number(limit));
    const total = filteredRecipes.length;

    // Get status counts
    const statusCounts = mockRecipes.reduce((acc, recipe) => {
      acc[recipe.status] = (acc[recipe.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        recipes: paginatedRecipes,
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
    console.error('Get all recipes admin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
  }
};

// Admin: Approve/Reject recipe
export const updateRecipeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    const recipeIndex = mockRecipes.findIndex(r => r.id === id);
    if (recipeIndex === -1) {
      throw new AppError('Recipe not found', 404);
    }

    const recipe = mockRecipes[recipeIndex];

    // Update recipe status
    mockRecipes[recipeIndex] = {
      ...recipe,
      status,
      approvedBy: req.user?.userId,
      approvedAt: status === 'Approved' ? new Date() : null,
      updatedAt: new Date()
    };

    if (status === 'Rejected' && rejectionReason) {
      console.log(`Recipe ${id} rejected. Reason: ${rejectionReason}`);
    }

    res.json({
      success: true,
      data: mockRecipes[recipeIndex],
      message: `Recipe ${status.toLowerCase()} successfully`
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Update recipe status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update recipe status' });
  }
};

// Get recipe categories and stats
export const getRecipeStats = async (req: Request, res: Response) => {
  try {
    const approvedRecipes = mockRecipes.filter(recipe => recipe.status === 'Approved');

    // Get category counts
    const categoryStats = approvedRecipes.reduce((acc, recipe) => {
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get difficulty stats
    const difficultyStats = approvedRecipes.reduce((acc, recipe) => {
      acc[recipe.difficulty] = (acc[recipe.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get total stats
    const totalRecipes = approvedRecipes.length;
    const totalViews = approvedRecipes.reduce((sum, recipe) => sum + recipe.views, 0);

    res.json({
      success: true,
      data: {
        totalRecipes,
        totalViews,
        categoryStats,
        difficultyStats
      }
    });
  } catch (error) {
    console.error('Get recipe stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipe statistics' });
  }
};

// Upload recipe image
export const uploadRecipeImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    if (!req.file) {
      throw new AppError('No image file provided', 400);
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/uploads/recipes/${req.file.filename}`;
    
    console.log('✅ Recipe image uploaded:', {
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
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Upload recipe image error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};