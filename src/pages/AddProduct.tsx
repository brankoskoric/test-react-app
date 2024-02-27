import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import useAllCategories from "../services/CategoryService.tsx";
import React, {useState} from "react";
import {Product} from "../interfaces/Entities.tsx"
import ErrorComponent from "../components/Error/ErrorComponent.tsx";
import PendingComponent from "../components/Pending/PendingComponent.tsx";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const AddProduct = () => {
    const emptyProduct = {
        id: '',
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        imageUrl:''

    }

    const [productFormData, setProductFormData] = useState<Product>(emptyProduct)

    const {
        isError,
        isPending,
        data: categories
    } = useAllCategories()

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name} = event.target
        let {value}: { name: string, value: string | number } = event.target;
        if (event.target.type === "number") {
            value = event.target.valueAsNumber
        }
        setProductFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const {value} = event.target
        setProductFormData(prevData => ({...prevData, ["category"]: value}))
    }

    const mutation = useMutation({
        mutationFn: (newProduct: Product) => {
            return axios.post("https://dummyjson.com/products/add", newProduct)
        },
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(productFormData)
        mutation.mutate(productFormData)
        setProductFormData(emptyProduct)
    }

    return (
        <>
            <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '100%'}}}>
                <Typography
                    component="h2"
                    variant="h2"
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        alignSelf: 'center',
                        textAlign: 'center',
                    }}
                >
                    Add new&nbsp;
                    <Typography
                        component="span"
                        variant="h2"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                    >
                        product
                    </Typography>
                </Typography>
            </Stack>

            {mutation.isSuccess ?
                <Alert severity="success" sx={{fontSize: "14px"}}>Product added</Alert> : null}
            {mutation.isError ?
                <Alert severity="error" sx={{fontSize: "14px"}}>Error: {mutation.error.message}</Alert> : null}

            {isError && <ErrorComponent message={"Error"}/>}
            {isPending && <PendingComponent/>}

            {!isError && !isPending && <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    name="title"
                                    fullWidth
                                    required
                                    onChange={handleInput}
                                    value={productFormData.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="brand"
                                    label="Brand"
                                    name="brand"
                                    fullWidth
                                    required
                                    onChange={handleInput}
                                    value={productFormData.brand}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="thumbnail"
                                    label="Thumbnail link"
                                    name="thumbnail"
                                    fullWidth
                                    required
                                    onChange={handleInput}
                                    value={productFormData.thumbnail}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="price"
                                    label="Price"
                                    inputProps={{type: 'number'}}
                                    fullWidth
                                    name="price"
                                    required
                                    onChange={handleInput}
                                    value={productFormData.price}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="stock"
                                    label="Stock"
                                    inputProps={{type: 'number'}}
                                    fullWidth
                                    name={"stock"}
                                    required
                                    onChange={handleInput}
                                    value={productFormData.stock}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="discountPercentage"
                                    label="Discount percentage"
                                    name={"discountPercentage"}
                                    inputProps={{type: 'number'}}
                                    fullWidth
                                    onChange={handleInput}
                                    value={productFormData.discountPercentage}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="rating"
                                    label="Rating"
                                    name={"rating"}
                                    inputProps={{type: 'number'}}
                                    fullWidth
                                    onChange={handleInput}
                                    value={productFormData.rating}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="cat-select-label">Categories</InputLabel>
                                    <Select
                                        labelId="cat-select-label"
                                        id="select"
                                        label="Categories"
                                        name={"categories"}
                                        onChange={handleCategoryChange}
                                        fullWidth
                                        value={productFormData.category}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    name={"description"}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={handleInput}
                                    value={productFormData.description}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, width: "50%"}}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Container>}
        </>
    )
}

export default AddProduct