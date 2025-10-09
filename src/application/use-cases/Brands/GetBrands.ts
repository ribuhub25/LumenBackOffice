import { Brand } from "../../../domain/models/Brand";
import { BrandRepository } from "../../../domain/services/BrandRepository";
import { BrandDTO } from "../../dto/BrandDTO";

export class GetBrands {
  constructor(private readonly repository: BrandRepository) {}

  async execute(): Promise<Brand[]> {
     return await this.repository.findAll();
  }
}
