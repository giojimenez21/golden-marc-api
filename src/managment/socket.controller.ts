import { Server, Socket } from "socket.io";
import { logger } from "../common";
import { IManagmentService } from "./interface/IManagmentService";
import { SocketWithUser, verifyTokenSocket } from "../auth/middleware/verifyTokenSocket";
import { TicketModel } from "./models/Ticket.model";

export class SocketController {
    constructor(
        private readonly io: Server,
        private readonly managmentService: IManagmentService
    ) {}

    public init = () => {
        this.io.use((socket, next) => verifyTokenSocket(socket, next));
        this.io.on("connection", this.handleConnection);
    }

    private handleConnection = (socket: SocketWithUser) => {
        logger.debug(`User connected: ${socket.user?.username}`);

        socket.on("ocuppied-seats-by-travel", async (idTravel: number) => {
            await this.handleOccupiedSeatsByTravel(socket, idTravel);
        });

        socket.on("create-ticket", async (ticket: TicketModel) => {
            await this.handleCreateTicket(socket, ticket);
        });
    }

    private handleOccupiedSeatsByTravel = async(socket: SocketWithUser, idTravel: number) => {
        const seats = await this.managmentService.findSeatsNoAvailableByTravel(idTravel);
        socket.emit("occupied-seats-by-travel", seats);
    }

    private handleCreateTicket = async(socket: SocketWithUser, ticket: TicketModel) => {
        const travel = await this.managmentService.findTravelById(ticket.travels_id);

        if (this.managmentService.isDateValidForSale(travel.date)) {
            socket.emit("create-ticket", { error: "No puede seleccionar un viaje que ya fue finalizado." });
            return;
        }
        
        if(await this.managmentService.findTicketBySeat(ticket.number_seat, ticket.travels_id)) {
            socket.emit("create-ticket", { error: "El asiento ya se encuentra ocupado." });
            return;
        }
        const ticketCreated = await this.managmentService.createTicket(ticket);
        const seats = await this.managmentService.findSeatsNoAvailableByTravel(ticket.travels_id);
        socket.emit("create-ticket", ticketCreated);
        socket.emit("occupied-seats-by-travel", seats);
    }
}

