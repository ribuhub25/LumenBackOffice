import { ProductRepository } from "../../../domain/services/ProductRepository";
import JsonResponse from "../../dto/format/JsonResponse";
import { ProductDTO } from "../../dto/models/ProductDTO";

export class SaveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: ProductDTO, token: string): Promise<JsonResponse<ProductDTO>> {
    return await this.repository.update(product, token);
  }
}
