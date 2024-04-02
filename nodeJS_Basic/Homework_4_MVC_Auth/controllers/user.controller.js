import { NotAllowed } from "../consts/errors.consts.js";
import UserService from "../services/user.service.js"

export default class UserController {
    static async getUser(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.send(user);
        } catch (e) {
            res.status(500).send({ message: e.message })
        }
    }
    static async updateUserPassword(req, res) {
        try {
            const user = await UserService.updateUserPassword(req.session.userId, req.params.id, req.body.password)
            res.send(user);
        } catch (e) {
            if (e instanceof NotAllowed) {
                res.status(403).send({ message: e.message })
            } else {
                res.status(400).send({ message: e.message })
            }
        }
    }
    static async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.session.userId, req.params.id);
            req.session.isLoggedIn = false;
            req.session.userId = null;
            res.sendStatus(204);
        } catch (e) {
            if (e instanceof NotAllowed) {
                res.status(403).send({ message: e.message })
            } else {
                res.status(500).send({ message: e.message });
            }
        }
    }
}