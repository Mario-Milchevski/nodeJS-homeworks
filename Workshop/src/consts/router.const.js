import { Router } from "express";
import animalsRouter from "../routes/animals.routes.js";
import adoptionsRoutes from "../routes/adoptions.routes.js";

// The main router
const router = Router();

// /api
router.use('/animals', animalsRouter);
router.use('/adoptions', adoptionsRoutes);

export default router;