import { Router } from "express";
import { createProduct, getProduct, getProducts, saveProduct } from "../controllers/productController";

const router = Router();
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/save", saveProduct);
export default router;
