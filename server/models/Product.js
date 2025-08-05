import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String,
            enum: ['clothing', 'home', 'accessories', 'electronics', 'beauty'],
            required: true,
        },
        condition: {
            type: String,
            enum: ['new', 'like-new', 'used-good', 'used-fair'],
            required: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 1,
        },
        ecoScore: {
            type: Number,
            min: 0,
            max: 5,
            default: 3,
        },
        materials: [
            {
                type: String,
            },
        ],
        dimensions: {
            type: String,
        },
        weight: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;