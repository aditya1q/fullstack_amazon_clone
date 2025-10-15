"use client";

import axios from 'axios';
import React from 'react';
import ProductCard from './card/ProductCard';
import { useQuery } from '@tanstack/react-query';

const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

const fetchData = async () => {
    const { data } = await axios.get(`${apiRoot}/product`)
    return data;
}

const Product = () => {
    const [visibleCount, setVisibleCount] = React.useState(8);

    const { data, error, isLoading } = useQuery({
        queryKey: ['fetchData'],
        queryFn: fetchData,
        refetchOnWindowFocus: false,  // Disable refetching on window focus
        refetchOnMount: true,         // Disable refetching when the component mounts
        // staleTime: 1000 * 60 * 5      // Cache data for 5 minutes
    })

    if (isLoading) return <p>loading....</p>
    if (error) return <p>error : {error.message}</p>

    const showMore = () => {
        setVisibleCount(visibleCount + 12);
    };


    return (
        <div className='relative top-[-20px]'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.product.data.products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.asin} product={product} />
                ))}
            </div>
            {data.product.data.products.length > visibleCount && (
                <div className="mt-4 text-center">
                    <button
                        onClick={showMore}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;















// "use client";

// import axios from 'axios';
// import React from 'react';
// import ProductCard from './card/ProductCard'; // Adjust the path based on your file structure

// const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

// const Product = () => {
//     const [products, setProducts] = React.useState([]);
//     const [visibleCount, setVisibleCount] = React.useState(8);

//     const showMore = () => {
//         setVisibleCount(visibleCount + 12);
//     };


//     React.useEffect(() => {
//         axios.get(`${apiRoot}/product`)
//             .then((res) => {
//                 console.log(res.data)
//                 setProducts(res.data.product.data.products);
//             })
//             .catch((error) => console.log('Error in product call', error));
//     }, []);

//     return (
//         <div className='relative top-[-20px]'>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {products.slice(0, visibleCount).map((product) => (
//                     <ProductCard key={product.asin} product={product} />
//                 ))}
//             </div>
//             {products.length > visibleCount && (
//                 <div className="mt-4 text-center">
//                     <button
//                         onClick={showMore}
//                         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//                     >
//                         Show More
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Product;
