import {useKeycloak} from "@react-keycloak/web";

const PrivateRoute = ({children}: { children: any }) => {
    const {keycloak} = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    return isLoggedIn ? children : <div>Please login</div>;
};

export default PrivateRoute;