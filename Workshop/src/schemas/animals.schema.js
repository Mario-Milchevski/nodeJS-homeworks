import joi from "joi";

export const types = [
    "Dog",
    "Cat",
];
export const status = [
    "Available",
    "Adopted"
]

export const animalsSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    type: joi.string().valid(...types).required(),
    breed: joi.string().min(3).max(30).required(),
    age: joi.number().min(1).max(25).required(),
    status: joi.string().valid(...status).required(),
    description: joi.string().min(2),
});
