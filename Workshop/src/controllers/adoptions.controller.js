import { adoptionsSchema } from "../schemas/adoptions.schema.js";
import AdoptionsService from "../services/adoptions.service.js";

export default class AnimalsController {
    static async getAdoptions(req, res) {
        try {
            const adoptions = await AdoptionsService.getAdoptions(req.query);
            res.json(adoptions);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    static async recordAdoption(req, res) {
        try {
            await adoptionsSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const newAdoption = await AdoptionsService.recordAdoption(req.body);
            res.status(201).json(newAdoption);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
    
}
