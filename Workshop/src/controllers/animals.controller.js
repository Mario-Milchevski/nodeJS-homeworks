import { animalsSchema } from "../schemas/animals.schema.js";
import AnimalsService from "../services/animals.service.js";

export default class AnimalsController {
    static async getAnimals(req, res) {
        try {
            const animals = await AnimalsService.getAnimals(req.query);
            res.json(animals);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    static async getAnimalById(req, res) {
        try {
            const animal = await AnimalsService.getAnimalById(req.params.id);
            res.send(animal);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }
    static async createAnimal(req, res) {
        try {
            await animalsSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const newAnimal = await AnimalsService.createAnimal(req.body);
            res.status(201).json(newAnimal);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
    static async updateAnimal(req, res) {
        try {
            await animalsSchema.validateAsync(req.body, {
                abortEarly: false,
            });
            const response = await AnimalsService.updateAnimal(req.params.id, req.body);
            res.json(response);
        } catch (e) {
            res.status(403).send({ message: e.message })
        }
    }

    static async deleteAnimal(req, res) {
        try {
            await AnimalsService.deleteAnimal(req.params.id);
            res.sendStatus(204);
        } catch (e) {
            res.status(400).send({ message: e.message });
        }
    }
}
