import { useState } from 'react';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Button from '../components/ui/Button';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const stats = [
        { name: 'Total Orders', value: 24, change: '+12%' },
        { name: 'Revenue', value: '$1,248.75', change: '+8.5%' },
        { name: 'Customer Satisfaction', value: '4.7/5', change: '+0.2' },
        { name: 'Pending Orders', value: 3, change: '-2' },
    ];

    const recentOrders = [
        { id: 'ORD-001', date: '2023-06-15', total: 89.97, status: 'Delivered' },
        { id: 'ORD-002', date: '2023-06-20', total: 45.99, status: 'Shipped' },
        { id: 'ORD-003', date: '2023-06-25', total: 120.50, status: 'Processing' },
    ];

    return (
        <ProtectedRoute roles={['buyer', 'seller', 'admin']}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center mb-6">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                <div className="ml-4">
                                    <h2 className="font-bold text-lg">John Doe</h2>
                                    <p className="text-gray-600">john@example.com</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'orders' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    My Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'products' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    My Products
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Account Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <Button variant="primary">Add Product</Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                    <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
                                    <div className="flex items-end">
                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                        <span className="ml-2 text-sm text-green-600">{stat.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Recent Orders</h2>
                                <Button variant="outline">View All</Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                      'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Button variant="outline" size="sm">View</Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold mb-6">Top Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="border border-gray-200 rounded-lg p-4">
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-4" />
                                        <h3 className="font-bold mb-1">Recycled Denim Jacket</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-emerald-600 font-bold">$45.99</span>
                                            <span className="text-gray-600">24 sold</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DashboardPage;