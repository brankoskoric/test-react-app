import {Box, debounce, Grid, SelectChangeEvent, Switch, Typography} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import FilterBox from "../components/Product/FilterBox.tsx";
import "../pages/Product.css"
import {Link, useLocation} from "react-router-dom";
import ErrorComponent from "../components/Error/ErrorComponent.tsx";
import {useQueryClient} from "@tanstack/react-query";
import PendingComponent from "../components/Pending/PendingComponent.tsx";
import useAllCategories from "../services/dummy/CategoryService.tsx";
import useAllProductsDummy, {getProductsByCategories, searchProducts} from "../services/dummy/ProductService.tsx";
import {findPath} from "../routes/RoutesList.tsx";
import RoutesIds from "../routes/RoutesIds.tsx";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const ProductsDummy = () => {
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

    const {
        isPending: isProductsDataPending,
        isError: isProductsError,
        data: productsData
    } = useAllProductsDummy({currentPage, limit, skip})

    useEffect(() => {
        if (productsData) {
            setTotalItems(productsData.total)
        }
    }, [productsData])

    const {
        data: categoriesData
    } = useAllCategories()

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        getProductsByCategories(event.target.value)
            .then((products) => {
                queryClient.setQueryData(['products_dummy'], () => products)
            })
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    const handleClear = async () => {
        await queryClient.refetchQueries({queryKey: ['products_dummy'], type: 'active'})
    }

    const debouncedSearch = React.useRef(
        debounce(async (criteria: string) => {
            searchProducts(criteria)
                .then((products) => {
                    queryClient.setQueryData(['products_dummy'], () => products)
                })
        }, 300)
    ).current;

    return (
        <div>
            <Typography component="div" variant="h4" gutterBottom>
                All products from dummyJSON
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
                        {productsData.products?.map((product) => (
                            <ProductListComponent product={product} isDummy/>
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
                            {productsData.products?.map((product) => (
                                <Grid item key={product.id} xs={12} md={4}
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center">
                                    <ProductCard product={product} isDummy/>
                                </Grid>
                            ))
                            }
                        </Grid>
                    </>
                }
                <Box display="flex"
                     justifyContent='center'
                     sx={{m: 2}}>
                    <Pagination
                        page={currentPage}
                        count={totalItems == 0 ? 1 : Math.ceil(totalItems / defaultPageSize)}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`${findPath(RoutesIds.PRODUCTS_DUMMY)}${item.page == 1 ? '' : 
                                    `?page=${item.page}&limit=${defaultPageSize}&skip=${(item.page! - 1) * defaultPageSize}`}`}
                                {...item}
                            />
                        )}
                    />
                </Box>
            </>}
        </div>
    )
}

export default ProductsDummy