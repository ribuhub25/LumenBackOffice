import { Router } from "express";
import { createProduct, getProduct, getProducts } from "../controllers/productController";
<<<<<<< HEAD
import { getBrands } from "../controllers/brandController";
=======
import { getBrandOptions, getBrands } from "../controllers/brandController";
import { getCategoryOptions } from "../controllers/categoryController";
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)

const router = Router();
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.get("/brands", getBrands);
<<<<<<< HEAD

=======
router.get("/brandlist", getBrandOptions);
router.get("/categorylist", getCategoryOptions);
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)
export default router;
