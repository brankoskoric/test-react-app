import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useAllCategories = () => {

    const getCategories = async (): Promise<string[]> => {
        const response =
            await axios.get<string[]>(`https://product-backend-wwcv.onrender.com/api/v1/products/categories`)
        return response.data
    }

    return useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
}

export default useAllCategories