import { NotFound } from "../consts/errors.consts.js";
import { userSchema } from "../schemas/user.schema.js";
import UserService from "../services/user.service.js"

export default class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers(req.query);
            res.json(users);
        } catch (e) {
            res.status(500).send({ message: e.message })

        }
    }
    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.send(user);
        } catch (e) {
            if (e instanceof NotFound) {
                res.status(404).send({ message: e.message })

            } else {
                res.status(403).send({ message: e.message });
            }
        }
    }
    static async createUser(req, res) {
        try {
            await userSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const newUser = await UserService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
    static async updateUser(req, res) {
        try {
            await userSchema.validateAsync(req.params.id, req.body, {
                abortEarly: false,
            });
            const response = await UserService.updateUser(req.params.id, req.body);
            res.json(response);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).send({ message: e.message });
            } else {

                res.status(403).send({ message: e.message })
            }
        }
    }
    static async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.sendStatus(204);
        } catch (e) {
            if (e instanceof NotFound) {
                res.status(404).send({ message: e.message });
            } else {
                res.status(400).send({ message: e.message });
            }
        }
    }
}