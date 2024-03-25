import PostService from "../services/post.service.js";
import { NotFound, BadRequest, NotAllowed } from "../consts/errors.consts.js";
export default class PostsController {
    static async getPosts(req, res) {
        try {
            const posts = await PostService.getPosts();
            res.send(posts);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    static async getPost(req, res) {
        try {
            const post = await PostService.getPost(req.params.id);
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
            const post = await PostService.createPost(req.body, req.session.userId);
            res.status(201).send(post);
        } catch (e) {
            res.status(400).send({ message: e.message });

        }
    }
    static async updatePost(req, res) {
        try {
            const post = await PostService.updatePost(req.session.userId, req.params.id, req.body);
            res.send(post);
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
            await PostService.deletePost(req.session.userId, req.params.id);
            res.sendStatus(204);
        } catch (e) {
            if (e instanceof NotFound) {
                res.status(404).send({ message: e.message });
            }
            if (e instanceof NotAllowed) {
                res.status(403).send({ message: e.message });
            } else {
                res.status(400).send({ message: e.message });
            }
        }
    }
    static async likePost(req, res) {
        try {
            const post = await PostService.likePost(req.session.userId, req.params.id);
            res.send(post);
        } catch (e) {
            if (e instanceof NotAllowed) {
                res.status(403).send({ message: e.message });
            }
            else if (e instanceof NotFound) {
                res.status(404).send({ message: e.message });
            }
            else {
                res.status(400).send({ message: e.message });
            }
        }
    }
}