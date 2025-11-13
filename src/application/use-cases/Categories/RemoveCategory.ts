import { Category } from "../../../domain/models/Category";
import { CategoryRepository } from "../../../domain/services/CategoryRepository";
import JsonResponse from "../../dto/format/JsonResponse";

export class RemoveCategory {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: number, token: string): Promise<JsonResponse<[]>> {
    return await this.repository.delete(id, token);
  }
}
