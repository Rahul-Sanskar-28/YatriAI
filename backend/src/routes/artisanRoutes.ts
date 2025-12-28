import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';
import {
  getArtisanProfiles,
  getArtisanById,
  createArtisanProfile,
  updateArtisanProfile,
  deleteArtisanProfile,
  getMyArtisanProfiles,
  verifyArtisanProfile,
  getArtisanStats,
  uploadArtisanImage
} from '../controllers/artisanController.js';

const router = Router();

// Public routes (accessible to all authenticated users - tourist, seller, admin)
router.get('/stats', authenticate, authorize('tourist', 'seller', 'admin'), getArtisanStats);
router.get('/', authenticate, authorize('tourist', 'seller', 'admin'), getArtisanProfiles);
router.get('/:id', authenticate, authorize('tourist', 'seller', 'admin'), getArtisanById);

// Creator routes (seller and admin only)
router.get('/my-profiles', authenticate, authorize('seller', 'admin'), getMyArtisanProfiles);

// Image upload route (seller and admin only)
router.post('/upload-image', authenticate, authorize('seller', 'admin'), uploadSingle, handleUploadError, uploadArtisanImage);

// Create and Update routes (seller and admin only)
router.post('/', authenticate, authorize('seller', 'admin'), createArtisanProfile);
router.put('/:id', authenticate, authorize('seller', 'admin'), updateArtisanProfile);

// Delete route (profile owner and admin only)
router.delete('/:id', authenticate, authorize('seller', 'admin'), deleteArtisanProfile);

// Admin-only routes
router.patch('/:id/verify', authenticate, authorize('admin'), verifyArtisanProfile);

export default router;