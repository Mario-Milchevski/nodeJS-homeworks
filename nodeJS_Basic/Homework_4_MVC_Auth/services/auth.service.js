import UserModel from "../models/user.model.js";
import { BadRequest } from "../consts/errors.consts.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default class AuthService {
    //      REGISTER
    static async register({ username, password }) {

        // If user exists throw an error
        const existingUser = await UserModel.getByUsername(username)
        if (existingUser) { throw new BadRequest(`User with ${username} already exists!`); }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 5);
        // Create user
        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        }
        // Return the created user without the password for safety reasons
        const { password: notNeededPassword, ...restOfUser } = await UserModel.create(user);
        return restOfUser;
    }
    //      LOGIN
    static async login({ username, password }) {

        const user = await UserModel.getByUsername(username);
        const doPasswordsMatch = await bcrypt.compare(password, user.password)
        if (!user || !doPasswordsMatch) {
            throw new BadRequest('Bad credentials');
        }
        const { password: notNeededPassword, ...restOfUser } = user;

        return restOfUser;
    }
}