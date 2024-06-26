import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get('/:id', UserController.getUser);
router.patch('/:id', UserController.updateUserPassword);
router.delete('/:id', UserController.deleteUser);

export default router;