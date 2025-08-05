import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';




const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            $or: [
                { name: { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } },
            ],
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const condition = req.query.condition ? { condition: req.query.condition } : {};
    const minPrice = req.query.minPrice ? { price: { $gte: Number(req.query.minPrice) } } : {};
    const maxPrice = req.query.maxPrice ? { price: { $lte: Number(req.query.maxPrice) } } : {};
    const ecoScore = req.query.ecoScore ? { ecoScore: { $gte: Number(req.query.ecoScore) } } : {};

    const count = await Product.countDocuments({
        ...keyword,
        ...category,
        ...condition,
        ...minPrice,
        ...maxPrice,
        ...ecoScore,
        isActive: true,
    });

    const products = await Product.find({
        ...keyword,
        ...category,
        ...condition,
        ...minPrice,
        ...maxPrice,
        ...ecoScore,
        isActive: true,
    })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('seller', 'name avatar');

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});




const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'name avatar rating'
    );

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});




const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        condition,
        images,
        stock,
        ecoScore,
        materials,
        dimensions,
        weight,
    } = req.body;

    const product = new Product({
        name,
        description,
        price,
        category,
        condition,
        images,
        stock,
        ecoScore,
        materials,
        dimensions,
        weight,
        seller: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});




const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        condition,
        images,
        stock,
        ecoScore,
        materials,
        dimensions,
        weight,
        isActive,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        
        if (product.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this product');
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.condition = condition || product.condition;
        product.images = images || product.images;
        product.stock = stock || product.stock;
        product.ecoScore = ecoScore || product.ecoScore;
        product.materials = materials || product.materials;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
        product.isActive = isActive !== undefined ? isActive : product.isActive;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById, createProduct, updateProduct };