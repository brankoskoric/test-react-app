import {useParams} from "react-router-dom";
import {Button, ButtonBase, Chip, Divider, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Product} from "../interfaces/Entities.tsx";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        axios.get<Product>(`https://dummyjson.com/products/${productId}`)
            .then((response) => {
                setProduct(response.data)
            })
    }, []);

    return (
        <div>
            <Typography component={"div"} variant={"h4"}>
                Product details page
            </Typography>

            <div className={"user-detail-container"}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <ButtonBase>
                            <img className={"main-image"} alt="complex" src={product?.thumbnail}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{textAlign: "left"}}>
                        <Typography variant="subtitle1" component="div">
                            {product?.brand}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {product?.title}
                        </Typography>
                        <Typography sx={{width: "90%"}} gutterBottom variant="body1" component="div">
                            {product?.description}
                        </Typography>
                        <Divider sx={{width: "90%"}}/>
                        <div style={{marginTop: "20px"}}>
                            <Chip label={product?.category} variant="outlined" color="primary"/>
                            <Chip label={"Rating: " + product?.rating} variant="outlined"/>
                            <Chip label={"In stock: " + product?.stock} variant="outlined"/>
                        </div>
                        <div className={"price-number"}>
                            {product?.price}$
                        </div>
                        <div className={"price-saving"}>
                            Save {product?.discountPercentage}%
                        </div>

                        <div className="add-to-cart">
                            <Button variant="contained" endIcon={<ShoppingCartIcon/>}>Add </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProductDetails