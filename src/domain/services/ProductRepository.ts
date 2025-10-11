// src/domain/services/ProductRepository.ts
import { Product } from "../models/Product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  delete(id: number): Promise<void>;
  update(product: Product) : Promise<Product>;
}
