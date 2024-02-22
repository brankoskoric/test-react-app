import axios from "axios";
import {Box, Grid, Switch, Typography} from "@mui/material";
import {Product, ProductListResponse} from "../interfaces/Entities.tsx";
import React, {useEffect, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import "../pages/Product.css"
import {useLocation} from "react-router-dom";
import PaginationComponent from "../components/Pagination/Pagination.tsx";

const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const [showAsListChecked, setShowAsListChecked] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const useQuery = () => {
        const {search} = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const defaultPageSize = 6;
    const query = useQuery();
    const currentPage: number = parseInt(query.get('page') ? query.get('page')! : '1');
    const skip: number = parseInt(query.get('skip') ? query.get('skip')! : '0');
    const limit: number = parseInt(query.get('limit') ? query.get('limit')! : `${defaultPageSize}`);

    useEffect(() => {
        axios.get<ProductListResponse>(`https://dummyjson.com/products?page=${currentPage}&limit=${limit}&skip=${skip}`)
            .then((response) => {
                setProducts(response.data.products)
                setTotalItems(response.data.total);
            })
    }, [currentPage]);
    return (
        <div>
            <Typography component="div" variant="h4" gutterBottom>
                All products
            </Typography>

            Show as list <Switch checked={showAsListChecked}
                                 onChange={() => {
                                     setShowAsListChecked(!showAsListChecked);
                                 }}/>

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
                            <Grid key={product.id} xs={12} md={4}
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
        </div>
    )
}

export default Products