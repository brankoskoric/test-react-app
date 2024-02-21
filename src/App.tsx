import './App.css'
import {HashRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
    return (
        <>
            <HashRouter>
                <Header/>
                <Routes/>
                <Footer/>
            </HashRouter>
        </>
    )
}

export default App
