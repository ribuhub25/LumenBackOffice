import { Router } from "express";
import { addCategory, getCategories, removeCategory, updateCategory } from "../controllers/categoryController";
import { getCategoryOptions } from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();
router.get("/", getCategories);
router.get("/categorylist", getCategoryOptions);
router.post("/create", authMiddleware, addCategory)
router.put("/save", authMiddleware, updateCategory);
router.delete("/remove/:id", authMiddleware, removeCategory);
export default router;
