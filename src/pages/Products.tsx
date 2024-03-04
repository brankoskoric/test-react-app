import {Box, debounce, Grid, SelectChangeEvent, Switch, Typography} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import FilterBox from "../components/Product/FilterBox.tsx";
import "../pages/Product.css"
import {useLocation} from "react-router-dom";
import PaginationComponent from "../components/Pagination/Pagination.tsx";
import ErrorComponent from "../components/Error/ErrorComponent.tsx";
import {useQueryClient} from "@tanstack/react-query";
import PendingComponent from "../components/Pending/PendingComponent.tsx";
import useAllCategories from "../services/CategoryService.tsx";
import {getProductsByCategories, searchProducts, useAllProducts} from "../services/ProductService.tsx";

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
/*    const skip: number = parseInt(query.get('skip') ? query.get('skip')! : '0');
    const limit: number = parseInt(query.get('limit') ? query.get('limit')! : `${defaultPageSize}`);*/

    const queryClient = useQueryClient()

    const {
        isPending: isProductsDataPending,
        isError: isProductsError,
        data: productsData
    } = useAllProducts()

    useEffect(() => {
        if (productsData) {
            setTotalItems(productsData.numberOfElements)
        }
    }, [productsData])

    const {
        data: categoriesData
    } = useAllCategories()

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
                All products from Render
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
                        {productsData.content?.map((product) => (
                            <ProductListComponent product={product} isDummy={false}/>
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
                            {productsData.content?.map((product) => (
                                <Grid item key={product.id} xs={12} md={4}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center">
                                    <ProductCard product={product} isDummy={false}/>
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