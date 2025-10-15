"use client";

import React, { useState } from 'react';
import ProductCard from './card/ProductCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useFetchProductData } from '@/app/_lib/useFetchData';

const Product = () => {
    const [itemsToShow, setItemsToShow] = useState(8); // Start by showing 8 products

    // Infinite Query for products with pagination
    const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: useFetchProductData,
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined, // Get next cursor from last page
        refetchOnWindowFocus: false, // Disable refetching on window focus
    });

    // Loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Combine all products from paginated results
    const allProducts = data?.pages.flatMap((page) => page.products);

    return (
        <div className='relative top-[-20px]'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts.slice(0, itemsToShow).map((product) => (
                    <ProductCard key={product.asin} product={product} />
                ))}
            </div>

            <div className="mt-4 text-center">
                <button
                    onClick={() => {
                        if (itemsToShow >= allProducts.length && hasNextPage) {
                            fetchNextPage(); // Fetch more products if there are more pages
                        }
                        setItemsToShow((prev) => prev + 12); // Show 12 more products
                    }}
                    disabled={!hasNextPage && itemsToShow >= allProducts.length} // Disable button if no more products to load
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage || itemsToShow < allProducts.length
                            ? 'Show More'
                            : 'No more products to load'}
                </button>
            </div>
        </div>
    );
};

export default Product;
