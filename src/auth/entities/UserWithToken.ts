import { UserModel } from "../models/User.model";

export interface UserWithToken extends UserModel {
    token: string
}