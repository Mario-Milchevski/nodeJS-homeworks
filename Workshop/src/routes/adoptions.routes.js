import { Router } from "express";
import AdoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

router.get('', AdoptionsController.getAdoptions);
router.post('', AdoptionsController.recordAdoption);
// router.patch('/:adoptionId/animal/:animalId', AdoptionsController.adoptAnimal); // Add or remove movie from cinema

export default router;