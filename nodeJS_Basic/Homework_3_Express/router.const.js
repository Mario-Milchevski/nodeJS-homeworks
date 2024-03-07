// The main router

import { Router } from "express";
import trainersRoutes from './routes/trainers.route.js';

const router = Router();

// All the routes will start with /trainers
router.use('/trainers', trainersRoutes);

export default router;