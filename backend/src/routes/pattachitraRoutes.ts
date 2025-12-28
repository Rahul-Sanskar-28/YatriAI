import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';
import {
  getPattachitraArtworks,
  getPattachitraById,
  createPattachitraArtwork,
  updatePattachitraArtwork,
  updateArtworkStory,
  deletePattachitraArtwork,
  getMyPattachitraArtworks,
  getAllPattachitraAdmin,
  updatePattachitraStatus,
  getPattachitraStats,
  uploadPattachitraImage
} from '../controllers/pattachitraController.js';

const router = Router();

// Public routes (accessible to all authenticated users)
router.get('/stats', authenticate, authorize('tourist', 'guide', 'admin'), getPattachitraStats);
router.get('/', authenticate, authorize('tourist', 'guide', 'admin'), getPattachitraArtworks);
router.get('/:id', authenticate, authorize('tourist', 'guide', 'admin'), getPattachitraById);

// Tourist, Guide and Admin routes
router.get('/my-artworks', authenticate, authorize('guide', 'admin'), getMyPattachitraArtworks);

// Image upload route (tourists, guides and admins)
router.post('/upload-image', authenticate, authorize('tourist', 'guide', 'admin'), uploadSingle, handleUploadError, uploadPattachitraImage);

// Create and Update routes (tourists, guides and admins)
router.post('/', authenticate, authorize('tourist', 'guide', 'admin'), createPattachitraArtwork);
router.put('/:id', authenticate, authorize('tourist', 'guide', 'admin'), updatePattachitraArtwork);

// Story editing route (artwork owner only)
router.patch('/:id/story', authenticate, authorize('tourist', 'guide', 'admin'), updateArtworkStory);

// Delete route (artwork owner and admins)
router.delete('/:id', authenticate, authorize('tourist', 'guide', 'admin'), deletePattachitraArtwork);

// Admin-only routes
router.get('/admin/all', authenticate, authorize('admin'), getAllPattachitraAdmin);
router.patch('/:id/status', authenticate, authorize('admin'), updatePattachitraStatus);

export default router;