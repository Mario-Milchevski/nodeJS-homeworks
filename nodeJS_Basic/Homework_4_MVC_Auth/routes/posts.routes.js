import { Router } from "express";
import PostsController from "../controllers/posts.controller.js"

const router = Router();

router.get('', PostsController.getPosts);
router.get('/:id', PostsController.getPost);
router.post('', PostsController.createPost);
router.put('/:id', PostsController.updatePost);
router.delete('/:id', PostsController.deletePost);
router.patch('/:id', PostsController.likePost);


export default router;