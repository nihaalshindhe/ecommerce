import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartSummary = ({ subtotal = 0, shipping = 0, tax = 0, total = 0 }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            navigate('/checkout', {
                state: {
                    cartItems,
                    subtotal,
                    shipping,
                    tax,
                    total
                }
            });
        }, 1000);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${parseFloat(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${parseFloat(shipping).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${parseFloat(tax).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${parseFloat(total).toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-md font-medium transition"
            >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
        </div>
    );
};

export default CartSummary;
