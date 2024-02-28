import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "master",
    clientId: "test-react-app",
});

export default keycloak;