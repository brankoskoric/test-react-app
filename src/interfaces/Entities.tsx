export interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    imageUrl: string
}

export interface ProductListResponseDummy {
    products: Product[]
    total: number
}

export interface ProductListResponse {
    content: Product[]
    numberOfElements: number
}