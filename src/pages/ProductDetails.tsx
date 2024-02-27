import {useParams} from "react-router-dom";
import {Button, ButtonBase, Chip, Divider, Grid, Typography} from "@mui/material";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorComponent from "../components/Error/ErrorComponent.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import PendingComponent from "../components/Pending/PendingComponent.tsx";
import {Product} from "../interfaces/Entities.tsx";
import {useEffect} from "react";

const ProductDetails = ({isDummy}: { isDummy: boolean }) => {
    const {productId} = useParams()
    const errorMessage: string = "Sorry, we can't show product at the moment. Please, try later."
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.removeQueries({queryKey: ["productDetails"], exact: true})
    }, [])

    const fetchProduct = async () => {
        let url
        if (isDummy) {
            url = `https://dummyjson.com/products/${productId}`
        } else {
            url = `https://product-backend-wwcv.onrender.com/api/v1/products/${productId}`
        }
        console.log(url)
        const response = await axios.get<Product>(url)
        return response.data;
    }

    const {isPending, isError, data} = useQuery({
            queryKey: ['productDetails'],
            queryFn: fetchProduct
        }
    )

    return (
        <div>
            <Typography component={"div"} variant={"h4"}>
                Product details page
            </Typography>

            {isPending && <PendingComponent/>}

            {isError && <ErrorComponent message={errorMessage}/>}

            {!isError && !isPending &&
                <div className={"user-detail-container"}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <ButtonBase>
                                <img className={"main-image"} alt="complex"
                                     src={data?.thumbnail ? data.thumbnail : data.imageUrl}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{textAlign: "left"}}>
                            <Typography variant="subtitle1" component="div">
                                {data?.brand}
                            </Typography>
                            <Typography variant="h4" component="div">
                                {data?.title}
                            </Typography>
                            <Typography sx={{width: "90%"}} gutterBottom variant="body1" component="div">
                                {data?.description}
                            </Typography>
                            <Divider sx={{width: "90%"}}/>
                            <div style={{marginTop: "20px"}}>
                                <Chip label={data.category} variant="outlined" color="primary"/>
                                {data.rating && <Chip label={"Rating: " + data.rating} variant="outlined"/>}
                                {data.stock && <Chip label={"In stock: " + data.stock} variant="outlined"/>}
                            </div>
                            <div className={"price-number"}>
                                {data?.price}$
                            </div>
                            {data.discountPercentage && <div className={"price-saving"}>
                                Save {data.discountPercentage}%
                            </div>}

                            <div className="add-to-cart">
                                <Button variant="contained" endIcon={<ShoppingCartIcon/>}>Add </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>}
        </div>
    )
}

export default ProductDetails