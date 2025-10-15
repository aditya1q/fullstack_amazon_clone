// Deals.js
"use client";

import axios from 'axios';
import React from 'react';
import Card from './card/Card';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import ProductCard from './card/ProductCard'; // Adjust the path based on your file structure

const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

const Deals = () => {
    const [deals, setDeals] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        axios.get(`${apiRoot}/deals`)
            .then((res) => {
                console.log(res.data);
                setDeals(res.data.deal.products);
            })
            .catch((error) => console.log('Error in product call', error));
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.floor(deals.length / 4) * 4 - 4 : prevIndex - 4
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex >= Math.floor(deals.length / 4) * 4 - 4 ? 0 : prevIndex + 4
        );
    };

    return (
        <div className='relative top-[-20px]'>
            <div className="overflow-hidden relative">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                    {deals.map((deal) => (
                        <div className="w-1/4 flex-shrink-0">
                            <Card key={deal.itemId} deals={deal} />
                        </div>
                    ))}
                </div>
                <button
                className='absolute top-1/2 h-[100%] bottom-10 hover:border-2 hover:border-blue-900 px-4 left-0 transform -translate-y-1/2 text-blue-900 rounded-sm '
                onClick={prevSlide}
            >
                <FaChevronLeft size={32}/>
            </button>
            <button
                className='absolute top-1/2 h-[100%] bottom-10 hover:border-2 hover:border-blue-900 px-4 right-0 transform -translate-y-1/2 text-blue-900 rounded-sm'
                onClick={nextSlide}
            >
                <FaChevronRight size={32}/>
            </button>
            </div>
        </div>
    );
};

export default Deals;