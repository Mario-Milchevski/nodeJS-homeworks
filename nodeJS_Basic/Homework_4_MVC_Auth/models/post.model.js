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

    static async create(post) {
        const posts = await DataService.readData(postsPath);
        posts.push(post);
        await DataService.writeData(postsPath, posts);
        return post;
    }
}