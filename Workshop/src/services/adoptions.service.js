import Adoption from "../models/adoption.model.js";
import AnimalsService from "./animals.service.js";

export default class AdoptionsService {
    static getAdoptions() {

        return Adoption.find().populate('animal')
    }

    static async recordAdoption(adoptionData) {
        console.log(adoptionData);
        const adoption = new Adoption(adoptionData);
        await AnimalsService.updateAnimal(animalId, updateData)
        return adoption.save();
    }

}