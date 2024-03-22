import UserModel from "../models/user.model.js";
import { BadRequest } from "../consts/errors.consts.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export default class AuthService {
    static async register({ username, password }) {
        const existingUser = await UserModel.getUserByUsername(username)
        if (existingUser) {
            throw new BadRequest(`User with ${username} already exists!`);
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        }
        const { password: notNeededPassword, ...restOfUser } = await UserModel.create(user);
        return restOfUser;
    }
    static async login({ username, password }) {
        const user = await UserModel.getUserByUsername(username);
        if (!user) {
            throw new BadRequest('Bad credentials');
        }
        const doPasswordsMatch = await bcrypt.compare(password, user.password)
        if (!doPasswordsMatch) {
            throw new BadRequest ('Bad credentials');
        }
        const {password: notNeededPassword, ...restOfUser } = user;

        return restOfUser;
    }
}