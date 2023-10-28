import { Request, Response } from "express";
import { logger } from "../common";
import { IAuthService } from "./interface/IAuthService";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    public registerUser = async (req: Request, res: Response) => {
        try {
            const userCreated = await this.authService.createUser(req.body);
            return res.status(201).json(userCreated);
        } catch (e: any) {
            logger.error(e);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const userLogged = await this.authService.login(req.body);
            return res.status(200).json(userLogged);
        } catch (e: any) {
            logger.error(e);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    };

    public renewToken = async (req: Request, res: Response) => {
        try {
            const userWithToken = await this.authService.renewToken(req.user?.username!);
            return res.status(200).json(userWithToken);
        } catch (e: any) {
            logger.error(e);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    };
}
