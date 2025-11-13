import { Brand } from "../../../domain/models/Brand";
import { BrandRepository } from "../../../domain/services/BrandRepository";
import JsonResponse from "../../dto/format/JsonResponse";

export class AddBrand {
  constructor(private readonly repository: BrandRepository) {}

  async execute(brand: Brand, token: string): Promise<JsonResponse<Brand>> {
    return await this.repository.save(brand, token);
  }
}
