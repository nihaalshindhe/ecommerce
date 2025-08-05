import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, logout } from '../redux/slices/authSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageLoader from '../components/layouts/PageLoader';
import { ArrowLeftIcon, ExclamationCircleIcon,CheckCircleIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
    }, [user, isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (activeTab === 'password' && formData.newPassword && formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (activeTab === 'password' && formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            setSuccess('');

            
            const updateData = activeTab === 'profile'
                ? { name: formData.name, email: formData.email }
                : {
                    currentPassword: formData.password,
                    newPassword: formData.newPassword
                };

            
            const result = await dispatch(updateUser({
                userId: user._id,
                updateData
            })).unwrap();

            setSuccess(activeTab === 'profile'
                ? 'Profile updated successfully!'
                : 'Password changed successfully!');

            
            if (activeTab === 'password') {
                setFormData({
                    ...formData,
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setErrors({ ...errors, server: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!isAuthenticated) {
        return <PageLoader />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-800">
                        <ArrowLeftIcon className="h-5 w-5 mr-1" />
                        Back to Home
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center mb-6">
                                <div className="bg-emerald-100 rounded-full h-12 w-12 flex items-center justify-center text-emerald-600 font-bold text-xl mr-3">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <h2 className="font-bold">{user?.name}</h2>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Profile Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'password' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h1 className="text-2xl font-bold mb-6">
                                {activeTab === 'profile' ? 'Profile Settings' : 'Change Password'}
                            </h1>

                            {errors.server && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{errors.server}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6 rounded">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-emerald-700">{success}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {activeTab === 'profile' ? (
                                    <div className="space-y-4">
                                        <Input
                                            label="Full Name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            required
                                        />

                                        <Input
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Input
                                            label="Current Password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter current password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            error={errors.password}
                                            required
                                        />

                                        <Input
                                            label="New Password"
                                            name="newPassword"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            error={errors.newPassword}
                                        />

                                        <Input
                                            label="Confirm New Password"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            error={errors.confirmPassword}
                                        />
                                    </div>
                                )}

                                <div className="mt-8">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        isLoading={loading}
                                        loadingText="Saving..."
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Account Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-bold mb-4">Account Actions</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Download your data</h3>
                                        <p className="text-sm text-gray-600">
                                            Request a copy of all your personal data
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Request Data
                                    </Button>
                                </div>

                                <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
                                    <div>
                                        <h3 className="font-medium text-red-800">Delete account</h3>
                                        <p className="text-sm text-red-600">
                                            This action cannot be undone
                                        </p>
                                    </div>
                                    <Button variant="danger" size="sm">
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;