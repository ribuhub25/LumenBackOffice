import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/products", authMiddleware, createProduct);
router.get("/products", authMiddleware, getProducts);

export default router;
