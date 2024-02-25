import axios from "axios";
import {Box, debounce, Grid, SelectChangeEvent, Switch, Typography} from "@mui/material";
import {Product, ProductListResponse} from "../interfaces/Entities.tsx";
import React, {ChangeEvent, useEffect, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import FilterBox from "../components/Product/FilterBox.tsx";
import "../pages/Product.css"
import {useLocation} from "react-router-dom";
import PaginationComponent from "../components/Pagination/Pagination.tsx";
import ErrorComponent from "../components/Error/ErrorComponent.tsx";

const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const [categories, setCategories] = useState<string[]>([]);
    const [showAsListChecked, setShowAsListChecked] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const useQuery = () => {
        const {search} = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const defaultPageSize = 6;
    const query = useQuery();
    const currentPage: number = parseInt(query.get('page') ? query.get('page')! : '1');
    const skip: number = parseInt(query.get('skip') ? query.get('skip')! : '0');
    const limit: number = parseInt(query.get('limit') ? query.get('limit')! : `${defaultPageSize}`);

    const getCategories = () => {
        axios.get<string[]>(`https://dummyjson.com/products/categories`)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getAllProducts = () => {
        axios.get<ProductListResponse>(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}&skip=${skip}`)
            .then((response) => {
                setProducts(response.data.products)
                setTotalItems(response.data.total);
                getCategories()
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    setIsError(true)
                    setErrorMessage("Sorry, we can't show products at the moment. Please, try later.")
                }
                console.log(err)
            })
    }

    const searchProducts = (term: string) => {
        axios.get<ProductListResponse>(`https://dummyjson.com/products/search?q=${term}`)
            .then((response) => {
                setProducts(response.data.products)
                setTotalItems(response.data.total);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProductsByCategories = (category: string) => {
        axios.get<ProductListResponse>(`https://dummyjson.com/products/category/${category}`)
            .then((response) => {
                setProducts(response.data.products)
                setTotalItems(response.data.total);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllProducts()
    }, [currentPage]);

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        getProductsByCategories(event.target.value)
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    const debouncedSearch = React.useRef(
        debounce(async (criteria: string) => {
            searchProducts(criteria)
        }, 300)
    ).current;

    return (
        <div>
            <Typography component="div" variant="h4" gutterBottom>
                All products
            </Typography>

            {!isError && <>
                Show as list <Switch checked={showAsListChecked}
                                     onChange={() => {
                                         setShowAsListChecked(!showAsListChecked);
                                     }}/>

                <FilterBox categories={categories}
                           handleCategoryChange={handleCategoryChange}
                           selectName={"Categories"}
                           handleClear={getAllProducts}
                           handleSearchChange={handleSearchChange}/>

                {showAsListChecked &&
                    <div className={'product-list-container'}>
                        {products?.map((product) => (
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
                            {products?.map((product) => (
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

            {isError && <ErrorComponent message={errorMessage}/>}
        </div>
    )
}

export default Products