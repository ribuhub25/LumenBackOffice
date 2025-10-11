import { Request, Response } from "express";
import { BrandRepositoryImpl } from "../../../infrastructure/repositories/brandRepositoryImpl";
import { GetBrands } from "../../../application/use-cases/Brands/GetBrands";
import { GetBrandOptions } from "../../../application/use-cases/Brands/GetBrandOptions";

const repository = new BrandRepositoryImpl();
const cu_get_brands = new GetBrands(repository); 
const cu_get_options = new GetBrandOptions(repository); 

export const getBrands = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_brands.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener marcas:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getBrandOptions = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_options.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener el combo de marcas:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

