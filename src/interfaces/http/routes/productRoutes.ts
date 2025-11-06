const multer = require("multer");
const express = require("express");
import { Router } from "express";
import { createProduct, getProduct, getProducts, removeProduct, saveProduct } from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const storage =  multer.memoryStorage();
const upload = multer({ storage });

router.get("/", express.json(), getProducts);
router.post("/create", authMiddleware, upload.single("image"), createProduct);
router.get("/:id", express.json(), getProduct);
router.put("/save", authMiddleware,express.json(), saveProduct);
router.delete("/remove/:id", authMiddleware, removeProduct);
export default router;
