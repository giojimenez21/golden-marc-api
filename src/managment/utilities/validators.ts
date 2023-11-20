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

export const createTravelSchema = Joi.object({
    places_start_id: Joi.number()
        .min(1)
        .required(),
    places_end_id: Joi.number()
        .min(1)
        .invalid(Joi.ref('places_start_id'), "El destino inicial y final no pueden ser el mismo.")
        .required(),
    date: Joi.date()
        .greater('now')
        .required(),
    number_seats: Joi.number()
        .min(1)
        .required(),
    price_ticket: Joi.number()
        .min(1)
        .required()
});

export const createTicketSchema = Joi.object({
    price: Joi.number()
        .min(1)
        .required(),
    key_ofiice: Joi.string()
        .required(),
    name_client: Joi.string()
        .required(),
    number_seat: Joi.number()
        .min(1)
        .required(),
    travels_id: Joi.string()
        .required()
});