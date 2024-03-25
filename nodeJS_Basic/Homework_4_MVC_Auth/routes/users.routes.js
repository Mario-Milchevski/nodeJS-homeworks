import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get('/:id', UserController.getUser);
router.get('/:id/posts', UserController.getUserPosts);

export default router;