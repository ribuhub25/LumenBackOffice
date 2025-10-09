import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: ProductDTO): Promise<Product> {
    const product: Product = new Product(dto.name, dto.price);
    return await this.repository.save(product);
  }
}
