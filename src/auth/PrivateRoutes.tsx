import {useKeycloak} from "@react-keycloak/web";

const PrivateRoute = ({children}: { children: any }) => {
    const {keycloak} = useKeycloak();

    const isLoggedIn = keycloak.authenticated;
    console.log(isLoggedIn)
    console.log(children)
    console.log(keycloak.token)
    return isLoggedIn ? children : <div>Please login</div>;
};

export default PrivateRoute;