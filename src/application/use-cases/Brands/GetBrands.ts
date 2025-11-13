import { BrandRepository } from "../../../domain/services/BrandRepository";
import PaginatedResponse from "../../dto/format/PaginatedResponse";
import { BrandDTO } from "../../dto/models/BrandDTO";
export class GetBrands {
  constructor(private readonly repository: BrandRepository) {}

  async execute(search: string, sort: string, page: number, limit: number): Promise<PaginatedResponse<BrandDTO>> {
     return await this.repository.findAll(search,sort,page,limit);
  }
}
