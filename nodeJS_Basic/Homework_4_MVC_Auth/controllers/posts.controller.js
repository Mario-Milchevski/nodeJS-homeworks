import PostService from "../services/post.service.js";

export default class PostsController {
    static async getPosts(req, res) {
        try {
            const posts = await PostService.getPosts();
            res.send(posts);
        } catch (e) {
            res.status(403).send({ m: e.m });
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
}