import {Route, Routes} from "react-router-dom";
import pages from "./RoutesList.tsx";

const AppRoutes = () => {
    return (
        <div className="content">
            <Routes>
                {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={page.element}/>
                ))}
            </Routes>
        </div>
    )
}

export default AppRoutes;