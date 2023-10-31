import Joi from "joi";

export const createOfficeSchema = Joi.object({
    key_office: Joi.string()
        .min(3)
        .required(),
    name: Joi.string()
        .required()
});

export const createPlaceSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
});