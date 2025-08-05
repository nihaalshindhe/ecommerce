import { useState } from 'react';
import { CheckCircleIcon, ClipboardDocumentIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SellPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        business: '',
        productType: '',
        sustainability: ''
    });

    const benefits = [
        {
            title: "Simple Listing",
            description: "Our easy-to-use dashboard makes adding products a breeze",
            icon: <ClipboardDocumentIcon className="h-8 w-8 text-emerald-600" />
        },
        {
            title: "Eco Community",
            description: "Connect with environmentally conscious shoppers",
            icon: <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
        },
        {
            title: "Sustainable Shipping",
            description: "Access our carbon-neutral shipping partners",
            icon: <TruckIcon className="h-8 w-8 text-emerald-600" />
        },
        {
            title: "Performance Insights",
            description: "Track your environmental impact alongside sales",
            icon: <ChartBarIcon className="h-8 w-8 text-emerald-600" />
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        alert('Application submitted! We\'ll be in touch soon.');
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-emerald-800">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Sell With Purpose
                    </h1>
                    <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
                        Join our marketplace of eco-conscious sellers and reach customers who care
                    </p>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-16 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
                            Why Sell With Us
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Benefits for sustainable sellers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600 mx-auto">
                                    {benefit.icon}
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                                <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Requirements Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-8 lg:mb-0">
                            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
                                Our Standards
                            </h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                What we look for in sellers
                            </p>
                            <p className="mt-4 text-lg text-gray-500">
                                To maintain our commitment to sustainability, all sellers must meet these criteria:
                            </p>

                            <ul className="mt-6 space-y-4">
                                {[
                                    "Products must have verifiable eco-friendly attributes",
                                    "Sustainable packaging is required",
                                    "Transparent supply chain practices",
                                    "Commitment to fair labor standards",
                                    "No harmful chemicals or materials"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">
                                Apply to become a seller
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Business Name"
                                    name="business"
                                    type="text"
                                    placeholder="Your business name"
                                    value={formData.business}
                                    onChange={handleChange}
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        What types of products do you sell?
                                    </label>
                                    <select
                                        name="productType"
                                        value={formData.productType}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                                        required
                                    >
                                        <option value="">Select product category</option>
                                        <option value="clothing">Clothing & Apparel</option>
                                        <option value="home">Home & Living</option>
                                        <option value="beauty">Beauty & Personal Care</option>
                                        <option value="food">Food & Beverage</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Describe your sustainability practices
                                    </label>
                                    <textarea
                                        name="sustainability"
                                        rows={4}
                                        className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        value={formData.sustainability}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Stories */}
            <div className="py-16 bg-emerald-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-emerald-300 font-semibold tracking-wide uppercase">
                            Seller Stories
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                            Meet our eco-entrepreneurs
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {[
                            {
                                name: "Green Threads",
                                story: "Increased sales by 200% while reducing textile waste",
                                image: "/sellers/green-threads.jpg"
                            },
                            {
                                name: "EcoHome",
                                story: "Found their perfect customer base for upcycled furniture",
                                image: "/sellers/ecohome.jpg"
                            },
                            {
                                name: "Pure Beauty",
                                story: "Expanded to national distribution through our platform",
                                image: "/sellers/pure-beauty.jpg"
                            }
                        ].map((seller, index) => (
                            <div key={index} className="bg-emerald-800 rounded-lg overflow-hidden shadow-lg">
                                <img className="h-48 w-full object-cover" src={seller.image} alt={seller.name} />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{seller.name}</h3>
                                    <p className="text-emerald-100">{seller.story}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellPage;