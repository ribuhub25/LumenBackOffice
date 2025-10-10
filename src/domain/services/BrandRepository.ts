<<<<<<< HEAD
import { Brand } from "../models/Brand";

export interface BrandRepository {
  save(product: Brand): Promise<Brand>;
  findById(id: number): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  delete(id: number): Promise<void>;
=======

import { Option } from "../../application/dto/Option";
import { Brand } from "../models/Brand";

export interface BrandRepository {
  save(brand: Brand): Promise<Brand>;
  findById(id: number): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  delete(id: number): Promise<void>;
  findOptions(): Promise<Option[]>;
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)
}
