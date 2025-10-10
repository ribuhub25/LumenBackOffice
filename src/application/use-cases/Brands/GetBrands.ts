import { Brand } from "../../../domain/models/Brand";
import { BrandRepository } from "../../../domain/services/BrandRepository";
export class GetBrands {
  constructor(private readonly repository: BrandRepository) {}

  async execute(): Promise<Brand[]> {
     return await this.repository.findAll();
  }
}
