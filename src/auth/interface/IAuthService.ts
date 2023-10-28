import { UserModel } from "../models/User.model";
import { UserWithToken } from "../entities/UserWithToken";
import { Login } from "../entities/Login";

export interface IAuthService {
    createUser(user: UserModel): Promise<UserWithToken>;
    findUserByUsername(username: string): Promise<UserModel>;
    generateToken(user: UserModel): Promise<string>;
    login(userLogin: Login): Promise<UserWithToken>;
    renewToken(username: string): Promise<UserWithToken>;
}