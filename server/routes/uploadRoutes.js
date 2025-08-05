import express from 'express';
import { uploadProductImages } from '../middleware/uploadMiddleware.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, seller, uploadProductImages, async (req, res) => {
    try {
        const uploadResults = await Promise.all(
            req.files.map(file => uploadToCloudinary(file.path))
        );

        const imageUrls = uploadResults.map(result => result.secure_url);
        res.json(imageUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image upload failed' });
    }
});

export default router;