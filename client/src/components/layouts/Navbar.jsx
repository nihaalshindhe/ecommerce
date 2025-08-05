import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';


export default function Navbar() {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <nav className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-emerald-800 font-bold text-xl">ES</span>
                    </div>
                    <span className="text-xl font-bold">EcoSwap</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/products" className="hover:text-emerald-200 transition">Shop</Link>
                    <Link to="/sustainability" className="hover:text-emerald-200 transition">Our Impact</Link>
                    <Link to="/sell" className="hover:text-emerald-200 transition">Sell Products</Link>
                    <Link to="/about" className="hover:text-emerald-200 transition">About</Link>
                </div>

                {/* Action Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/account" className="p-2 rounded-full hover:bg-emerald-700 transition">
                        <UserIcon className="h-6 w-6" />
                    </Link>
                    <Link to="/cart" className="p-2 rounded-full hover:bg-emerald-700 transition relative">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {totalItems}
    </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    );
}