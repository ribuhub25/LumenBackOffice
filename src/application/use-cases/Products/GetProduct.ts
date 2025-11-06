import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/models/ProductDTO";

export class GetProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: number): Promise<Product> {
    return await this.repository.findById(id);
  }
}
