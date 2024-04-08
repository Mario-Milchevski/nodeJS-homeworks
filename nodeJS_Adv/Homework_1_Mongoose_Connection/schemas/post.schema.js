import joi from "joi";

export const postSchema = joi.object({
    title: joi.string().min(3).max(30).required(),
    content: joi.string().min(3).max(30).required(),
    likes: joi.array().items(joi.object()),
});