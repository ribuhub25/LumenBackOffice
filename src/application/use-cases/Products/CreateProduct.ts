import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: Product, token: string): Promise<Product> {
    return await this.repository.save(product, token);
  }
}
