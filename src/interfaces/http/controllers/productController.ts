import { Request, Response } from "express";
import { CreateProduct } from "../../../application/use-cases/Products/CreateProduct";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/productRepositoryImpl";
import { GetProducts } from "../../../application/use-cases/Products/GetProducts";
import { SaveProduct } from "../../../application/use-cases/Products/SaveProduct";
import { GetProduct } from "../../../application/use-cases/Products/GetProduct";
import { UploadProduct } from "../../../application/use-cases/Products/UploadProduct";
import { RemoveProduct } from "../../../application/use-cases/Products/RemoveProduct";

const repository = new ProductRepositoryImpl();
const cu_create_product = new CreateProduct(repository);
const cu_get_products = new GetProducts(repository);
const cu_get_product = new GetProduct(repository);
const cu_save_product = new SaveProduct(repository);
const cu_upload_img_product = new UploadProduct(repository);
const cu_remove_product = new RemoveProduct(repository);

export const createProduct = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    const { name }: { name: string } = req.body;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const filename = `${Date.now()}-${name.trim().replace(" ", "_").toLowerCase()}`;
    const imgFile = req.file;
    if (!imgFile) return res.status(400).json({ error: "No se recibió ninguna imagen" });
    const imgSrc = await cu_upload_img_product.execute(imgFile, filename);
    if (imgSrc != "") req.body.imageSrc = imgSrc;
    const result = await cu_create_product.execute(req.body, token);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, sort, page, limit, marca, categoria } = req.query;
    const result = await cu_get_products.execute(search, sort, page, limit, marca, categoria);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_product.execute(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const result = await cu_save_product.execute(req.body, token);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al crear el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const token = req.supabaseToken;
    if (!token) return res.status(401).json({ error: "Token no disponible" });
    const result = await cu_remove_product.execute(req.params.id, token);
    res.status(200).json(result);
  }
  catch (error) {
    console.error("❌ Error al remover el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
