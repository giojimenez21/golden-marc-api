import { Router } from "express";
import { ManagmentService } from "./managment.service";
import { ManagmentController } from "./managment.controller";
import { validateRoles } from "../auth/middleware/validateRoles";
import { verifyToken } from "../auth/middleware/verifyToken";
import { validateRequest } from "../common";
import { createOfficeSchema, createTicketSchema, createTravelSchema } from "./utilities/validators";
import { Role } from "../auth/interface/Role.enum";

export const managmentRoute = Router();

const managmentService = new ManagmentService();
const managmentController = new ManagmentController(managmentService);

managmentRoute.use(verifyToken);

managmentRoute.post(
    "/create-office",
    validateRequest(createOfficeSchema),
    validateRoles([Role.ADMIN]), 
    managmentController.createOffice
);

managmentRoute.get(
    "/find-all-offices",
    managmentController.findAllOffice
);

managmentRoute.get(
    "/find-office",
    managmentController.findOffice
);

managmentRoute.get(
    "/find-all-places",
    managmentController.findAllPlaces
);

managmentRoute.post(
    "/create-place",
    validateRoles([Role.ADMIN]),
    managmentController.createPlace
);

managmentRoute.get(
    "/find-place",
    managmentController.findPlace
);

managmentRoute.post(
    "/create-travel",
    validateRequest(createTravelSchema),
    validateRoles([Role.ADMIN]),
    managmentController.createTravel
);

managmentRoute.post(
    "/create-ticket",
    validateRequest(createTicketSchema),
    managmentController.createTicket
);

managmentRoute.get(
    "/find-travels",
    managmentController.findTravels
);

managmentRoute.get(
    "/find-ticket/:keyTicket",
    managmentController.findTicket
);