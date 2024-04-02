import Post from "../models/post.model.js";

export default class PostService {
    static getPosts({ title, content }) {
        let searchQuery = {};
        if (title) {
            searchQuery.title = String(title);
        }
        if (content) {
            searchQuery.content = String(content);
        }
        return Post.find(searchQuery);
    }
    static getPostById(postId) {
        return Post.findById(postId);
    }

    static async createPost(postData) {
        const post = new Post(postData);
        return post.save();
    }
    static async updatePost(postId, updateData) {
        return Post.findByIdAndUpdate(postId, updateData, { new: true });
    }
    static async deletePost(postId) {
        return Post.findByIdAndDelete(postId);
    }
}