import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';




const getDashboardStats = asyncHandler(async (req, res) => {
    const [
        totalUsers,
        totalProducts,
        totalOrders,
        recentOrders,
        outOfStockProducts,
    ] = await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
        Product.find({ stock: 0 }),
    ]);

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id': 1 } },
        { $limit: 7 },
    ]);

    res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        recentOrders,
        outOfStockProducts: outOfStockProducts.length,
        salesData,
    });
});




const getOrders = asyncHandler(async (req, res) => {
    const { status, dateFrom, dateTo } = req.query;

    const query = {};
    if (status) query.isPaid = status === 'paid';
    if (dateFrom || dateTo) {
        query.createdAt = {};
        if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
        if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.json(orders);
});

export { getDashboardStats, getOrders };