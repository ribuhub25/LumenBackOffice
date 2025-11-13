import { BrandRepository } from "../../../domain/services/BrandRepository";
import JsonResponse from "../../dto/format/JsonResponse";

export class RemoveBrand {
  constructor(private readonly repository: BrandRepository) {}

  async execute(id: number, token: string): Promise<JsonResponse<[]>> {
    return await this.repository.delete(id, token);
  }
}
