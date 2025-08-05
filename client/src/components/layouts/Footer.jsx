export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Info */}
                <div>
                    <h3 className="text-xl font-bold mb-4 text-emerald-400">EcoSwap</h3>
                    <p className="text-gray-400 mb-4">
                        Sustainable shopping for a better planet. We connect eco-conscious
                        buyers with responsible sellers.
                    </p>
                    <div className="flex space-x-4">
                        {/* Social icons would go here */}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/products" className="hover:text-emerald-400 transition">Shop All</a></li>
                        <li><a href="/categories/clothing" className="hover:text-emerald-400 transition">Clothing</a></li>
                        <li><a href="/categories/home" className="hover:text-emerald-400 transition">Home Goods</a></li>
                        <li><a href="/sell" className="hover:text-emerald-400 transition">Become a Seller</a></li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <h4 className="font-semibold mb-4 text-lg">Policies</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/shipping" className="hover:text-emerald-400 transition">Shipping Policy</a></li>
                        <li><a href="/returns" className="hover:text-emerald-400 transition">Returns & Exchanges</a></li>
                        <li><a href="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-emerald-400 transition">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-semibold mb-4 text-lg">Stay Updated</h4>
                    <p className="text-gray-400 mb-4">
                        Subscribe for sustainability tips and exclusive offers
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-4 py-2 rounded-l-lg bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-r-lg transition">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} EcoSwap Marketplace. All rights reserved.
            </div>
        </footer>
    );
}