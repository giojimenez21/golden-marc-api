import { OfficeModel } from "../models/Office.model";
import { PlaceModel } from "../models/Place.model";
import { TicketModel } from "../models/Ticket.model";
import { TravelModel } from "../models/Travel.model";
import { OfficePage } from "./OfficePage";
import { PlacePage } from "./PlacePage";
import { TicketPage } from "./TicketPage";
import { TicketSearch } from "./TicketSearch";
import { TravelPage } from "./TravelPage";

export interface IManagmentService {
    createOffice(office: OfficeModel): Promise<OfficeModel>;
    createPlace(place: PlaceModel): Promise<PlaceModel>;
    findAllOffice(pageNumber: number, pageSize: number): Promise<OfficePage>;
    findOffice(id: number, keyOffice: string, name: string): Promise<OfficeModel>;
    findAllPlaces(pageNumber: number, pageSize: number): Promise<PlacePage>;
    findPlace(id: number, name: string): Promise<PlaceModel>;
    createTravel(travel: TravelModel): Promise<TravelModel>;
    findTravel(placeStart: number, placeEnd: number, date: Date): Promise<TravelModel>;
    findTicket(keyTicket: string): Promise<TicketModel>;
    createTicket(ticket: TicketModel): Promise<TicketModel>;
    findTravels(placeStart: number, placeEnd: number, date: string, pageNumber: number, pageSize: number): Promise<TravelPage>;
    findTravelById(id: number): Promise<TravelModel>;
    findSeatsNoAvailableByTravel(idTravel: number): Promise<TicketModel[]>;
    isDateValidForSale(date: Date): boolean;
    findTicketBySeat(numberSeat: number, idTravel: number): Promise<TicketModel>;
    findTickets(ticketSearch: TicketSearch, pageNumber: number, pageSize: number): Promise<TicketPage>
    findAllTravels(pageNumber: number, pageSize: number): Promise<TravelPage>
}