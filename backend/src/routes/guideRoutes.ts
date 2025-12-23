import { Router } from 'express';
import {
  getAllGuides,
  getGuideById,
  getMyGuideProfile,
  updateGuideProfile,
  createTour,
  updateTour,
  deleteTour,
  updateGuideBookingStatus
} from '../controllers/guideController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllGuides);
router.get('/:id', getGuideById);

// Guide protected routes
router.get('/profile/me', authenticate, authorize('guide'), getMyGuideProfile);
router.put('/profile', authenticate, authorize('guide'), updateGuideProfile);

// Tour management (guide only)
router.post('/tours', authenticate, authorize('guide'), createTour);
router.put('/tours/:id', authenticate, authorize('guide'), updateTour);
router.delete('/tours/:id', authenticate, authorize('guide'), deleteTour);

// Booking management (guide only)
router.patch('/bookings/:id/status', authenticate, authorize('guide'), updateGuideBookingStatus);

export default router;












