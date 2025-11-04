import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class SaveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(product: ProductDTO, token: string): Promise<ProductDTO> {
    return await this.repository.update(product, token);
  }
}
