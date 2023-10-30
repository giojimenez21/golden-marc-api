import { NextFunction, Request, Response } from "express";

export const validateRoles = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role!)) {
            return res
                .status(403)
                .json({
                    error: "El usuario no cuenta con los permisos necesarios para acceder a este recurso",
                });
        }

        next();
    };
};
