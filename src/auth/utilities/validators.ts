import Joi from "joi";

export const createUserSchema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    username: Joi.string()
        .min(3)
        .max(10)
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    role: Joi.string()
        .required(),
    key_office: Joi.string()
        .required()
});

export const loginSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
})