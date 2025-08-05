import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CartItem({ item }) {
    return (
        <div className="flex py-6 border-b border-gray-200">
            {/* Product Image */}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="ml-4 flex flex-1 flex-col">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p className="ml-4">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Condition:</span>
                        <span className="font-medium">{item.condition}</span>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center border rounded-md">
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                                -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="ml-4 text-emerald-600 hover:text-emerald-500"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}