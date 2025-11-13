
import JsonResponse from "../../application/dto/format/JsonResponse";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { CategoryDTO } from "../../application/dto/models/CategoryDTO";
import { Option } from "../../application/dto/utils/Option";
import { Category } from "../models/Category";

export interface CategoryRepository {
  save(category: Category, token: string): Promise<JsonResponse<Category>>;
  findById(id: number): Promise<Category | null>;
  findAll(search: string,
    sort: string,
    page: number,
    limit: number): Promise<PaginatedResponse<CategoryDTO>>;
  update(category: Category, token: string): Promise<JsonResponse<Category>>;
  delete(id: number, token: string): Promise<JsonResponse<[]>>;
  findOptions(): Promise<Option[]>;
}
