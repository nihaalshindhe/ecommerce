import { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); 
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: [],
        condition: [],
        priceRange: null,
        ecoRating: null
    });

    
    useEffect(() => {
        const fetchProducts = async () => {
            
            setTimeout(() => {
                const mockProducts = [/* Array of product objects */];
                setProducts(mockProducts);
                setFilteredProducts(mockProducts);
                setLoading(false);
            }, 800);
        };

        fetchProducts();
    }, []);

    
    const handleFilterChange = (filterType, value, isChecked = null) => {
        const newFilters = { ...filters };

        if (filterType === 'reset') {
            setFilters({
                category: [],
                condition: [],
                priceRange: null,
                ecoRating: null
            });
            setFilteredProducts(products);
            return;
        }

        switch (filterType) {
            case 'category':
                if (isChecked) {
                    newFilters.category = [...newFilters.category, value];
                } else {
                    newFilters.category = newFilters.category.filter(cat => cat !== value);
                }
                break;
            case 'condition':
                if (isChecked) {
                    newFilters.condition = [...newFilters.condition, value];
                } else {
                    newFilters.condition = newFilters.condition.filter(cond => cond !== value);
                }
                break;
            case 'price':
                newFilters.priceRange = value;
                break;
            case 'ecoRating':
                newFilters.ecoRating = value;
                break;
            default:
                break;
        }

        setFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (filterSettings) => {
        let result = [...products];

        
        if (filterSettings.category.length > 0) {
            result = result.filter(product =>
                filterSettings.category.includes(product.category))
        }

        
        if (filterSettings.condition.length > 0) {
            result = result.filter(product =>
                filterSettings.condition.includes(product.condition))
        }

        
        if (filterSettings.priceRange) {
            const [min, max] = filterSettings.priceRange;
            result = result.filter(product =>
                product.price >= min && product.price <= max
            );
        }

        
        if (filterSettings.ecoRating) {
            result = result.filter(product =>
                product.ecoScore >= filterSettings.ecoRating
            );
        }

        setFilteredProducts(result);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
                {/* Filters Sidebar */}
                <div className="md:w-64 mb-8 md:mb-0 md:pr-6">
                    <ProductFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Products Area */}
                <div className="flex-1">
                    {/* Header with controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                        <h1 className="text-3xl font-bold mb-4 md:mb-0">
                            Sustainable Products
                            <span className="text-gray-500 text-lg font-normal ml-2">
                ({filteredProducts.length} items)
              </span>
                        </h1>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block text-sm text-gray-600">
                                Sort by:
                                <select className="ml-2 border-none bg-transparent focus:ring-emerald-500">
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Highest Rated</option>
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500'}`}
                                >
                                    <Squares2X2Icon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500'}`}
                                >
                                    <ListBulletIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid/List */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    viewMode={viewMode}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}