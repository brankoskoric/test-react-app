import {useParams} from "react-router-dom";
import {Button, ButtonBase, Chip, Divider, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Product} from "../interfaces/Entities.tsx";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorComponent from "../components/Error/ErrorComponent.tsx";

const ProductDetails = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState<Product>();
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        axios.get<Product>(`https://dummyjson.com/products/${productId}`)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((err) => {
                if (axios.isAxiosError(err)) {
                    setIsError(true)
                    setErrorMessage("Sorry, we can't show product at the moment. Please, try later.")
                }
                console.log(err)
            })
    }, []);

    return (
        <div>
            <Typography component={"div"} variant={"h4"}>
                Product details page
            </Typography>

            {!isError && <div className={"user-detail-container"}>
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
            </div>}

            {isError && <ErrorComponent message={errorMessage}/>}
        </div>
    )
}

export default ProductDetails