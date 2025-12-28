import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler.js';

const prisma = new PrismaClient();

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
    
    // Build filter conditions
    const where: any = {
      status: 'Approved' // Only show approved recipes to regular users
    };

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } }
      ];
    }

    // Get recipes with author information
    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc'
      },
      skip,
      take: Number(limit)
    });

    // Get total count for pagination
    const total = await prisma.recipe.count({ where });

    res.json({
      success: true,
      data: {
        recipes,
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

// Get single recipe by ID (accessible to tourists and admins)
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

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
    await prisma.recipe.update({
      where: { id },
      data: { views: { increment: 1 } }
    });

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

// Create new recipe (accessible to tourists and admins)
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

    // Create recipe with Draft status (requires admin approval)
    const recipe = await prisma.recipe.create({
      data: {
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
        authorId: req.user.userId,
        status: 'Pending' // Requires admin approval
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: recipe,
      message: 'Recipe created successfully and submitted for approval'
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    console.error('Create recipe error:', error);
    res.status(500).json({ success: false, message: 'Failed to create recipe' });
  }
};

// Update recipe (accessible to owner and admins)
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;
    const updateData = req.body;

    // Find existing recipe
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id }
    });

    if (!existingRecipe) {
      throw new AppError('Recipe not found', 404);
    }

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
      ...statusUpdate
    };

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: processedData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedRecipe,
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

// Delete recipe (accessible to owner and admins)
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { id } = req.params;

    // Find existing recipe
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id }
    });

    if (!existingRecipe) {
      throw new AppError('Recipe not found', 404);
    }

    // Check permissions: only owner or admin can delete
    if (req.user.role !== 'admin' && req.user.userId !== existingRecipe.authorId) {
      throw new AppError('Not authorized to delete this recipe', 403);
    }

    await prisma.recipe.delete({
      where: { id }
    });

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

// Get user's own recipes (accessible to recipe authors and admins)
export const getMyRecipes = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }

    const { page = 1, limit = 12, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      authorId: req.user.userId
    };

    if (status) {
      where.status = status;
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    });

    const total = await prisma.recipe.count({ where });

    res.json({
      success: true,
      data: {
        recipes,
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
    
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const recipes = await prisma.recipe.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true
          }
        }
      },
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc'
      },
      skip,
      take: Number(limit)
    });

    const total = await prisma.recipe.count({ where });

    // Get status counts for admin dashboard
    const statusCounts = await prisma.recipe.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    res.json({
      success: true,
      data: {
        recipes,
        statusCounts: statusCounts.reduce((acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        }, {} as Record<string, number>),
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

    const updateData: any = {
      status,
      approvedBy: req.user?.userId,
      approvedAt: status === 'Approved' ? new Date() : null
    };

    // If rejecting, we might want to add a rejection reason (could extend schema later)
    if (status === 'Rejected' && rejectionReason) {
      // For now, we'll just log it. Could add rejectionReason field to schema later
      console.log(`Recipe ${id} rejected. Reason: ${rejectionReason}`);
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedRecipe,
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
    // Get category counts
    const categoryStats = await prisma.recipe.groupBy({
      by: ['category'],
      where: { status: 'Approved' },
      _count: {
        category: true
      }
    });

    // Get difficulty stats
    const difficultyStats = await prisma.recipe.groupBy({
      by: ['difficulty'],
      where: { status: 'Approved' },
      _count: {
        difficulty: true
      }
    });

    // Get total stats
    const totalRecipes = await prisma.recipe.count({ where: { status: 'Approved' } });
    const totalViews = await prisma.recipe.aggregate({
      where: { status: 'Approved' },
      _sum: { views: true }
    });

    res.json({
      success: true,
      data: {
        totalRecipes,
        totalViews: totalViews._sum.views || 0,
        categoryStats: categoryStats.reduce((acc, item) => {
          acc[item.category] = item._count.category;
          return acc;
        }, {} as Record<string, number>),
        difficultyStats: difficultyStats.reduce((acc, item) => {
          acc[item.difficulty] = item._count.difficulty;
          return acc;
        }, {} as Record<string, number>)
      }
    });
  } catch (error) {
    console.error('Get recipe stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipe statistics' });
  }
};