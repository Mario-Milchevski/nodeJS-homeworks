import { Router } from "express";
import PostsController from "../controllers/posts.controller.js"

const router = Router();

router.get('', PostsController.getPosts);
router.get('/:id', PostsController.getPostById);
router.post('', PostsController.createPost);
router.put('/:id', PostsController.updatePost);
router.delete('/:id', PostsController.deletePost);

export default router;