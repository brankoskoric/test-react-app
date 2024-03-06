import {Product, ProductListResponse} from "../interfaces/Entities.tsx";
import axios from "axios";
import {keepPreviousData, useMutation, useQuery} from "@tanstack/react-query";

export const useAllProducts = (page: number, size: number) => {

    const getProducts = async (): Promise<ProductListResponse> => {
        const response = await
            axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?page=${page}&size=${size}`)
        return response.data
    }

    return useQuery<ProductListResponse>({
        queryKey: ['products', page],
        queryFn: getProducts,
        placeholderData: keepPreviousData
    })
}

export const searchProducts = async (term: string, page: number, size: number) => {
    const response = await
        axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?page=${page}&size=${size}&title=${term}`)
    return response.data
}

export const getProductsByCategories = async (category: string, page: number, size: number) => {
    const response = await
        axios.get<ProductListResponse>(`https://product-backend-wwcv.onrender.com/api/v1/products?page=${page}&size=${size}&category=${category}`)
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

export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: async (id: number) => {
            return axios.delete(`https://product-backend-wwcv.onrender.com/api/v1/products/${id}`)
        },
    })
}