import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import { NotAllowed } from "../consts/errors.consts.js";
import bcrypt from "bcrypt";

// Business logic goes here(not generic logic)
export default class UserService {
    static getUserById(id) {
        return UserModel.getById(id);
    }
    static async updateUserPassword(loggedInUserId, userIdToUpdate, password) {
        const user = await this.getById(userIdToUpdate);
        if (loggedInUserId !== userIdToUpdate) {
            throw new NotAllowed('You are not authorized to edit this user')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const toBeUpdatedUser = {
            ...user,
            id: userIdToUpdate,
            password: hashedPassword,
            updatedAt: new Date().toISOString(),
        }
        const updatedUser = await UserModel.update(userIdToUpdate, toBeUpdatedUser);
        const { password: notNeededPassword, ...restOfUser } = updatedUser;
        return restOfUser;
    }
    static async deleteUser(loggedInUserId, userIdToDelete) {
        if (loggedInUserId !== userIdToDelete) {
            throw new NotAllowed('You are not authorized to delete this user')
        }
        return UserModel.delete(userIdToDelete);
    }
}