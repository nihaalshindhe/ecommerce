import { useState } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function ProductFilters({ onFilterChange }) {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const categories = ['Clothing', 'Home', 'Accessories', 'Electronics'];
    const conditions = ['New', 'Like New', 'Used - Good', 'Used - Fair'];
    const priceRanges = [
        { label: 'Under $10', value: [0, 10] },
        { label: '$10 - $25', value: [10, 25] },
        { label: '$25 - $50', value: [25, 50] },
        { label: 'Over $50', value: [50, 1000] }
    ];

    return (
        <>
            {/* Mobile Filter Button */}
            <button
                className="md:hidden flex items-center justify-center w-full py-3 bg-emerald-600 text-white mb-4 rounded-lg"
                onClick={() => setIsMobileFiltersOpen(true)}
            >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filter Products
            </button>

            {/* Filter Sidebar */}
            <div className={`${isMobileFiltersOpen ? 'fixed inset-0 z-50' : 'hidden'} md:block`}>
                {/* Mobile overlay */}
                {isMobileFiltersOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMobileFiltersOpen(false)}
                    />
                )}

                <div className={`bg-white h-full md:h-auto w-full md:w-64 p-6 shadow-lg ${isMobileFiltersOpen ? 'fixed right-0 top-0 z-50 max-w-xs animate-slide-in' : ''}`}>
                    {/* Mobile header */}
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <h3 className="text-xl font-bold">Filters</h3>
                        <button onClick={() => setIsMobileFiltersOpen(false)}>
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-lg">Category</h4>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded text-emerald-600 focus:ring-emerald-500"
                                        onChange={(e) => onFilterChange('category', category, e.target.checked)}
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Condition Filter */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-lg">Condition</h4>
                        <div className="space-y-2">
                            {conditions.map((condition) => (
                                <label key={condition} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded text-emerald-600 focus:ring-emerald-500"
                                        onChange={(e) => onFilterChange('condition', condition, e.target.checked)}
                                    />
                                    <span>{condition}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3 text-lg">Price Range</h4>
                        <div className="space-y-2">
                            {priceRanges.map((range) => (
                                <label key={range.label} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="price-range"
                                        className="rounded text-emerald-600 focus:ring-emerald-500"
                                        onChange={() => onFilterChange('price', range.value)}
                                    />
                                    <span>{range.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Eco Rating Filter */}
                    <div>
                        <h4 className="font-semibold mb-3 text-lg">Eco Rating</h4>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    className="flex-1 py-2 bg-emerald-100 text-emerald-800 rounded-md hover:bg-emerald-200 transition"
                                    onClick={() => onFilterChange('ecoRating', rating)}
                                >
                                    {rating}+
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        className="mt-8 w-full py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
                        onClick={() => {
                            onFilterChange('reset');
                            if (isMobileFiltersOpen) setIsMobileFiltersOpen(false);
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </>
    );
}