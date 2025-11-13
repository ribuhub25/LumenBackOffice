import { Brand } from "../../../domain/models/Brand";
import { Category } from "../../../domain/models/Category";
import { CategoryRepository } from "../../../domain/services/CategoryRepository";
import PaginatedResponse from "../../dto/format/PaginatedResponse";
import { CategoryDTO } from "../../dto/models/CategoryDTO";

export class GetCategories {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(search: string,
    sort: string,
    page: number,
    limit: number): Promise<PaginatedResponse<CategoryDTO>> {
     return await this.repository.findAll(search,sort,page,limit);
  }
}
