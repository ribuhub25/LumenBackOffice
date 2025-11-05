import { ProductRepository } from "../../../domain/services/ProductRepository";
import PaginatedProductsResponse from "../../dto/ProductResponse";

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    search: string,
    sort: string,
    page: number,
    limit: number
  ): Promise<PaginatedProductsResponse> {
    return await this.repository.findAll(search, sort, page, limit);
  }
}
