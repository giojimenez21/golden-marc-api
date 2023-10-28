import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../common";
import { createUserSchema, loginSchema } from "./utilities/validators";
import { verifyToken } from "./middleware/verifyToken";

export const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post(
    "/create-user",
    validateRequest(createUserSchema),
    authController.registerUser
);

authRouter.post(
    "/login",
    validateRequest(loginSchema),
    authController.loginUser
);

authRouter.get(
    "/renew-token",
    verifyToken,
    authController.renewToken
)
