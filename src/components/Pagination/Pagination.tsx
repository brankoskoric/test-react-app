import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {Link} from "react-router-dom";
import {findPath} from "../../routes/RoutesList.tsx";
import RoutesIds from "../../routes/RoutesIds.tsx";

const PaginationComponent = ({page, totalItems, pageLimit}: { page: number, totalItems: number, pageLimit: number}) => {
    return (
        <Pagination
            page={page}
            count={totalItems == 0 ? 1 : Math.ceil(totalItems / pageLimit)}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`${findPath(RoutesIds.PRODUCTS_DUMMY)}${item.page == 1 ? '' : `?page=${item.page}&limit=${pageLimit}&skip=${(item.page! - 1) * pageLimit}`}`}
                    {...item}
                />
            )}
        />
    )
}

export default PaginationComponent