import Dashboard from "../pages/Dashboard.tsx";
import Products from "../pages/Products.tsx";

const pages = [
    {name: "Home", path: "/", element: <Dashboard/>},
    {name: "Products", path: "/products", element: <Products/>}]
;

export default pages
