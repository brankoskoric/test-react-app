import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {ProductListResponse} from "../interfaces/Entities.tsx";

const useAllProducts = ({currentPage, limit, skip}: { currentPage: number, limit: number, skip: number }) => {

    const getProducts = async ():Promise<ProductListResponse> => {
        const response = await
            axios.get<ProductListResponse>(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}&skip=${skip}`)
        return response.data
    }

    return useQuery<ProductListResponse>({
        queryKey: ['products'],
        queryFn: getProducts
    })
}

export const searchProducts = async (term: string) => {
    const response = await
        axios.get<ProductListResponse>(`https://dummyjson.com/products/search?q=${term}`)
    return response.data
}

export const getProductsByCategories = async (category: string) => {
    const response = await
        axios.get<ProductListResponse>(`https://dummyjson.com/products/category/${category}`)
    return response.data
}

export default useAllProducts