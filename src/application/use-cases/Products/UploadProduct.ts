import { ProductRepository } from "../../../domain/services/ProductRepository";
import { ProductDTO } from "../../dto/ProductDTO";
import { Express } from "express";


export class UploadProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(file: Express.Multer.File, fileName: string): Promise<string> {
    return await this.repository.upload(file, fileName);
  }
}
