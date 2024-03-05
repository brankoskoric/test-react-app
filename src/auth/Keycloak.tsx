import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://vidoje-keycloak.azurewebsites.net/",
    realm: "master",
    clientId: "test-react-app",
});

export default keycloak;