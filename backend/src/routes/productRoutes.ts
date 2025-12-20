import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerStats
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Seller protected routes
router.get('/seller/my-products', authenticate, authorize('seller'), getMyProducts);
router.get('/seller/stats', authenticate, authorize('seller'), getSellerStats);
router.post('/', authenticate, authorize('seller'), createProduct);
router.put('/:id', authenticate, authorize('seller'), updateProduct);
router.delete('/:id', authenticate, authorize('seller'), deleteProduct);

export default router;







