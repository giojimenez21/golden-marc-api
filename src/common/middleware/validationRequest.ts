import { NextFunction, Request, Response } from "express";
import { Schema, array } from "joi";
import { logger } from "../config/logger";

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        if(error) {
            logger.debug(JSON.stringify(error.details));
            const errors = error.details.map(detail => {
                let customMessage = null;
                const keysContext = Object.keys(detail.context!);
                if(keysContext.includes("invalids")) {
                    customMessage = Object.values(detail.context!)[0][0];
                }
                return {
                    message: customMessage ? customMessage : detail.message,
                    attribute: detail.context?.key
                }
            });
            
            return res.status(400).json(errors);
        }

        next();
    }
}