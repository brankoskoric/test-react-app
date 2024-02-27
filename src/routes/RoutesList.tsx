import Dashboard from "../pages/Dashboard.tsx";
import ProductsDummy from "../pages/ProductsDummy.tsx";
import Products from "../pages/Products.tsx";
import ProductDetails from "../pages/ProductDetails.tsx";
import AddProduct from "../pages/AddProduct.tsx";

const pages = [
    {name: "Home", path: "/", element: <Dashboard/>, isMainNavigation: true},
    {name: "Products_Dummy", path: "/products/dummy", element: <ProductsDummy/>, isMainNavigation: true},
    {name: "Products", path: "/products", element: <Products/>, isMainNavigation: true},
    {name: "Product Detail", path: "/products/:productId",
        element: <ProductDetails isDummy={false}/>, isMainNavigation: false},
    {name: "Product Detail Dummy", path: "/products/dummy/:productId",
        element: <ProductDetails isDummy/>, isMainNavigation: false},
    {name: "Add product", path: "/products/dummy/new", element: <AddProduct/>, isMainNavigation: true},
]

export const findPath = (name: string): string => {
    const page = pages.find(page => page.name === name);
    if (page) {
        const {path} = page
        const colonIndex = path.indexOf('/:')

        if (colonIndex !== -1) {
            return path.substring(0, colonIndex)
        }
        return path
    }
    return ""
}

export default pages
