import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/create-intent')
    .post(protect, createPaymentIntent);

router.route('/webhook')
    .post(express.raw({ type: 'application/json' }), handleWebhook);

export default router;