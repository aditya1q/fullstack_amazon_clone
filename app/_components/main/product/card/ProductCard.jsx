import Link from 'next/link';
import React from 'react';

const truncateTitle = (title, maxWords) => {
    const words = title.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
};

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg border rounded-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 w-full max-w-[28rem] mx-auto p-8">
            <Link href={product.product_url} legacyBehavior>
                <img className="w-full h-44 object-contain" src={product.product_photo} alt={product.product_title} />
            </Link>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600">
                    <Link href={product.product_url} target="_blank" rel="noopener noreferrer">
                        {truncateTitle(product.product_title, 10)}
                    </Link>
                </h2>
                <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-gray-900">{product.product_price}</span>
                    <span className="text-sm line-through text-gray-500 ml-2">{product.product_original_price}</span>
                </div>
                <div className="flex items-center mt-2">
                    <span className="bg-yellow-400 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        {product.product_star_rating} ★
                    </span>
                    <span className="text-gray-600 text-sm ml-2">({product.product_num_ratings} ratings)</span>
                </div>
                {product.is_amazon_choice && (
                    <div className="mt-2">
                        <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                            Amazon's Choice
                        </span>
                    </div>
                )}
                <p className="mt-2 text-gray-600">{product.delivery}</p>
                {product.sales_volume && (
                    <p className="mt-2 text-green-600 text-sm font-semibold">{product.sales_volume}</p>
                )}
                <button>Add cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
