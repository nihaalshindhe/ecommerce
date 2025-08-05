import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { toast } from 'react-hot-toast';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(
            addItem({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1,
            })
        );
        toast.success(`${product.name} added to cart`);
    };
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            {/* Product Image */}
            <div className="relative">
                <Link to={`/products/${product._id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-56 object-cover"
                    />
                </Link>

                {/* Eco Badge */}
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    Eco Score: {product.ecoScore}/5
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-sm">
                    <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500 transition" />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Link to={`/products/${product._id}`}>
                            <h3 className="font-semibold text-lg hover:text-emerald-600 transition">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">{product.condition}</p>
                    </div>
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-1">(24)</span>
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}