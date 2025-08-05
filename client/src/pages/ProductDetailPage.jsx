import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import PageLoader from '../components/layouts/PageLoader';
import ProductGallery from '../components/product/ProductGallery';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                
                setTimeout(() => {
                    setProduct({
                        id,
                        name: 'Recycled Denim Jacket',
                        price: 45.99,
                        condition: 'Like New',
                        ecoScore: 4.5,
                        description: 'This denim jacket is made from 100% recycled materials. It features a classic fit and is perfect for sustainable fashion enthusiasts.',
                        images: [
                            'https:
                            'https:
                            'https:
                        ],
                        seller: {
                            name: 'EcoFashion Co.',
                            rating: 4.8,
                            joined: '2022-05-15'
                        },
                        stock: 10,
                        rating: 4.2,
                        reviews: 24,
                        categories: ['Clothing', 'Jackets'],
                        materials: ['Recycled Cotton', 'Recycled Polyester'],
                        dimensions: 'M: Chest 40", Length 27"'
                    });
                    setLoading(false);
                }, 800);
            } catch (err) {
                setError('Failed to load product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            condition: product.condition,
            quantity
        }));
    };

    if (loading) return <PageLoader />;
    if (error) return <div className="container mx-auto py-12 text-center">{error}</div>;
    if (!product) return <div className="container mx-auto py-12 text-center">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Gallery */}
                <div>
                    <ProductGallery images={product.images} />
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <div className="flex items-center mb-4">
                                <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full mr-3">
                                    Eco Score: {product.ecoScore}/5
                                </div>
                                <span className="text-gray-600">Condition: {product.condition}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-emerald-600 mb-6">${product.price.toFixed(2)}</div>

                    <Rating rating={product.rating} showText={true} />
                    <p className="text-gray-500 text-sm mb-6">{product.reviews} reviews</p>

                    <p className="text-gray-700 mb-8">{product.description}</p>

                    <div className="border-t border-b border-gray-200 py-6 mb-6">
                        <h3 className="font-semibold mb-4">Product Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Categories</p>
                                <p>{product.categories.join(', ')}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Materials</p>
                                <p>{product.materials.join(', ')}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Dimensions</p>
                                <p>{product.dimensions}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Availability</p>
                                <p className="text-emerald-600">In Stock ({product.stock} available)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            variant="primary"
                            size="lg"
                            className="flex-1"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
                <h2 className="text-xl font-bold mb-6">Seller Information</h2>
                <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                        <h3 className="font-bold text-lg">{product.seller.name}</h3>
                        <div className="flex items-center mt-1">
                            <Rating rating={product.seller.rating} size="sm" />
                            <span className="ml-2 text-gray-600 text-sm">
                {product.seller.rating} | Joined {new Date(product.seller.joined).toLocaleDateString()}
              </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
                <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-emerald-600">{product.rating.toFixed(1)}</div>
                            <Rating rating={product.rating} />
                            <p className="text-gray-600 mt-2">{product.reviews} reviews</p>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        {/* Review list would go here */}
                        <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;