import axios from "axios";
import {Box, debounce, Grid, SelectChangeEvent, Switch, Typography} from "@mui/material";
import {ProductListResponse} from "../interfaces/Entities.tsx";
import React, {ChangeEvent, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import FilterBox from "../components/Product/FilterBox.tsx";
import "../pages/Product.css"
import {useLocation} from "react-router-dom";
import PaginationComponent from "../components/Pagination/Pagination.tsx";
import ErrorComponent from "../components/Error/ErrorComponent.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import PendingComponent from "../components/Pending/PendingComponent.tsx";

const Products = () => {
    const [showAsListChecked, setShowAsListChecked] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const errorMessage: string = "Sorry, we can't show products at the moment. Please, try later."

    const useLocationQuery = () => {
        const {search} = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const defaultPageSize = 6;
    const query = useLocationQuery();
    const currentPage: number = parseInt(query.get('page') ? query.get('page')! : '1');
    const skip: number = parseInt(query.get('skip') ? query.get('skip')! : '0');
    const limit: number = parseInt(query.get('limit') ? query.get('limit')! : `${defaultPageSize}`);

    const queryClient = useQueryClient()

    const getCategories = async () => {
        const response = await axios.get<string[]>(`https://dummyjson.com/products/categories`)
        return response.data
    }

    const getProducts = async () => {
        const response = await
            axios.get<ProductListResponse>(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}&skip=${skip}`)
        setTotalItems(response.data.total)
        return response.data.products
    }

    const {
        isPending: isProductsDataPending,
        isError: isProductsError,
        data: productsData
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })

    const {
        data: categoriesData
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    const searchProducts = async (term: string) => {
        const response = await
            axios.get<ProductListResponse>(`https://dummyjson.com/products/search?q=${term}`)
        setTotalItems(response.data.total)
        return response.data.products
    }

    const getProductsByCategories = async (category: string) => {
        const response = await
            axios.get<ProductListResponse>(`https://dummyjson.com/products/category/${category}`)
        setTotalItems(response.data.total)
        return response.data.products
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        getProductsByCategories(event.target.value)
            .then((products) => {
                queryClient.setQueryData(['products'], () => products)
            })
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    const handleClear = async () => {
        await queryClient.refetchQueries({queryKey: ['products'], type: 'active'})
    }

    const debouncedSearch = React.useRef(
        debounce(async (criteria: string) => {
            searchProducts(criteria)
                .then((products) => {
                    queryClient.setQueryData(['products'], () => products)
                })
        }, 300)
    ).current;

    return (
        <div>
            <Typography component="div" variant="h4" gutterBottom>
                All products
            </Typography>

            {isProductsDataPending && <PendingComponent/>}
            {isProductsError && <ErrorComponent message={errorMessage}/>}

            {!isProductsError && !isProductsDataPending && <>
                Show as list <Switch checked={showAsListChecked}
                                     onChange={() => {
                                         setShowAsListChecked(!showAsListChecked);
                                     }}/>

                <FilterBox categories={categoriesData ? categoriesData : [""]}
                           handleCategoryChange={handleCategoryChange}
                           selectName={"Categories"}
                           handleClear={handleClear}
                           handleSearchChange={handleSearchChange}/>

                {showAsListChecked &&
                    <div className={'product-list-container'}>
                        {productsData?.map((product) => (
                            <ProductListComponent product={product}/>
                        ))}
                    </div>}


                {!showAsListChecked &&
                    <>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            {productsData?.map((product) => (
                                <Grid item key={product.id} xs={12} md={4}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center">
                                    <ProductCard product={product}/>
                                </Grid>
                            ))
                            }
                        </Grid>
                    </>
                }
                <Box display="flex"
                     justifyContent='center'
                     sx={{m: 2}}>
                    <PaginationComponent page={currentPage} totalItems={totalItems} pageLimit={defaultPageSize}/>
                </Box>
            </>}
        </div>
    )
}

export default Products