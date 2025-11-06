import { ProductRepository } from "../../../domain/services/ProductRepository";
import JsonResponse from "../../dto/format/JsonResponse";

export class RemoveProduct {
    constructor(private readonly repository: ProductRepository) { }
    async execute(id: number, token: string): Promise<JsonResponse<[]>> {
        return await this.repository.delete(id, token);
    }
}