import { v4 as uuidv4 } from "uuid";
import PostModel from "../models/post.model.js";

export default class PostService {
    static getPosts() {
        return PostModel.getAll();
    }

    static async createPost(body, userId) {
        const post = {
            id: uuidv4(),
            userId,
            ...body,
            createdAt: new Date().toISOString(),
        }
        const createdPost = await PostModel.create(post);
        return createdPost;
    }
}