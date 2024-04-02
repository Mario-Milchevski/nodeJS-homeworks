import joi from "joi";

export const userSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().min(3).max(30).required(),
    password: joi.string().min(8).max(30).required(),
});