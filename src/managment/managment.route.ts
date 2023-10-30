import { Router } from "express";
import { ManagmentService } from "./managment.service";
import { ManagmentController } from "./managment.controller";
import { validateRoles } from "../auth/middleware/validateRoles";
import { verifyToken } from "../auth/middleware/verifyToken";
import { validateRequest } from "../common";
import { createOfficeSchema } from "./utilities/validators";

export const managmentRoute = Router();

const managmentService = new ManagmentService();
const managmentController = new ManagmentController(managmentService);

managmentRoute.use(verifyToken);

managmentRoute.post(
    "/create-office",
    validateRequest(createOfficeSchema),
    validateRoles(["ADMIN"]), 
    managmentController.createOffice
);

managmentRoute.get(
    "/find-all-offices",
    managmentController.findAllOffice
)
