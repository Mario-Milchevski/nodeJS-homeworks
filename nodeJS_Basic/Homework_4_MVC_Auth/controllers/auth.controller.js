import AuthService from "../services/auth.service.js";
import { BadRequest } from "../consts/errors.consts.js";
export default class AuthController {
    //      REGISTER (Create new user)
    static async register(req, res) {
        try {
            const user = await AuthService.register(req.body);
            res.send(user);
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
    //      LOGIN
    // In order to LogIn check if the user exists and if passwords match
    static async login(req, res) {
        try {
            const user = await AuthService.login(req.body);
            req.session.isLoggedIn = true;
            req.session.userId = user.id;
            res.send(user);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).send({ message: e.message });
            } else {
                res.status(500).send({ message: e.message });
            }
        }
    }

    //      LOGOUT
    static async logout(req, res) {
        try {
            req.session.isLoggedIn = false;
            req.session.userId = null;
            res.sendStatus(204);
        } catch (e) {
            res.status(500).send({ message: e.message })
        }
    }
}