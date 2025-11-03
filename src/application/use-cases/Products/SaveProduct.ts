import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";

export class SaveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: Product, token: string): Promise<Product> {
    return await this.repository.update(product, token);
  }
}
