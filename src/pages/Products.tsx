import axios from "axios";
import {Link} from "react-router-dom";
import {Divider, Typography} from "@mui/material";

const getProducts = () => {
    axios.get('https://dummyjson.com/products')
        .then((response) => {
            console.log(response.data.products)
        })
}

const Products = () => {
    getProducts()

    return (
        <div>
            <Typography component="div" variant="h4" gutterBottom>
                All products
            </Typography>
            <Divider orientation="vertical" flexItem/>
            <Typography component="div">
                <Link to="/"> Home </Link>
            </Typography>
        </div>
    )
}

export default Products