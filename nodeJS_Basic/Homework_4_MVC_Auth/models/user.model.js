import DataService from "../services/data.service.js";
import path from "path";

// Path to the Users JSON file (Our database in this case)
const usersPath = path.join(import.meta.dirname,
    '..',
    'data',
    'users.json')

export default class UserModel {
    static async getAll() {
        // Get all users from the Users JSON file
        return DataService.readData(usersPath);
    }
    static async getById(id) {
        const users = await this.getAll();
        const user = users.find(u => u.id === id)
        return user;
    }
    static async getByUsername(username) {
        const users = await this.getAll();
        // Get one user found by username(which is unique) , or an undefined value if no user is found
        return users.find(u => u.username === username);
    }
    static async create(user) {
        const users = await this.getAll();
        users.push(user);
        await DataService.writeData(usersPath, users);
        // Return the new user to the place where this create method will be called - in this case in class AuthService register ... auth.service.js 
        return user;
    }
}