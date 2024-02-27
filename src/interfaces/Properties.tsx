import {Product} from "./Entities.tsx";
import {SelectChangeEvent} from "@mui/material";
import {ChangeEvent} from "react";

export interface ProductProps {
    product: Product,
    isDummy: boolean
}

export interface ErrorProps {
    message: string
}

export interface ProductFilterBoxProps {
    categories: string[],
    selectName: string,

    handleCategoryChange(event: SelectChangeEvent): void

    handleClear(): void

    handleSearchChange(event: ChangeEvent<HTMLInputElement>): void
}