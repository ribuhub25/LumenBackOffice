import { BrandRepository } from "../../../domain/services/BrandRepository";
import { Option } from "../../dto/Option";

export class GetBrandOptions {
  constructor(private readonly repository: BrandRepository) {}

  async execute(): Promise<Option[]> {
     return await this.repository.findOptions();
  }
}
