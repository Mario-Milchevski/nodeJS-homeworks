import Post from "../models/post.model.js";
import { NotAllowed, BadRequest, NotFound } from "../consts/errors.consts.js";
import UserService from "./user.service.js";
export default class PostService {
    static getPosts({ title, content, userId }) {
        let searchQuery = {};
        if (title) {
            searchQuery.title = title;
        }
        if (content) {
            searchQuery.content = content;
        }
        if (userId) {
            searchQuery.userId = userId;
        }
        return Post.find(searchQuery);
    }
    static getPostById(postId) {
        return Post.findById(postId);
    }

    static async createPost(postData, userId) {
        const post = {
            ...postData,
            userId
        }
        const newPost = new Post(post);
        return newPost.save();
    }
    static async updatePost(postId, updateData) {
        return Post.findByIdAndUpdate(postId, updateData, { new: true });
    }
    static async deletePost(postId) {
        return Post.findByIdAndDelete(postId);
    }
    static async likePost(userId, postId) {
        const user = await UserService.getUserById(userId);
        const post = await this.getPostById(postId);
        if (!post) {
            throw new NotFound('Post not found');
        }
        if (String(post.userId) === userId) {
            throw new NotAllowed("You can't like your own post");
        }

        const alreadyLikedIndex = post.likes.indexOf(user._id);
        if (alreadyLikedIndex > -1) {
            post.likes.splice(alreadyLikedIndex, 1)
        } else {
            post.likes.push(user._id);
        }
        const likedPost = await this.updatePost(postId, post);
        return likedPost;
    }
}