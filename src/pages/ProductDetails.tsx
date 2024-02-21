import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

const ProductDetails = () => {
    const {productId} = useParams()

    return (
        <div>
            <Typography component={"div"} variant={"h4"}>
                User detail page
            </Typography>
            <Typography component={"div"} variant={"body1"}>
                User id: {productId}
            </Typography>
        </div>
    )
}

export default ProductDetails