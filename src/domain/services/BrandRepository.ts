import JsonResponse from "../../application/dto/format/JsonResponse";
import PaginatedResponse from "../../application/dto/format/PaginatedResponse";
import { BrandDTO } from "../../application/dto/models/BrandDTO";
import { Option } from "../../application/dto/utils/Option";
import { Brand } from "../models/Brand";

export interface BrandRepository {
  save(brand: Brand, token: string): Promise<JsonResponse<Brand>>;
  findById(id: number): Promise<Brand | null>;
  findAll(search: string,
    sort: string,
    page: number,
    limit: number,): Promise<PaginatedResponse<BrandDTO>>;
  delete(id: number, token: string): Promise<JsonResponse<[]>>;
  update(Brand: Brand, token: string): Promise<JsonResponse<Brand>>;
  findOptions(): Promise<Option[]>;
}
