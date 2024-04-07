import joi from "joi";


export const adoptionsSchema = joi.object({
    adopterName: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    animal: joi.string().required(),

});
