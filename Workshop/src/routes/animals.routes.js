import { Router } from "express";
import AnimalsController from "../controllers/animals.controller.js"

const router = Router();

router.get('', AnimalsController.getAnimals);
router.get('/:id', AnimalsController.getAnimalById);
router.post('', AnimalsController.createAnimal);
router.put('/:id', AnimalsController.updateAnimal);
router.delete('/:id', AnimalsController.deleteAnimal);

export default router;