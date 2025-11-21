import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";

export class GetProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: number): Promise<Product | null> {
    return await this.repository.findById(id);
  }
}
