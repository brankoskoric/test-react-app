import axios from "axios";
import {Card, CardActions, CardContent, CardMedia, Chip, Divider, Grid, Typography} from "@mui/material";
import {Product, ProductList} from "../interfaces/Entities.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState<Product[]>();

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
            <Grid container spacing={1}>
                {products?.map((product) => (

                    <Grid xs={4} md={4}>
                        <Card sx={{maxWidth: 345}}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={product.thumbnail}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Divider/>
                                <Typography variant="body2" color="text.primary">
                                    {product.price}$
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Chip label={product.category} variant="outlined" color="primary"/>
                                <Chip label={"Rating: " + product.rating} variant="outlined"/>
                                <Chip label={"In stock: " + product.stock} variant="outlined"/>
                            </CardActions>
                            <CardActions>
                                <Link to={"/products/" + product.id}>Details</Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </div>
    )
}

export default Products