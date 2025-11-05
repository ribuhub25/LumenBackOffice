// src/domain/services/ProductRepository.ts
import { ProductDTO } from "../../application/dto/ProductDTO";
import PaginatedProductsResponse from "../../application/dto/ProductResponse";
import { Product } from "../models/Product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(
    search: string,
    sort: string,
    page: number,
    limit: number
  ): Promise<PaginatedProductsResponse>;
  delete(id: number): Promise<void>;
  update(product: ProductDTO, token: string): Promise<ProductDTO>;
}
