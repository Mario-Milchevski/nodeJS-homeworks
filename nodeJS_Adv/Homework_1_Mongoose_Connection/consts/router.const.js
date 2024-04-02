import { Router } from "express";
import postsRouter from "../routes/posts.routes.js";
import usersRouter from "../routes/users.routes.js";

// The main router
const router = Router();

// /api
router.use('/posts', postsRouter);
router.use('/users', usersRouter);

export default router;