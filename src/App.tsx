import './App.css'
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./auth/Keycloak.tsx"

function App() {
    return (
        <>
            <ReactKeycloakProvider authClient={keycloak}>
                <HashRouter>
                    <Header/>
                    <Routes/>
                    <Footer/>
                </HashRouter>
            </ReactKeycloakProvider>
        </>
    )
}

export default App
