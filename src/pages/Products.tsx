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
import useAllCategories from "../services/CategoryService.tsx";
import {getProductsByCategories, searchProducts, useAllProducts} from "../services/ProductService.tsx";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {findPath} from "../routes/RoutesList.tsx";
import RoutesIds from "../routes/RoutesIds.tsx";

const defaultPageSize = 6;

const Products = () => {
    const [showAsListChecked, setShowAsListChecked] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const errorMessage: string = "Sorry, we can't show products at the moment. Please, try later."

    const useLocationQuery = () => {
        const {search} = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const query = useLocationQuery();
    const page: number = parseInt(query.get('page') ? query.get('page')! : '1');
    const size: number = parseInt(query.get('size') ? query.get('size')! : `${defaultPageSize}`);

    const queryClient = useQueryClient()

    const {
        isPending: isProductsDataPending,
        isError: isProductsError,
        data: productsData,
    } = useAllProducts(page - 1, size)

    useEffect(() => {
        if (productsData) {
            setTotalItems(productsData.totalElements)
        }
    }, [productsData])

    const {
        data: categoriesData
    } = useAllCategories()

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        getProductsByCategories(event.target.value, 0, defaultPageSize).then((res) => {
            if (!res.last) {
                for (let i = 1; i < res.totalPages; i++) {
                    getProductsByCategories(event.target.value, i, defaultPageSize).then((r) => {
                        queryClient.setQueryData(['products', i], () => r)
                    })
                }
            }
            queryClient.setQueryData(['products', 0], () => res)
        })
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    const handleClear = async () => {
        await queryClient.refetchQueries({queryKey: ['products'], type: 'active'})
    }

    const debouncedSearch = React.useRef(
        debounce(async (term: string) => {
            searchProducts(term, 0, defaultPageSize).then((res) => {
                if (!res.last) {
                    for (let i = 1; i < res.totalPages; i++) {
                        searchProducts(term, i, defaultPageSize).then((r) => {
                            queryClient.setQueryData(['products', i], () => r)
                        })
                    }
                }
                queryClient.setQueryData(['products', 0], () => res)
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
                    <Pagination
                        page={page}
                        count={totalItems == 0 ? 1 : Math.ceil(totalItems / defaultPageSize)}
                        renderItem={(item) => {
                            return <PaginationItem
                                component={Link}
                                to={`${findPath(RoutesIds.PRODUCTS)}${item.page == 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        }}
                    />
                </Box>
            </>}
        </div>
    )
}

export default Products