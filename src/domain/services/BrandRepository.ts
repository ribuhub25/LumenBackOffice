import { Brand } from "../models/Brand";

export interface BrandRepository {
  save(product: Brand): Promise<Brand>;
  findById(id: number): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  delete(id: number): Promise<void>;
}
