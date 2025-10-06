import { Request, Response } from "express";
import { CreateProduct } from "../../../application/use-cases/CreateProduct";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/productRepositoryImpl";
import { GetProducts } from "../../../application/use-cases/GetProducts";

const repository = new ProductRepositoryImpl();
const cu_create_product = new CreateProduct(repository); 
const cu_get_products = new GetProducts(repository); 

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await cu_create_product.execute(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_products.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



