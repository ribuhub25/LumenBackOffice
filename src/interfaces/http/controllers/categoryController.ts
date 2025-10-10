import { Request, Response } from "express";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl";
import { GetCategories } from "../../../application/use-cases/Categories/GetCategories";
import { GetCategoryOptions } from "../../../application/use-cases/Categories/GetCategoryOptions";

const repository = new CategoryRepositoryImpl();
const cu_get_categories = new GetCategories(repository); 
const cu_get_options = new GetCategoryOptions(repository); 

export const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_categories.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener marcas:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategoryOptions = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_options.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener el combo de marcas:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

