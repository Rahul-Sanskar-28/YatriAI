import { Router } from 'express';
import {
  getAllTestimonials,
  getAITips,
  createTestimonial,
  createAITip,
  submitFeedback,
  getAllFeedback
} from '../controllers/testimonialController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/tips', getAITips);

// Protected routes
router.post('/feedback', authenticate, submitFeedback);

// Admin routes
router.get('/feedback', authenticate, authorize('admin'), getAllFeedback);
router.post('/', authenticate, authorize('admin'), createTestimonial);
router.post('/tips', authenticate, authorize('admin'), createAITip);

export default router;











