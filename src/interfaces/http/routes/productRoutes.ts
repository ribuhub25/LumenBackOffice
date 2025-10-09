import { Router } from "express";
import { createProduct, getProduct, getProducts } from "../controllers/productController";
import { getBrands } from "../controllers/brandController";

const router = Router();
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/brands", getBrands);

export default router;
