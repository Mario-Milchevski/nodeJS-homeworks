import { Router } from "express";
import AdoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

router.get('', AdoptionsController.getAdoptions);
router.post('', AdoptionsController.recordAdoption);


export default router;