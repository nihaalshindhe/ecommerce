import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const StripeCheckoutForm = ({ total, cartItems, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            
            const response = await fetch('/api/payment/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(total * 100), 
                    items: cartItems.map(item => ({
                        id: item.id,
                        quantity: item.quantity
                    }))
                }),
            });

            const { clientSecret } = await response.json();

            
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                
                dispatch(clearCart());
                await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: cartItems,
                        total,
                        paymentId: paymentIntent.id
                    }),
                });

                
                onSuccess(paymentIntent.id);

            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>

            <div className="mb-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    onChange={handleChange}
                />
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!stripe || disabled}
                isLoading={loading}
                loadingText="Processing Payment..."
            >
                Pay ${total.toFixed(2)}
            </Button>
        </form>
    );
};

export default StripeCheckoutForm;