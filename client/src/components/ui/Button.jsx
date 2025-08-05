const Button = ({
                    children,
                    type = 'button',
                    variant = 'primary',
                    size = 'md',
                    fullWidth = false,
                    disabled = false,
                    isLoading = false,
                    loadingText = 'Loading...',
                    onClick,
                    className = ''
                }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
        outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
        danger: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500",
    };

    const sizeClasses = {
        sm: "py-1.5 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http:
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;