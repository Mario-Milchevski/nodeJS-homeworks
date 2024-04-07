import Adoption from "../models/adoption.model.js";
import AnimalsService from "./animals.service.js";

export default class AdoptionsService {
    static getAdoptions() {

        return Adoption.find().populate('animal')
    }

    static async recordAdoption(adoptionData) {
        const animalId = adoptionData.animal;
        const animal = await AnimalsService.getAnimalById(animalId);
        if (!animal) throw new Error('Animal not found');
        animal.status = "Adopted";

        const adoption = new Adoption(adoptionData);
        await AnimalsService.updateAnimal(animalId, animal);
        return adoption.save();
    }


}