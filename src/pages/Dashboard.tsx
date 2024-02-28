import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {findPath} from "../routes/RoutesList.tsx";
import RoutesIds from "../routes/RoutesIds.tsx";
import {useKeycloak} from "@react-keycloak/web";

const Dashboard = () => {
    const navigate = useNavigate()
    const navigateProducts = () => {
        navigate(findPath(RoutesIds.PRODUCTS_DUMMY))
    }

    const navigateNewProduct = () => {
        navigate(findPath(RoutesIds.ADD_PRODUCT))
    }

    const {keycloak} = useKeycloak();

    return (
        <div>
            <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '100%'}}}>
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        alignSelf: 'center',
                        textAlign: 'center',
                    }}
                >
                    Our latest&nbsp;
                    <Typography
                        component="span"
                        variant="h1"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >
                        products
                    </Typography>
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary">
                    Explore our cutting-edge platform, delivering high-quality solutions
                    tailored to your needs. <br/>
                    Elevate your experience with browsing our products
                </Typography>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{pt: 2, width: {xs: '100%', sm: 'auto'}}}
                >
                    <Button variant={"contained"} size="medium" onClick={navigateProducts}>Products</Button>
                    <Button variant={"outlined"} size="medium" onClick={navigateNewProduct}>New product</Button>
                    {!keycloak.authenticated && (
                        <Button
                            type="button"
                            onClick={() => keycloak.login()}
                        >
                            Login
                        </Button>
                    )}

                    {!!keycloak.authenticated && (
                        <button
                            type="button"
                            className="text-blue-800"
                            onClick={() => keycloak.logout()}
                        >
                            Logout ({keycloak.tokenParsed.preferred_username})
                        </button>
                    )}
                </Stack>
            </Stack>
        </div>
    )
}

export default Dashboard