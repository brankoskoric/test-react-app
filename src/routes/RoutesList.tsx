import Dashboard from "../pages/Dashboard.tsx";
import Products from "../pages/Products.tsx";
import ProductDetails from "../pages/ProductDetails.tsx";

const pages = [
    {name: "Home", path: "/", element: <Dashboard/>, isMainNavigation: true},
    {name: "Products", path: "/products", element: <Products/>, isMainNavigation: true},
    {name: "Product Detail", path: "/products/:productId", element: <ProductDetails/>, isMainNavigation: false}
]

export default pages
