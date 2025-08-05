import express from 'express';
import {
    updateUserProfile,
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .put(protect, updateUserProfile)
    .delete(protect, deleteUser);

router.route('/:id/admin')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;