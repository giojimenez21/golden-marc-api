import dayjs from "dayjs";
import { Op, WhereOptions } from "sequelize";
import { logger } from "../common";
import { PlacePage } from "./interface/PlacePage";
import { OfficePage } from "./interface/OfficePage";
import { TravelPage } from "./interface/TravelPage";
import { TicketPage } from "./interface/TicketPage";
import { TicketSearch } from "./interface/TicketSearch";
import { Place, PlaceModel } from "./models/Place.model";
import { Travel, TravelModel } from "./models/Travel.model";
import { Office, OfficeModel } from "./models/Office.model";
import { Ticket, TicketModel } from "./models/Ticket.model";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";
import { IManagmentService } from "./interface/IManagmentService";
import { calculateOffset, calculatePagination } from "../common/helpers/calculatePagination";

export class ManagmentService implements IManagmentService {
    async findAllOffice(pageNumber: number, pageSize: number): Promise<OfficePage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const offices = await Office.findAndCountAll({
            offset,
            limit: pageSize,
        });
        const officesJson = offices.rows.map((office) => office.toJSON());
        const pagination = calculatePagination(
            pageNumber,
            pageSize,
            offices.count
        );
        const officesWithPagination: OfficePage = {
            ...pagination,
            offices: officesJson,
        };
        return officesWithPagination;
    }

    async findAllTravels(pageNumber: number, pageSize: number): Promise<TravelPage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const travels = await Travel.findAndCountAll({
            offset,
            limit: pageSize,
            include: [
                {
                    model: Place,
                    as: "places_start",
                },
                {
                    model: Place,
                    as: "places_end",
                },
            ],
        });
        const travelsJson = travels.rows.map((office) => office.toJSON());
        const pagination = calculatePagination(
            pageNumber,
            pageSize,
            travels.count
        );
        const travelsWithPagination: TravelPage = {
            ...pagination,
            travels: travelsJson,
        };
        return travelsWithPagination;
    }

    async findOffice(id: number = 0, keyOffice: string = "", name = ""): Promise<OfficeModel> {
        let office;
        if (id > 0) {
            office = await Office.findOne({
                where: { id },
            });
        }

        if (keyOffice !== "") {
            office = await Office.findOne({
                where: { key_office: keyOffice },
            });
        }

        if (name !== "") {
            office = await Office.findOne({
                where: {
                    name: {
                        [Op.substring]: name,
                    },
                },
            });
        }

        return office?.toJSON() as OfficeModel;
    }

    async createOffice(office: OfficeModel): Promise<OfficeModel> {
        const officeExist = await this.findOffice(
            office.id,
            office.key_office,
            office.name
        );
        if (officeExist) {
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
            limit: pageSize,
        });
        const placesJson = places.rows.map((place) => place.toJSON());
        const pagination = calculatePagination(
            pageNumber,
            pageSize,
            places.count
        );
        const placesWithPagination: PlacePage = {
            ...pagination,
            places: placesJson,
        };
        return placesWithPagination;
    }

    async findPlace(id: number, name: string): Promise<PlaceModel> {
        const whereClause: any = {};
        if (id) {
            whereClause.id = id;
        }

        if (name) {
            whereClause.name = name;
        }

        const placeFound = await Place.findOne({
            where: {
                [Op.or]: whereClause,
            },
        });

        return placeFound?.toJSON() as PlaceModel;
    }

    async createTravel(travel: TravelModel): Promise<TravelModel> {
        logger.debug(JSON.stringify(travel));
        const travelExist = await this.findTravel(
            travel.places_start_id,
            travel.places_end_id,
            travel.date
        );

        if (travelExist) {
            throw new ErrorAndCode(
                400,
                "Ya existe un viaje asignado con esos datos"
            );
        }

        const travelNew = await Travel.create(travel);
        return travelNew.toJSON();
    }

    async findTravel(placeStart: number, placeEnd: number, date: Date): Promise<TravelModel> {
        const travel = await Travel.findOne({
            where: {
                places_start_id: placeStart,
                places_end_id: placeEnd,
                date,
            },
        });

        return travel?.toJSON() as TravelModel;
    }

    async findTravelById(id: number): Promise<TravelModel> {
        const travel = await Travel.findOne({ where: { id } });
        return travel?.toJSON() as TravelModel;
    }

    async findTicket(keyTicket: string): Promise<TicketModel> {
        const ticket = await Ticket.findOne({
            where: { key_ticket: keyTicket },
            include: [
                { model: Office },
                {
                    model: Travel,
                    include: [
                        {
                            model: Place,
                            as: "places_start",
                        },
                        {
                            model: Place,
                            as: "places_end",
                        },
                    ],
                },
            ],
        });
        return ticket?.toJSON() as TicketModel;
    }

    async createTicket(ticket: TicketModel): Promise<TicketModel> {
        const newTicket = await Ticket.create(ticket);
        return newTicket.toJSON();
    }

    async findTravels(
        placeStart: number | null,
        placeEnd: number | null,
        date: string | null,
        pageNumber: number,
        pageSize: number
    ): Promise<TravelPage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const whereClause: WhereOptions<TravelModel> = {};

        if (placeStart) {
            whereClause.places_start_id = placeStart;
        }

        if (placeEnd) {
            whereClause.places_end_id = placeEnd;
        }

        if (date) {
            whereClause.date = date;
        }

        const travels = await Travel.findAndCountAll({
            offset,
            limit: pageSize,
            where: {
                [Op.or]: whereClause,
            },
        });
        const pagination = calculatePagination(
            pageNumber,
            pageSize,
            travels.count
        );
        const travelsWithPagination: TravelPage = {
            ...pagination,
            travels: travels.rows.map((travel) => travel.toJSON()),
        };
        return travelsWithPagination;
    }

    async findSeatsNoAvailableByTravel(
        idTravel: number
    ): Promise<TicketModel[]> {
        const seats = await Ticket.findAll({
            attributes: ["number_seat"],
            where: { travels_id: idTravel },
        });

        return seats.map((seat) => seat.toJSON());
    }

    isDateValidForSale(date: Date): boolean {
        const dateOfTravel = dayjs(date);
        return dateOfTravel.isAfter(dayjs());
    }

    async findTicketBySeat(
        numberSeat: number,
        idTravel: number
    ): Promise<TicketModel> {
        const seat = await Ticket.findOne({
            where: { number_seat: numberSeat, travels_id: idTravel },
        });

        return seat?.toJSON() as TicketModel;
    }

    async findTickets(
        ticketSearch: TicketSearch,
        pageNumber: number,
        pageSize: number
    ): Promise<TicketPage> {
        const offset = calculateOffset(pageNumber, pageSize);
        const whereClauseWithOr = [];
        if (ticketSearch.placeStartId) {
            whereClauseWithOr.push({
                "$travel.places_start_id$": ticketSearch.placeStartId
            });
        }

        if (ticketSearch.placeEndId) {
            whereClauseWithOr.push({
                "$travel.places_end_id$": ticketSearch.placeEndId
            });
        }

        if (ticketSearch.date) {
            whereClauseWithOr.push({
                date: ticketSearch.date
            });
        }

        if (ticketSearch.nameClient) {
            whereClauseWithOr.push({
                name_client: {
                    [Op.like]: `%${ticketSearch.nameClient}%`
                }
            });
        }

        const tickets = await Ticket.findAndCountAll({
            include: [
                { model: Office },
                {
                    model: Travel,
                    include: [
                        {
                            model: Place,
                            as: "places_start",
                        },
                        {
                            model: Place,
                            as: "places_end",
                        },
                    ],
                },
            ],
            where: whereClauseWithOr.length > 0
                ? { [Op.or]: whereClauseWithOr }
                : {},
            offset,
            limit: pageSize,
        });

        const pagination = calculatePagination(
            pageNumber,
            pageSize,
            tickets.count
        );
        const ticketsWithPagination: TicketPage = {
            ...pagination,
            tickets: tickets.rows.map((ticket) => ticket.toJSON()),
        };

        return ticketsWithPagination;
    }
}
