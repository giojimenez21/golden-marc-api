import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { logger } from "../config/logger";

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if(error) {
            const errors = error.details.map(detail => (
                { 
                    message: detail.message,
                    attribute: detail.path
                }
            ));
            logger.debug(errors);
            return res.status(400).json({ error: errors });
        }

        next();
    }
}