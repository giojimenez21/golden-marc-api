import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { TokenError, TokenPayloadDecoded } from "../interface/Token";

export interface SocketWithUser extends Socket {
    user?: TokenPayloadDecoded
}

export const verifyTokenSocket = (socket: SocketWithUser, next: (err?: ExtendedError | undefined) => void) => {
    const token = socket.handshake.headers.access_token as string;
    try {
        const userDecoded = jwt.verify(token, process.env.SECRET_JWT!) as TokenPayloadDecoded;
        socket.user = userDecoded;

    } catch (e: any) {
        if(e.name === TokenError.Expired) {
            return next(new Error("Token expirado."));
        }

        if(e.name === TokenError.NotValidate) {
            return next(new Error("No se pudo validar el token."));
        }

        return next(new Error(e.message));
    }

    next();
}