import { v4 as uuidv4 } from "uuid";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import { NotFound, NotAllowed } from "../consts/errors.consts.js";

export default class PostService {
    static async getPosts() {
        return PostModel.getAll();
    }
    static getPost(id) {
        return PostModel.getById(id);
    }

    static async createPost(body, userId) {
        const post = {
            ...body,
            id: uuidv4(),
            userId,
            createdAt: new Date().toISOString(),
            likes: [],
        }
        const createdPost = await PostModel.create(post);
        return createdPost;
    }
    static async updatePost(userId, id, body) {
        const existingPost = await this.getPost(id);
        if (!existingPost) {
            throw new NotFound('Post not found');
        }
        if (existingPost.userId !== userId) {
            throw new NotAllowed('You are not authorized to edit this post');
        }
        const toBeUpdatedPost = {
            ...body,
            id,
            userId,
            updatedAt: new Date().toISOString(),
            likes: existingPost.likes,
        }
        const updatedPost = await PostModel.update(id, toBeUpdatedPost)
        return updatedPost;
    }
    static async deletePost(userId, id) {
        const user = await UserModel.getById(userId);
        const post = await this.getPost(id);
        if (!post) {
            throw new NotFound('Post not found')
        }
        if (post.userId !== userId) {
            throw new NotAllowed('You are not authorized to delete this post')
        }
        return PostModel.delete(id);
    }
    static async likePost(userId, id) {
        const user = await UserModel.getById(userId);
        const post = await this.getPost(id);
        const alreadyLikedIndex = post.likes.indexOf(user.username);
        if (!post) {
            throw new NotFound('Post not found');
        }
        if (post.userId === userId) {
            throw new NotAllowed("You can't like your own post");
        }
        if (alreadyLikedIndex > -1) {
            post.likes.splice(alreadyLikedIndex, 1)
        } else {
            post.likes.push(user.username);
        }
        const likedPost = await PostModel.update(id, post);
        return likedPost;
    }
    static async getPostsByUser(toFetchUserId, loggedInUserId) {
        const postsByUserId = await PostModel.getByUserId(toFetchUserId);
        if (!loggedInUserId) throw new NotAllowed('You must login to do that');
        return postsByUserId;
    }
}