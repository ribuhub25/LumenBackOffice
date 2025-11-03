import { Router } from "express";
import { login, signOut, signUp } from "../controllers/AuthController";

const router = Router();
router.post("/login", login);
router.post("/signup", signUp);
router.post("/signout", signOut);

export default router;
