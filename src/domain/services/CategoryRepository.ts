
import { Option } from "../../application/dto/Option";
import { Category } from "../models/Category";

export interface CategoryRepository {
  save(category: Category): Promise<Category>;
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  delete(id: number): Promise<void>;
  findOptions(): Promise<Option[]>;
}
