import { Link } from 'react-router-dom';
import { UsersIcon, LightBulbIcon, HeartIcon } from '@heroicons/react/24/outline';
import TeamMemberCard from "./TeamMemberCard";

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Alex Green',
            role: 'Founder & CEO',
            bio: 'Passionate about sustainable living with 10+ years in eco-business',
            image: '/team/alex.jpg'
        },
        {
            id: 2,
            name: 'Sam Wilson',
            role: 'Head of Sustainability',
            bio: 'Environmental scientist focused on circular economies',
            image: '/team/sam.jpg'
        },
        {
            id: 3,
            name: 'Jordan Lee',
            role: 'Product Curator',
            bio: 'Expert in ethical sourcing and fair trade practices',
            image: '/team/jordan.jpg'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Eco-conscious members', icon: <UsersIcon className="h-8 w-8" /> },
        { value: '5K+', label: 'Sustainable products', icon: <LightBulbIcon className="h-8 w-8" /> },
        { value: '100+', label: 'Verified eco-sellers', icon: <HeartIcon className="h-8 w-8" /> }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-emerald-700">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Our Sustainable Story
                    </h1>
                    <p className="mt-6 text-xl text-emerald-100 max-w-3xl mx-auto">
                        Building a marketplace that cares for both people and planet
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
                            Our Mission
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Redefining commerce for a greener future
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            EcoSwap was born from a simple idea: what if every purchase could make a positive impact?
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mx-auto">
                                        {stat.icon}
                                    </div>
                                    <h3 className="mt-6 text-3xl font-bold text-emerald-600">{stat.value}</h3>
                                    <p className="mt-2 text-lg font-medium text-gray-900">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
                            Meet the Team
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            The passionate minds behind EcoSwap
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-emerald-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to join our eco-movement?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-emerald-200">
                        Whether you want to shop sustainably or sell eco-friendly products, we've got you covered.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Link
                            to="/products"
                            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/sell"
                            className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-400"
                        >
                            Become a Seller
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;