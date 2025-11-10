import { ProductDTO } from "../models/ProductDTO";

export default interface SearchResponse {
  results: {
    brands: Array<string>;
    categories: Array<string>;
    products: Array<ProductDTO>;
    keywords: Array<string>;
  },
  total: number 
}
