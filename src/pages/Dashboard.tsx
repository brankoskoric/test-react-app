import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {findPath} from "../routes/RoutesList.tsx";
import RoutesIds from "../routes/RoutesIds.tsx";

const Dashboard = () => {
    const navigate = useNavigate()
    const navigateProducts = () => {
        navigate(findPath(RoutesIds.PRODUCTS))
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