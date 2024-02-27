import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useAllCategories = () => {

    const getCategories = async (): Promise<string[]> => {
        const response = await axios.get<string[]>(`https://dummyjson.com/products/categories`)
        return response.data
    }

    return useQuery<string[]>({
        queryKey: ['categories_dummy'],
        queryFn: getCategories,
    })
}

export default useAllCategories