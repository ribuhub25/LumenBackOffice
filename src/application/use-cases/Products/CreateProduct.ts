import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import JsonResponse from "../../dto/format/JsonResponse";
import { ProductDTO } from "../../dto/models/ProductDTO";

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: Product, token: string): Promise<JsonResponse<Product>> {
    return await this.repository.add(product, token);
  }
}
