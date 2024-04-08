import User from "../models/user.model.js";
import { BadRequest } from "../consts/errors.consts.js";
import bcrypt from "bcrypt";
import UserService from "./user.service.js";

export default class AuthService {
    //      REGISTER
    static async register(userData) {
        // Create new user
        const user = new User(userData);
        // Destructure the user to exclude the password when returning a response
        // Also convert Mongoose document to plain Javascript Object from BSON type in order to destructure it
        const { password: notNeededPassword, ...restOfUser } = user.toObject();
        const userSaved = await user.save();
        // If user is saved return the Registered User without the password.
        // Otherwise let Mongoose model validator show an error message 
        if (userSaved) return restOfUser;
    }
    //      LOGIN
    static async login({ username, password }) {
        // Find the user
        const user = await UserService.getUserByUsername(username);
        // Compare passwords if they match
        const doPasswordsMatch = bcrypt.compare(password, user.password);
        // Handle bad credentials by throwing an error
        if (!user || !doPasswordsMatch) {
            throw new BadRequest('Bad credentials');
        }
        // Return the created user without the password for safety reasons
        const { password: notNeededPassword, ...restOfUser } = user.toObject();
        return restOfUser;
    }
}