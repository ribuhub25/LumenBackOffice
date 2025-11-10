import { Router } from "express";
import { getResultsForStore } from "../controllers/FilterController";

const router = Router();
router.get("/store", getResultsForStore);

export default router;
