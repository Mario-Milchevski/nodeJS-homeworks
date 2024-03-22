import { Router } from "express";
import postsRouter from "../routes/posts.routes.js"
import authRouter from "../routes/auth.routes.js"
import { authSession } from "./sessions.const.js";
import validateAuthSession from "../middleware/auth-session-validator.middleware.js";

// The main router
const router = Router();

// /api
router.use('/posts', authSession, validateAuthSession, postsRouter);
router.use('/auth', authSession, authRouter);

export default router;