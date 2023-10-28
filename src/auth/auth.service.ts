import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Login } from "./entities/Login";
import { User, UserModel } from "./models/User.model";
import { IAuthService } from "./interface/IAuthService";
import { UserWithToken } from "./entities/UserWithToken";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";

export class AuthService implements IAuthService {
    async createUser(user: UserModel): Promise<UserWithToken> {
        const userExist = await this.findUserByUsername(user.username);
        if (userExist) {
            throw new Error("Ya hay una persona con ese usuario.");
        }
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(user.password!, salt);
        const userCreated = await User.create({
            ...user,
            password: passwordHash,
        });
        const token = await this.generateToken(userCreated.toJSON());
        const { password, ...userWithOutPassword } = userCreated.toJSON();
        const userWithToken: UserWithToken = {
            ...userWithOutPassword,
            token,
        };
        return userWithToken;
    }

    async findUserByUsername(username: string): Promise<UserModel> {
        const user = await User.findOne({
            where: { username },
        });

        return user?.toJSON() as UserModel;
    }

    async generateToken(user: UserModel): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            jwt.sign(
                payload,
                process.env.SECRET_JWT!,
                {
                    expiresIn: process.env.EXPIRE_JWT,
                },
                (err, token) => {
                    if (err) {
                        reject("No se pudo generar el token.");
                        return;
                    }

                    resolve(token!);
                }
            );
        });
    }

    async login(userLogin: Login): Promise<UserWithToken> {
        const userExist = await this.findUserByUsername(userLogin.username);
        if (!userExist) {
            throw new ErrorAndCode(
                404,
                "Verifique las credenciales ingresadas."
            );
        }

        const passwordIsCorrect = bcrypt.compareSync(
            userLogin.password,
            userExist.password!
        );
        if (!passwordIsCorrect) {
            throw new ErrorAndCode(
                403,
                "Verifique las credenciales ingresadas"
            );
        }

        const token = await this.generateToken(userExist);
        const { password, ...userWithoutPassword } = userExist;
        const userLogged: UserWithToken = {
            ...userWithoutPassword,
            token,
        };
        return userLogged;
    }

    async renewToken(username: string): Promise<UserWithToken> {
        const user = await this.findUserByUsername(username);
        const token = await this.generateToken(user);
        const { password, ...userWithoutPassword } = user;
        const userWithToken: UserWithToken = {
            ...userWithoutPassword,
            token,
        };
        return userWithToken;
    }
}
