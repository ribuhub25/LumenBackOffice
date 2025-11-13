import { Router } from "express";
import { addBrand, getBrandOptions, getBrands, removeBrand, updateBrand } from "../controllers/brandController";
import { getCategoryOptions } from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();
router.get("/", getBrands);
router.get("/list", getBrandOptions);
router.post("/create", authMiddleware, addBrand)
router.put("/save", authMiddleware, updateBrand);
router.delete("/remove/:id", authMiddleware, removeBrand);
export default router;
