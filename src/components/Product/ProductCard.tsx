import {Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {ProductProps} from "../../interfaces/Properties.tsx";
import {useNavigate} from "react-router-dom";
import {findPath} from "../../routes/RoutesList.tsx";
import RoutesIds from "../../routes/RoutesIds.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import ModalComponent from "../Modal/Modal.tsx";
import {useKeycloak} from "@react-keycloak/web";

const ProductCard = (props: ProductProps) => {
    const {product} = props
    const navigate = useNavigate()
    const navigateProductDetail = () => {
        if (props.isDummy) {
            navigate(`${findPath(RoutesIds.PRODUCT_DETAIL_DUMMY)}/${product.id}`)
        } else {
            navigate(`${findPath(RoutesIds.PRODUCT_DETAIL)}/${product.id}`)
        }
    }

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const {keycloak} = useKeycloak();

    return (
        <>
            <Card sx={{width: 350, height: 400, marginBottom: "20px"}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={product.thumbnail ? product.thumbnail : product.imageUrl}
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
                    {product.rating && <Chip label={"Rating: " + product.rating} variant="outlined"/>}
                    {product.stock && <Chip label={"In stock: " + product.stock} variant="outlined"/>}
                </CardActions>
                <CardActions>
                    <Button startIcon={<SendIcon/>} onClick={navigateProductDetail}>Details</Button>
                    {keycloak.authenticated && <Button startIcon={<DeleteIcon/>} color="error" onClick={handleOpen}>Delete</Button>}
                </CardActions>
            </Card>

            <ModalComponent header={"Are you sure?"}
                            openModal={openModal}
                            buttonText={"Yes"}
                            action={()=> {handleClose(); console.log(`Deleting ${product.id}`)}}
                            handleClose={handleClose} />
        </>
    )
}

export default ProductCard