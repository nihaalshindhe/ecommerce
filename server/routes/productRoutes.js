import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
} from '../controllers/productController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, seller, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .put(protect, seller, updateProduct);

export default router;