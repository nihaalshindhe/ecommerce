import express from 'express';
import {
    createReview,
    getProductReviews,
    deleteReview,
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id')
    .get(getProductReviews)
    .post(protect, createReview)
    .delete(protect, admin, deleteReview);

export default router;