import { Brand } from "../../../domain/models/Brand";
import { BrandRepository } from "../../../domain/services/BrandRepository";
<<<<<<< HEAD
import { BrandDTO } from "../../dto/BrandDTO";
=======
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)

export class GetBrands {
  constructor(private readonly repository: BrandRepository) {}

  async execute(): Promise<Brand[]> {
     return await this.repository.findAll();
  }
}
