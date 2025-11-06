// src/domain/services/ProductRepository.ts
import { ProductDTO } from "../../application/dto/models/ProductDTO";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { Product } from "../models/Product";
import { Express } from "express";
import JsonResponse from "../../application/dto/format/JsonResponse";


export interface ProductRepository {
  add(product: Product, token: string): Promise<JsonResponse<Product>>;
  findById(id: number): Promise<Product | null>;
  findAll(search: string, sort: string, page: number, limit: number): Promise<PaginatedResponse<ProductDTO>>;
  delete(id: number, token: string): Promise<JsonResponse<[]>>;
  update(product: ProductDTO, token: string): Promise<JsonResponse<ProductDTO>>;
  upload(file: Express.Multer.File, fileName: string): Promise<string>;
}
