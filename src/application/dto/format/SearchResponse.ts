import { BrandDTO } from "../models/BrandDTO";
import { CategoryDTO } from "../models/CategoryDTO";
import { ProductDTO } from "../models/ProductDTO";

export default interface SearchResponse {
  results: {
    brands: Array<BrandDTO>;
    categories: Array<CategoryDTO>;
    products: Array<ProductDTO>;
    keywords: Array<string>;
  },
  total: number 
}
