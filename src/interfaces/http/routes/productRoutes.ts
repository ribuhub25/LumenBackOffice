import { Router } from "express";
import { createProduct, getProduct, getProducts, saveProduct } from "../controllers/productController";
import { getBrandOptions, getBrands } from "../controllers/brandController";
import { getCategoryOptions } from "../controllers/categoryController";

const router = Router();
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/brands", getBrands);
router.get("/brandlist", getBrandOptions);
router.get("/categorylist", getCategoryOptions);
router.put("/product", saveProduct);
export default router;
