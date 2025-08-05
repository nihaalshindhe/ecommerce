import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
    removeItem,
    updateQuantity,
    clearCart
} from '../redux/slices/cartSlice'
import {
    XMarkIcon,
    ArrowLeftIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/ui/EmptyState'

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cart.items)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 40 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;


    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    if (!isAuthenticated) return null

    const handleRemove = id => {
        dispatch(removeItem(id))
    }

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleCheckout = () => {
        setIsCheckingOut(true)
        setTimeout(() => {
            setIsCheckingOut(false)
            navigate('/checkout', {
                state: {
                    cartItems,
                    subtotal,
                    shipping,
                    tax,
                    total
                }
            });

        }, 1000)
    }

    if (cartItems.length === 0) {
        return (
            <EmptyState
                icon={<ShoppingBagIcon className="h-12 w-12 text-gray-400" />}
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet."
                action={<Link to="/" className="text-indigo-600 hover:underline">Start Shopping</Link>}
            />
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <Button onClick={handleClearCart} variant="outline" size="sm">Clear Cart</Button>
            </div>

            <div className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                            <div>
                                <h2 className="font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                                className="w-16 border rounded px-2 py-1 text-center"
                            />
                            <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
            />

            <div className="mt-6 flex justify-between">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:underline">
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    Continue Shopping
                </Link>
                <Button onClick={handleCheckout} disabled={isCheckingOut}>
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
                </Button>
            </div>
        </div>
    )
}

export default CartPage
