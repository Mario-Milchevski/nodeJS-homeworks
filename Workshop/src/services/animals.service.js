import Animal from "../models/animal.model.js";

export default class AnimalsService {
    static getAnimals({ name, type, breed, age, status }) {
        let searchQuery = {};
        if (name) {
            searchQuery.name = String(name);
        }
        if (type) {
            searchQuery.type = String(type);
        }
        if (breed) {
            searchQuery.breed = String(breed);
        }
        if (age) {
            searchQuery.age = String(age);
        }
        if (status) {
            searchQuery.status = String(status);
        }
        return Animal.find(searchQuery);
    }
    static getAnimalById(animalId) {
        return Animal.findById(animalId);
    }

    static async createAnimal(animalData) {
        const animal = new Animal(animalData);
        return animal.save();
    }
    static async updateAnimal(animalId, updateData) {
        return Animal.findByIdAndUpdate(animalId, updateData, { new: true });
    }

    static async deleteAnimal(animalId) {
        return Animal.findByIdAndDelete(animalId);
    }
}