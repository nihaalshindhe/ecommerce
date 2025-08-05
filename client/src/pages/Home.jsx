import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';


const featuredProducts = [
    {
        _id: '1',
        name: 'Recycled Denim Jacket',
        price: 45.99,
        condition: 'Like New',
        ecoScore: 4.5,
        images: ['/denim-jacket.jpg'],
        rating: 4.2
    },
    
];

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Shop Sustainable, Save the Planet
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto mb-10">
                        Discover eco-friendly products from responsible sellers.
                        Every purchase makes a difference.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/products"
                            className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/sustainability"
                            className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition"
                        >
                            Our Mission
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold">Featured Products</h2>
                        <Link
                            to="/products"
                            className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
                        >
                            View All <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability Impact */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { value: '2.4K+', label: 'Products Saved from Landfills' },
                            { value: '87K+', label: 'Liters of Water Conserved' },
                            { value: '36K+', label: 'Kg of CO2 Emissions Prevented' }
                        ].map((stat, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
                                <div className="text-5xl font-bold text-emerald-600 mb-4">{stat.value}</div>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-emerald-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-10">
                        Join our community of eco-conscious buyers and sellers
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/sell"
                            className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition"
                        >
                            Sell Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}