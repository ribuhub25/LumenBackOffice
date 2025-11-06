import { CategoryRepository } from "../../../domain/services/CategoryRepository";
import { Option } from "../../dto/utils/Option";

export class GetCategoryOptions {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<Option[]> {
     return await this.repository.findOptions();
  }
}
