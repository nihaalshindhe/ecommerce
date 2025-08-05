import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




const createPaymentIntent = asyncHandler(async (req, res) => {
    const { amount, items } = req.body;

    try {
        
        for (const item of items) {
            const product = await Product.findById(item.id);
            if (!product || product.stock < item.quantity) {
                res.status(400);
                throw new Error(`Product ${item.name} is out of stock`);
            }
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), 
            currency: 'usd',
            metadata: {
                userId: req.user._id.toString(),
                items: JSON.stringify(items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })))
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});




const handleWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        try {
            
            await Order.findOneAndUpdate(
                { 'paymentResult.id': paymentIntent.id },
                {
                    isPaid: true,
                    paidAt: Date.now(),
                    'paymentResult.status': paymentIntent.status,
                }
            );
        } catch (err) {
            console.error(`Error updating order: ${err}`);
        }
    }

    res.json({ received: true });
});

export { createPaymentIntent, handleWebhook };