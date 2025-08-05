import { useState } from 'react';

const ProductGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto py-2 md:py-0">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${
                            selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                        }`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <img
                        src={images[selectedImage]}
                        alt="Main product"
                        className="w-full h-96 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;