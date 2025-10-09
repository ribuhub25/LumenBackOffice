import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: ProductDTO): Promise<Product> {
<<<<<<< HEAD
    const product: Product = new Product();
=======
    const product: Product = new Product(dto.name, dto.price);
>>>>>>> 9752216 (Se agregaron los metodos para buscar marcas y buscar un producto por el id)
    return await this.repository.save(product);
  }
}
