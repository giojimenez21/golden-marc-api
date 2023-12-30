import { Request, Response } from "express";
import { IManagmentService } from "./interface/IManagmentService";
import { logger } from "../common";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";
import { PageDefaults } from "../common/interface/PageDefaults.enum";
import dayjs from "dayjs";
import { TicketSearch } from "./interface/TicketSearch";

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
        const pageNumber = +req.query.page! || PageDefaults.pageNumber;
        const pageSize = +req.query.size! || PageDefaults.pageSize;
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
        const pageNumber = +req.query.page! || PageDefaults.pageNumber;
        const pageSize = +req.query.size! || PageDefaults.pageSize;
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

    public findPlace = async(req: Request, res: Response) => {
        const placeId = +req.query.id!;
        const placeName = req.query.name as string;
        try {
            const place = await this.managmentService.findPlace(placeId, placeName);
            if(!place) {
                return res.status(204).json(place);
            }
            return res.status(200).json(place);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public createTravel = async(req: Request, res: Response) => {
        try {
            const travelCreated = await this.managmentService.createTravel(req.body);
            return res.status(201).json(travelCreated);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public createTicket = async(req: Request, res: Response) => {
        try {
            const travel = await this.managmentService.findTravelById(req.body.travels_id);
            logger.debug(travel);
            
            if(this.managmentService.isDateValidForSale(travel.date)) {
                return res.status(400).json({ error: "No puede seleccionar un viaje que ya fue realizado." });
            }

            if(await this.managmentService.findTicketBySeat(+req.body.number_seat, +req.body.travels_id)) {
                return res.status(400).json({ error: "El asiento ya se encuentra ocupado." });
            }

            const ticketCreated = await this.managmentService.createTicket(req.body);
            return res.status(201).json(ticketCreated);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findTicket = async(req: Request, res: Response) => {
        try {
            const ticketFound = await this.managmentService.findTicket(req.params.keyTicket);
            if(!ticketFound) {
                return res.status(204).json(ticketFound)
            }
            return res.status(200).json(ticketFound);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findTravels = async(req: Request, res: Response) => {
        const { placeStart, placeEnd, date } = req.query!;
        const pageNumber = +req.query.page! || PageDefaults.pageNumber;
        const pageSize = +req.query.size! || PageDefaults.pageSize;
        
        try {
            const travelPage = await this.managmentService.findTravels(
                +placeStart!,
                +placeEnd!,
                date?.toString()!,
                pageNumber,
                pageSize
            );

            if(travelPage.travels.length == 0) {
                return res.status(204).json(travelPage);
            }
            return res.status(200).json(travelPage);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }

    public findTickets = async(req:Request, res: Response) => {
        const { keyTicket, date, nameClient, placeStartId, placeEndId } = req.query!;
        const pageNumber = +req.query.page! || PageDefaults.pageNumber;
        const pageSize = +req.query.size! || PageDefaults.pageSize;
        const ticketSearch:TicketSearch = {
            keyTicket: keyTicket?.toString()!,
            date: date?.toString()!,
            nameClient: nameClient?.toString()!,
            placeStartId: +placeStartId!,
            placeEndId: +placeEndId!
        };
        try {
            const ticketPage = await this.managmentService.findTickets(
                ticketSearch, 
                pageNumber, 
                pageSize
            );

            if(ticketPage.tickets.length == 0) {
                return res.status(204).json(ticketPage);
            }
            
            return res.status(200).json(ticketPage);
        } catch (e: any) {
            logger.error(e.stack);
            if (e instanceof ErrorAndCode) {
                return res.status(e.statusCode).json({ error: e.message });
            }
            return res.status(500).json({ error: e.message });
        }
    }
}