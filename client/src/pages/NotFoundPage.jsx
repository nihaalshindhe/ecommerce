import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full text-center">
                <div className="text-9xl font-bold text-emerald-600">404</div>
                <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
                <p className="mt-4 text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="mt-8">
                    <Link to="/">
                        <Button variant="primary">Go back home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;