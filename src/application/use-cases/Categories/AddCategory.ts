import { Category } from "../../../domain/models/Category";
import { CategoryRepository } from "../../../domain/services/CategoryRepository";
import JsonResponse from "../../dto/format/JsonResponse";

export class AddCategory {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(category: Category, token: string): Promise<JsonResponse<Category>> {
    return await this.repository.save(category, token);
  }
}
