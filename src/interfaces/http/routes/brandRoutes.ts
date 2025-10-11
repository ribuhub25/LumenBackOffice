import { Router } from "express";
import { getBrandOptions, getBrands } from "../controllers/brandController";
import { getCategoryOptions } from "../controllers/categoryController";


const router = Router();
router.get("/", getBrands);
router.get("/list", getBrandOptions);
router.get("/categorylist", getCategoryOptions);
export default router;
