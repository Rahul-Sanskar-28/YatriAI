import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  getAllUsers,
  updateUserStatus
} from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

// Admin routes
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.patch('/users/:id/status', authenticate, authorize('admin'), updateUserStatus);

export default router;



























