import {Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {ProductProps} from "../../interfaces/Properties.tsx";
import {useNavigate} from "react-router-dom";
import {findPath} from "../../routes/RoutesList.tsx";
import RoutesIds from "../../routes/RoutesIds.tsx";

const ProductCard = (props: ProductProps) => {
    const {product} = props
    const navigate = useNavigate()
    const navigateProductDetail = () => {
        navigate(`${findPath(RoutesIds.PRODUCT_DETAIL)}/${product.id}`)
    }

    return (
        <Card sx={{width: 350, height: 400, marginBottom: "20px"}}>
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
                <Divider/>
                <Typography variant="body1" color="text.primary">
                    {product.brand}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{marginTop: '10px'}}>
                    {product.price}$
                </Typography>
            </CardContent>
            <CardActions>
                <Chip label={product.category} variant="outlined" color="primary"/>
                <Chip label={"Rating: " + product.rating} variant="outlined"/>
                <Chip label={"In stock: " + product.stock} variant="outlined"/>
            </CardActions>
            <CardActions>
                <Button startIcon={<SendIcon/>} onClick={navigateProductDetail}>Details</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard