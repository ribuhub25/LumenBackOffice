import { ProductRepository } from "../../../domain/services/ProductRepository";
import PaginatedResponse from "../../dto/format/PaginatedResponse";
import { ProductDTO } from "../../dto/models/ProductDTO";

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    search: string,
    sort: string,
    page: number,
    limit: number,
    marca: string[],
    categoria: string[]
  ): Promise<PaginatedResponse<ProductDTO>> {
    return await this.repository.findAll(search, sort, page, limit, marca, categoria);
  }
}
