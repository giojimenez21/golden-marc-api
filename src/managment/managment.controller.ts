import { Request, Response } from "express";
import { IManagmentService } from "./interface/IManagmentService";
import { logger } from "../common";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";

export class ManagmentController  {
    constructor(private readonly managmentService: IManagmentService) {}

    public createOffice = async(req: Request, res: Response) => {
        try {
            const officeCreated = await this.managmentService.createOffice(req.body);
            return res.status(201).json(officeCreated);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findAllOffice = async(req: Request, res: Response) => {
        const pageNumber = +req.query.page! || 1;
        const pageSize = +req.query.size! || +process.env.PAGE_SIZE!;
        try {
            const officeCreated = await this.managmentService.findAllOffice(pageNumber, pageSize);
            return res.status(200).json(officeCreated);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findOffice = async(req: Request, res: Response) => {
        const officeId = +req.query.id!;
        const officeKey = req.query.keyOffice as string;
        const officeName = req.query.name as string;
        try {
            const office = await this.managmentService.findOffice(officeId, officeKey, officeName);
            if(!office) {
                return res.status(204).json(office);
            }
            return res.status(200).json(office);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findAllPlaces = async(req: Request, res: Response) => {
        const pageNumber = +req.query.page! || 1;
        const pageSize = +req.query.size! || +process.env.PAGE_SIZE!;
        try {
            const places = await this.managmentService.findAllPlaces(pageNumber, pageSize);
            return res.status(200).json(places);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public createPlace = async(req: Request, res: Response) => {
        try {
            const placeCreated = await this.managmentService.createPlace(req.body);
            return res.status(201).json(placeCreated);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }
}