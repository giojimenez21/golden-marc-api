export enum TokenError {
    Expired = "TokenExpiredError",
    NotValidate = "JsonWebTokenError",
}

export interface TokenPayloadDecoded {
    id: number;
    username: string;
    role: string;
}