import Dashboard from "../pages/Dashboard.tsx";
import Products from "../pages/Products.tsx";
import ProductDetails from "../pages/ProductDetails.tsx";

const pages = [
    {name: "Home", path: "/", element: <Dashboard/>, isMainNavigation: true},
    {name: "Products", path: "/products", element: <Products/>, isMainNavigation: true},
    {name: "Product Detail", path: "/products/:productId", element: <ProductDetails/>, isMainNavigation: false}
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
