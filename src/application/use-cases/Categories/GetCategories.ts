import { Brand } from "../../../domain/models/Brand";
import { Category } from "../../../domain/models/Category";
import { CategoryRepository } from "../../../domain/services/CategoryRepository";

export class GetCategories {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
     return await this.repository.findAll();
  }
}
