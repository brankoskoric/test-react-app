import './App.css'
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes/>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App
