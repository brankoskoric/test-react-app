import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {ProductListResponseDummy} from "../../interfaces/Entities.tsx";

const useAllProducts = ({currentPage, limit, skip}: { currentPage: number, limit: number, skip: number }) => {

    const getProducts = async ():Promise<ProductListResponseDummy> => {
        const response = await
            axios.get<ProductListResponseDummy>(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}&skip=${skip}`)
        return response.data
    }

    return useQuery<ProductListResponseDummy>({
        queryKey: ['products_dummy', currentPage],
        queryFn: getProducts
    })
}

export const searchProducts = async (term: string) => {
    const response = await
        axios.get<ProductListResponseDummy>(`https://dummyjson.com/products/search?q=${term}`)
    return response.data
}

export const getProductsByCategories = async (category: string) => {
    const response = await
        axios.get<ProductListResponseDummy>(`https://dummyjson.com/products/category/${category}`)
    return response.data
}

export default useAllProducts