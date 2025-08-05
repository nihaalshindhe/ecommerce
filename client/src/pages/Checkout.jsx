import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CartSummary from '../components/cart/CartSummary';
import StripeCheckoutForm from '../components/auth/Stripe';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function Checkout() {
    const [checkoutStep, setCheckoutStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems, subtotal, shipping, tax, total } = location.state || {};

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setCheckoutStep(2);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between mb-8">
                        <div className={`flex items-center ${checkoutStep === 1 ? 'text-emerald-600' : ''}`}>
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${checkoutStep === 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                                1
                            </div>
                            <h3 className="font-medium">Shipping Information</h3>
                        </div>

                        <div className="flex items-center text-gray-400">
                            <div className="h-px bg-gray-300 w-16 mx-2"></div>
                        </div>

                        <div className={`flex items-center ${checkoutStep === 2 ? 'text-emerald-600' : 'text-gray-400'}`}>
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${checkoutStep === 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                                2
                            </div>
                            <h3 className="font-medium">Payment</h3>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-7/12">
                            {checkoutStep === 1 ? (
                                <form onSubmit={handleShippingSubmit} className="bg-white p-6 rounded-xl shadow-sm">
                                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                                value={shippingInfo.name}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                                value={shippingInfo.city}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                                value={shippingInfo.postalCode}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <select
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                                                value={shippingInfo.country}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                            >
                                                <option value="">Select</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-emerald-600 text-white py-3 rounded-md font-medium hover:bg-emerald-500 transition"
                                    >
                                        Continue to Payment
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                                    <Elements stripe={stripePromise}>
                                        <StripeCheckoutForm
                                            total={total}
                                            shippingInfo={shippingInfo}
                                        />
                                    </Elements>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-5/12">
                            <CartSummary
                                items={cartItems}
                                subtotal={subtotal}
                                shipping={shipping}
                                tax={tax}
                                total={total}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
