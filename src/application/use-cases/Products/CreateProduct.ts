import { Product } from "../../../domain/models/Product";
import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: ProductDTO): Promise<Product> {
<<<<<<< HEAD
    const product: Product = new Product(dto.name, dto.price);
=======
    const product: Product = new Product();
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)
    return await this.repository.save(product);
  }
}
