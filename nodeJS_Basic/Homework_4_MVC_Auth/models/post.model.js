import { NotFound } from "../consts/errors.consts.js";
import DataService from "../services/data.service.js";
import path from "path";

const postsPath = path.join(
    import.meta.dirname,
    '..',
    'data',
    'posts.json'
);

export default class PostModel {
    static async getAll() {
        return DataService.readData(postsPath)
    }
    static async getById(id) {
        const posts = await this.getAll();
        const post = posts.find(p => p.id === id);
        if (!post) {
            throw new NotFound('Post not found')
        }
        return post;
    }
    static async getByUserId(toFetchUserId) {
        const posts = await this.getAll();
        const filteredPosts = posts.filter(post => post.userId === toFetchUserId);
        return filteredPosts;
    }

    static async create(post) {
        const posts = await this.getAll();
        posts.push(post);
        await DataService.writeData(postsPath, posts);
        return post;
    }
    static async update(id, post) {
        const posts = await this.getAll();
        const index = posts.findIndex(p => p.id === id);
        posts[index] = post;
        await DataService.writeData(postsPath, posts);
        return posts[index];
    }
    static async delete(id) {
        const posts = await this.getAll();
        const filteredPosts = posts.filter(p => p.id !== id);
        await DataService.writeData(postsPath, filteredPosts);
    }
}