import User from "../models/user.model.js";

export default class UserService {
    static getUsers({ username, email }) {
        let searchQuery = {};
        if (username) {
            searchQuery.username = username;
        }
        if (email) {
            searchQuery.email = email;
        }
        return User.find(searchQuery);
    }
    static getUserById(userId) {
        return User.findById(userId);
    }
    static getUserByUsername(username) {
        return User.findOne({username: username});
    }
    static async createUser(userData) {
        const user = new User(userData);
        return user.save();
    }
    static async updateUser(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true });
    }
    static async deleteUser(userId) {
        return User.findByIdAndDelete(userId);
    }
}