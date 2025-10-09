import { Request, Response } from "express";
import { CreateProduct } from "../../../application/use-cases/Products/CreateProduct";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories/productRepositoryImpl";
import { GetProducts } from "../../../application/use-cases/Products/GetProducts";
import { GetProduct } from "../../../application/use-cases/Products/GetProduct";
<<<<<<< HEAD
import { SaveProduct } from "../../../application/use-cases/Products/SaveProduct";
import { Product } from "../../../domain/models/Product";
=======
>>>>>>> 9752216 (Se agregaron los metodos para buscar marcas y buscar un producto por el id)

const repository = new ProductRepositoryImpl();
const cu_create_product = new CreateProduct(repository); 
const cu_get_products = new GetProducts(repository); 
const cu_get_product = new GetProduct(repository);
<<<<<<< HEAD
const cu_save_product = new SaveProduct(repository);
=======
>>>>>>> 9752216 (Se agregaron los metodos para buscar marcas y buscar un producto por el id)

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

export const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await cu_get_product.execute(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error al obtener el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
<<<<<<< HEAD

export const saveProduct = async (req: Request, res: Response) => {
  try{
    // if(!(isProduct(req.body))){
    //   return res.status(400).json({ error: "Formato del Producto Invalido" });
    // }
    const result = await cu_save_product.execute(req.body);
    res.status(200).json(result);
  }catch(error){
    console.error("❌ Error al guardar el producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
=======
>>>>>>> 9752216 (Se agregaron los metodos para buscar marcas y buscar un producto por el id)

function isProduct(obj: any): obj is Product {
  return (
    typeof obj.id === 'number' &&
    typeof obj.created_at === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.rating === 'number' &&
    typeof obj.review_count === 'number' &&
    typeof obj.href === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.imageSrc === 'string' &&
    typeof obj.imageAlt === 'string' &&
    typeof obj.discount === 'number' &&
    typeof obj.status === 'number' &&
    typeof obj.brand_Id === 'number' &&
    typeof obj.stock === 'number' &&
    typeof obj.brand_name === 'string' &&
    typeof obj.code === 'string' &&
    typeof obj.final_price === 'number' &&
    typeof obj.is_new === 'number' &&
    typeof obj.categories === 'object'
  );
}