import { Op } from "sequelize";
import { calculateOffset, calculatePagination } from "../common/helpers/calculatePagination";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";
import { IManagmentService } from "./interface/IManagmentService";
import { OfficePage } from "./interface/OfficePage";
import { PlacePage } from "./interface/PlacePage";
import { Office, OfficeModel } from "./models/Office.model";
import { Place, PlaceModel } from "./models/Place.model";
import { Travel, TravelModel } from "./models/Travel.model";
import { logger } from "../common";
import { Ticket, TicketModel } from "./models/Ticket.model";
import { TravelPage } from "./interface/TravelPage";

export class ManagmentService implements IManagmentService {
    async findAllOffice(pageNumber: number, pageSize: number): Promise<OfficePage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const offices = await Office.findAndCountAll({
            offset,
            limit: pageSize
        });
        const officesJson = offices.rows.map((office) => office.toJSON());
        const pagination = calculatePagination(pageNumber, pageSize, offices.count);
        const officesWithPagination: OfficePage = {
            ...pagination,
            offices: officesJson,
        }
        return officesWithPagination;
    }

    async findOffice(id: number = 0, keyOffice: string = "", name = ""): Promise<OfficeModel> {
        let office;
        if(id > 0) {
            office = await Office.findOne({
                where: { id },
            });
        }

        if(keyOffice !== "") {
            office = await Office.findOne({
                where: { key_office: keyOffice }
            });
        }

        if(name !== "") {
            office = await Office.findOne({
                where: { 
                    name: {
                        [Op.substring]: name
                    }
                }
            });
        }

        return office?.toJSON() as OfficeModel;
    }

    async createOffice(office: OfficeModel): Promise<OfficeModel> {
        const officeExist = await this.findOffice(office.id, office.key_office, office.name);
        if(officeExist) {
            throw new ErrorAndCode(400, "Ya existe una oficina con esos datos");
        }
        const newOffice = await Office.create(office);
        return newOffice.toJSON();
    }

    async createPlace(place: PlaceModel): Promise<PlaceModel> {
        const placeCreated = await Place.create(place);
        return placeCreated.toJSON();
    }

    async findAllPlaces(pageNumber: number, pageSize: number): Promise<PlacePage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const places = await Place.findAndCountAll({
            offset,
            limit: pageSize
        });
        const placesJson = places.rows.map((place) => place.toJSON());
        const pagination = calculatePagination(pageNumber, pageSize, places.count);
        const placesWithPagination: PlacePage = {
            ...pagination,
            places: placesJson,
        }
        return placesWithPagination;
    }


    async findPlace(id: number = 0, name: string = ""): Promise<PlaceModel> {
        let placeFind;
        if(id > 0) {
            placeFind = await Place.findOne({
                where: { id }
            });
        }

        if(name !== "") {
            placeFind = await Place.findOne({
                where: {
                    name: { [Op.substring]: name }
                }
            });
        } 

        return placeFind?.toJSON() as PlaceModel;
    }

    async createTravel(travel: TravelModel): Promise<TravelModel> {
        logger.debug(JSON.stringify(travel));
        const travelExist = await this.findTravel(
            travel.places_start_id, 
            travel.places_end_id, 
            travel.date
        );

        if(travelExist) {
            throw new ErrorAndCode(400, "Ya existe un viaje asignado con esos datos");
        }

        const travelNew = await Travel.create(travel);
        return travelNew.toJSON();
    }

    async findTravel(placeStart: number, placeEnd: number, date: Date): Promise<TravelModel> {
        const travel = await Travel.findOne({
            where: {
                places_start_id: placeStart,
                places_end_id: placeEnd,
                date
            }
        });

        return travel?.toJSON() as TravelModel;
    }

    async findTicket(keyTicket: string): Promise<TicketModel> {
        const ticket = await Ticket.findOne({
            where: { key_ticket: keyTicket },
            include: [
                { model: Office },
                { model: Travel }
            ]
        });

        return ticket?.toJSON() as TicketModel;
    }

    async createTicket(ticket: TicketModel): Promise<TicketModel> {
        const newTicket = await Ticket.create(ticket);
        return newTicket.toJSON();
    }

    async findTravels(
        placeStart: number, 
        placeEnd: number, 
        date: string, 
        pageNumber: number, 
        pageSize: number
    ): Promise<TravelPage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const travels = await Travel.findAndCountAll({
            offset,
            limit: pageSize,
            where: {
                [Op.or]: [
                    { places_start_id: placeStart }, 
                    { places_end_id: placeEnd },
                    { date }
                ]
            }
        });
        const pagination = calculatePagination(pageNumber, pageSize, travels.count);
        const travelsWithPagination: TravelPage = {
            ...pagination,
            travels: travels.rows.map(travel => travel.toJSON())
        }
        return travelsWithPagination;
    }
}
