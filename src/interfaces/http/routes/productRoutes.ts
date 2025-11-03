import { Router } from "express";
import { createProduct, getProduct, getProducts, saveProduct } from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/save", authMiddleware, saveProduct);
export default router;
