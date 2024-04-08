import AuthService from "../services/auth.service.js";
import { BadRequest } from "../consts/errors.consts.js";
import { userSchema } from "../schemas/user.schema.js";
export default class AuthController {
    //      REGISTER (Create new user)
    static async register(req, res) {
        try {
            //Joi validation
            await userSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            // Calling service's register method by sending an argument(body) in the request
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
    //      LOGIN
    // Тo LogIn check if the user exists and if passwords match
    static async login(req, res) {
        try {
            //Joi validation
            await userSchema.validateAsync(req.body, {
                abortEarly: false,
            });

            const user = await AuthService.login(req.body);
            // Add isLoggedIn & userId properties to the session object in order to handle the sessions logic
            req.session.isLoggedIn = true;
            req.session.userId = user._id;
            res.json(user);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).send({ message: e.message });
            } else {
                res.status(500).send({ message: e.message });
            }
        }
    }

        //  LOGOUT
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