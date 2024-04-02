import { NotFound, BadRequest } from "../consts/errors.consts.js";
import { postSchema } from "../schemas/post.schema.js";
import PostService from "../services/post.service.js";

export default class PostsController {
    static async getPosts(req, res) {
        try {
            const posts = await PostService.getPosts(req.query);
            res.json(posts);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    static async getPostById(req, res) {
        try {
            const post = await PostService.getPostById(req.params.id);
            res.send(post);
        } catch (e) {
            if (e instanceof NotFound) {
                res.status(404).send({ message: e.message })

            } else {
                res.status(403).send({ message: e.message });
            }
        }
    }
    static async createPost(req, res) {
        try {
            await postSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const newPost = await PostService.createPost(req.body);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
    static async updatePost(req, res) {
        try {
            await postSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const response = await PostService.updatePost(req.params.id, req.body);
            res.json(response);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).send({ message: e.message });
            } else {

                res.status(403).send({ message: e.message })
            }
        }
    }
    static async deletePost(req, res) {
        try {
            await PostService.deletePost(req.params.id);
            res.sendStatus(204);
        } catch (e) {
            if (e instanceof NotFound) {
                res.status(404).send({ message: e.message });
            } else {
                res.status(400).send({ message: e.message });
            }
        }
    }
}
