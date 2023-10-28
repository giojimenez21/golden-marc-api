import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { TokenError, TokenPayloadDecoded } from '../interface/Token';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayloadDecoded;
        }
    }
}

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers["authorization"]?.split(" ")[1];
    if(!tokenBearer) {
        return res.status(400).json({ error: "No hay token en la petición." });
    }
    try {
        const userDecoded = jwt.verify(tokenBearer, process.env.SECRET_JWT!) as TokenPayloadDecoded;
        req.user = userDecoded;

    } catch (e: any) {
        if(e.name === TokenError.Expired) {
            return res.status(401).json({ error: "Token expirado." });
        }

        if(e.name === TokenError.NotValidate) {
            return res.status(403).json({ error: "No se pudo validar el token." })
        }

        return res.status(500).json({ error: e.message })
    }

    next();
}