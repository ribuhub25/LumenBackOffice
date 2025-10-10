import { Router } from "express";
<<<<<<< HEAD
import { createProduct, getProduct, getProducts } from "../controllers/productController";
<<<<<<< HEAD
import { getBrands } from "../controllers/brandController";
=======
=======
import { createProduct, getProduct, getProducts, saveProduct } from "../controllers/productController";
>>>>>>> 2134ccc (Se implemento metodo para guardar productos)
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
<<<<<<< HEAD
>>>>>>> 3efba90 (Se incluyo los metodos para listar los combos de marca y categorias)
=======
router.put("/product", saveProduct);
>>>>>>> 2134ccc (Se implemento metodo para guardar productos)
export default router;
