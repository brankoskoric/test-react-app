import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()
    const navigateProducts = () => {
        navigate("/products")
    }
    return (
        <div>
            <Typography gutterBottom variant="h3" component="div">
                Welcome
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
                Browse products
            </Typography>
            <Button variant={"outlined"} size="medium" onClick={navigateProducts}>Products</Button>
        </div>
    )
}

export default Dashboard