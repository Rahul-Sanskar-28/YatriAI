import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
  getAllRecipesAdmin,
  updateRecipeStatus,
  getRecipeStats,
  uploadRecipeImage
} from '../controllers/recipeControllerMock.js';

const router = Router();

// Public routes (accessible to tourists and admins after authentication)
router.get('/stats', authenticate, authorize('tourist', 'admin'), getRecipeStats);
router.get('/', authenticate, authorize('tourist', 'admin'), getRecipes);
router.get('/my-recipes', authenticate, authorize('tourist', 'admin'), getMyRecipes);
router.get('/:id', authenticate, authorize('tourist', 'admin'), getRecipeById);

// Image upload route (accessible to tourists and admins)
router.post('/upload-image', authenticate, authorize('tourist', 'admin'), uploadSingle, handleUploadError, uploadRecipeImage);

// Create and Update routes (accessible to tourists and admins)
router.post('/', authenticate, authorize('tourist', 'admin'), createRecipe);
router.put('/:id', authenticate, authorize('tourist', 'admin'), updateRecipe);

// Delete route (accessible to recipe owner and admins)
router.delete('/:id', authenticate, authorize('tourist', 'admin'), deleteRecipe);

// Admin-only routes
router.get('/admin/all', authenticate, authorize('admin'), getAllRecipesAdmin);
router.patch('/:id/status', authenticate, authorize('admin'), updateRecipeStatus);

export default router;