import axios from "axios";
import {Grid, Switch, Typography} from "@mui/material";
import {Product, ProductList} from "../interfaces/Entities.tsx";
import {useEffect, useState} from "react";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductListComponent from "../components/Product/ProductList.tsx";
import "../pages/Product.css"

const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const [showAsListChecked, setShowAsListChecked] = useState(false);

    useEffect(() => {
        axios.get<ProductList>('https://dummyjson.com/products')
            .then((response) => {
                setProducts(response.data.products)
            })
    }, []);

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


            {!showAsListChecked && <Grid
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
            }
        </div>
    )
}

export default Products