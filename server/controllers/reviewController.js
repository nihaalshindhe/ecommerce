import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Review from '../models/Review.js';




const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        
        const alreadyReviewed = await Review.findOne({
            product: product._id,
            user: req.user._id,
        });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = new Review({
            user: req.user._id,
            product: product._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        });

        const createdReview = await review.save();

        
        product.reviews.push(createdReview._id);
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        await product.save();

        res.status(201).json(createdReview);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});




const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.id })
        .sort({ createdAt: -1 })
        .populate('user', 'name avatar');

    res.json(reviews);
});




const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        
        await Product.updateOne(
            { _id: review.product },
            { $pull: { reviews: review._id } }
        );

        
        const product = await Product.findById(review.product);
        if (product.reviews.length > 0) {
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
        } else {
            product.rating = 0;
        }
        await product.save();

        await review.remove();
        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

export { createReview, getProductReviews, deleteReview };