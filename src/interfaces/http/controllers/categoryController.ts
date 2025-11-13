import { Request, Response } from "express";
import { CategoryRepositoryImpl } from "../../../infrastructure/repositories/categoryRepositoryImpl";
import { GetCategories } from "../../../application/use-cases/Categories/GetCategories";
import { GetCategoryOptions } from "../../../application/use-cases/Categories/GetCategoryOptions";
import { AddCategory } from "../../../application/use-cases/Categories/AddCategory";
import { UpdateCategory } from "../../../application/use-cases/Categories/UpdateCategory";
import { RemoveCategory } from "../../../application/use-cases/Categories/RemoveCategory";

const repository = new CategoryRepositoryImpl();
const cu_get_categories = new GetCategories(repository); 
const cu_get_options = new GetCategoryOptions(repository); 
const cu_add_category = new AddCategory(repository);
const cu_update_category = new UpdateCategory(repository);
const cu_remove_category = new RemoveCategory(repository);

export const addCategory = async (req: Request, res: Response) =>{
  try{
    const token = req.supabaseToken;
    const result = await cu_add_category.execute(req.body, token);
    res.status(201).json(result);
  }catch(error){
    console.error("❌ Error al registrar la categoria:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateCategory = async (req: Request, res: Response) =>{
   try{
    const token = req.supabaseToken;
    const result = await cu_update_category.execute(req.body, token);
    res.status(201).json(result);
  }catch(error){
    console.error("❌ Error al actualizar la categoria:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const removeCategory = async (req: Request, res: Response) =>{
   try{
    const token = req.supabaseToken;
    const result = await cu_remove_category.execute(req.params.id, token);
    res.status(200).json(result);
  }catch(error){
    console.error("❌ Error al registrar la categoria:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
    const { search, sort, page, limit } = req.query;
    const result = await cu_get_categories.execute(search, sort, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener categorias:", error.message);
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

