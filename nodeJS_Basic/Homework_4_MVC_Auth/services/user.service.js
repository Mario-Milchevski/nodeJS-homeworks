import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import { NotAllowed } from "../consts/errors.consts.js";

export default class UserService {
    static async getById(id) {
        return UserModel.getById(id);
    }
    static async getUserPosts(toFetchUserId, loggedInUserId) {
        const posts = await PostModel.getAll();
        const filteredPosts = posts.filter(post => post.userId === toFetchUserId);
        if (!loggedInUserId) {
            throw new NotAllowed('You are not authorized to do that');
        }
        return filteredPosts;
    }
}