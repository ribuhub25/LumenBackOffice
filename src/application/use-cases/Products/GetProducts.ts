import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.repository.findAll();
  }
}
