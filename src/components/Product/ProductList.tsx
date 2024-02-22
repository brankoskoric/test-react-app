import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ProductProps} from "../../interfaces/Properties.tsx";
import {Button} from "@mui/material";

const ProductList = (props: ProductProps) => {
    const {product} = props

    return (
        <List sx={{width: '100%', maxWidth: 800, bgcolor: 'background.paper'}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={product.title}
                            src={product.thumbnail}
                            sx={{width: "80px", height: "80px"}}/>
                </ListItemAvatar>
                <ListItemText
                    sx={{marginLeft: "10px"}}
                    primary={product.title}
                    primaryTypographyProps={{fontSize:"20px"}}
                    secondary={
                        <>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {product.brand}
                            </Typography>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {" — " + product.category + " — Rating: " + product.rating + " — In stock: " + product.stock}
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemText
                    secondary={
                        <>
                            <Button>Details</Button>
                        </>
                    }
                />
            </ListItem>
        </List>
    );
}

export default ProductList