import { Request, Response } from "express";
import { BrandRepositoryImpl } from "../../../infrastructure/repositories/brandRepositoryImpl";
import { GetBrands } from "../../../application/use-cases/Brands/GetBrands";
import { GetBrandOptions } from "../../../application/use-cases/Brands/GetBrandOptions";
import { AddBrand } from "../../../application/use-cases/Brands/AddBrand";
import { UpdateBrand } from "../../../application/use-cases/Brands/UpdateBrand";
import { RemoveBrand } from "../../../application/use-cases/Brands/RemoveBrand";

const repository = new BrandRepositoryImpl();
const cu_get_brands = new GetBrands(repository);
const cu_get_options = new GetBrandOptions(repository);
const cu_add_brand = new AddBrand(repository);
const cu_update_brand = new UpdateBrand(repository);
const cu_remove_brand = new RemoveBrand(repository);

export const addBrand = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const result = await cu_add_brand.execute(req.body, token);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al registrar la marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const result = await cu_update_brand.execute(req.body, token);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al actualizar la marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const removeBrand = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const id = parseInt(req.params.id);
    const result = await cu_remove_brand.execute(id, token);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al registrar la marca:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const { search, sort, page, limit } = req.query;
    const result = await cu_get_brands.execute(search ? String(search) : "", sort ? String(sort) : "", page ? parseInt(String(page)) : 0, limit ? parseInt(String(limit)) : 0);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener marcas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getBrandOptions = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_options.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener el combo de marcas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

