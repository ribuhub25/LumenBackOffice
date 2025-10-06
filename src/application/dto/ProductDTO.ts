export interface ProductDTO {
    id: number,
    created_at: Date,
    name: string,
    price: number,
    rating: number,
    review_count: number,
    href: string,
    description: string,
    imageSrc: string,
    imageAlt: string,
    discount: number,
    status: number,
    brandId: number,
    stock: number,
    category: string
}