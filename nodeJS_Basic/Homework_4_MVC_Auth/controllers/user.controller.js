import { NotAllowed } from "../consts/errors.consts.js";
import UserService from "../services/user.service.js"

export default class UserController {
    static async getUser(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            console.log(req.params);
            res.send(user);
        } catch (e) {
            res.status(500).send({ message: e.message })
        }
    }
    static async getUserPosts(req, res) {
        try {
            const posts = await UserService.getUserPosts(req.params.id, req.session.userId)
            res.send(posts);
        } catch (e) {
            if (e instanceof NotAllowed) {
                res.status(403).send({ message: e.message })
            } else {
                res.status(500).send({ message: e.message })
            }
        }
    }
}