import { Option } from "../../application/dto/utils/Option";
import { Brand } from "../models/Brand";

export interface BrandRepository {
  save(brand: Brand): Promise<Brand>;
  findById(id: number): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  delete(id: number): Promise<void>;
  findOptions(): Promise<Option[]>;
}
