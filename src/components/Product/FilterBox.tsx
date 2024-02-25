import {Button, Divider, FormControl, InputBase, InputLabel, Paper, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import {ChangeEvent, useState} from "react";
import "../../components/Product/FilterBox.css"

interface ProductFilterBoxProps {
    categories: string[],
    selectName: string,

    handleCategoryChange(event: SelectChangeEvent): void

    handleClear(): void

    handleSearchChange(event: ChangeEvent<HTMLInputElement>): void
}

const FilterBox = (props: ProductFilterBoxProps) => {
    const {categories, selectName} = props
    const [search, setSearch] = useState("")
    const [selectValue, setSelectValue] = useState("")

    const handleClear = () => {
        props.handleClear()
        setSearch("")
        setSelectValue("blabla")
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        props.handleSearchChange(e)
    }

    const handleCategoryChange = (e: SelectChangeEvent) => {
        setSelectValue(e.target.value)
        props.handleCategoryChange(e)
    }

    return (
        <div className={"filter-box"}>
            <Paper
                component="div"
                className={"filter-box-paper"}
                elevation={0}
            >
                <FormControl variant={"standard"} className={"filter-box-select"}>
                    <InputLabel id="select-label">{selectName}</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectValue}
                        onChange={handleCategoryChange}
                    >
                        {categories?.map((category) => (
                            <MenuItem value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider sx={{height: 28, m: 1}} orientation="vertical"/>
                <InputBase
                    sx={{ml: 2, flex: 1}}
                    placeholder="Search"
                    value={search}
                    inputProps={{'aria-label': 'search'}}
                    onChange={handleSearchChange}
                />
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                    <Button onClick={handleClear}>Clear</Button>
                </IconButton>
            </Paper>
        </div>
    )
}

export default FilterBox