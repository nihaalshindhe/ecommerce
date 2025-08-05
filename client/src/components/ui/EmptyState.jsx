const EmptyState = ({ icon, title, description, action }) => {
    return (
        <div className="text-center max-w-md mx-auto py-12">
            <div className="mb-6">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            {action}
        </div>
    );
};

export default EmptyState;