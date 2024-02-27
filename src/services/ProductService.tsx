import {ProductListResponse} from "../interfaces/Entities.tsx";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useAllProducts = () => {

    const getProducts = async (): Promise<ProductListResponse> => {
        const response = await
            axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products`)
        console.log(response.data)
        return response.data
    }

    return useQuery<ProductListResponse>({
        queryKey: ['products'],
        queryFn: getProducts
    })
}

export const searchProducts = async (term: string) => {
    const response = await
        axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?title=${term}`)
    return response.data
}

export const getProductsByCategories = async (category: string) => {
    const response = await
        axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?category=${category}`)
    return response.data
}

export default useAllProducts