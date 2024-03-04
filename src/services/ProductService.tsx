import {Product, ProductListResponse} from "../interfaces/Entities.tsx";
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";

export const useAllProducts = ({page, size}: { page: number, size: number }) => {

    const getProducts = async (): Promise<ProductListResponse> => {
        const response = await
            axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?page=${page}&size=${size}`)
        return response.data
    }

    return useQuery<ProductListResponse>({
        queryKey: ['products', page],
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

export const useCreateProduct = () => {
    return useMutation({
        mutationKey: ['createProduct'],
        mutationFn: async (newProduct: Product) => {
            return axios.post("https://product-backend-wwcv.onrender.com/api/v1/products", newProduct)
        },
    })
}