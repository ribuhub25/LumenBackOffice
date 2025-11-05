import { Product } from "../../domain/models/Product";

export default interface PaginatedProductsResponse {
  products: Product[];
  total: number;
}
