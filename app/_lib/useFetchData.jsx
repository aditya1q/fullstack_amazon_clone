import axios from "axios";
const api_root = process.env.NEXT_PUBLIC_API_ROOT;

// Function to fetch product data
export const useFetchProductData = async ({ pageParam = 0 }) => {
  const { data } = await fetch(`${api_root}/product?cursor=` + pageParam);
  console.log(data)
  // Return both products and the next cursor for pagination
  return {
    products: data.product.data.products,
    nextCursor: data.product.data.nextCursor, // Assuming `nextCursor` is returned by your API
  };
};
