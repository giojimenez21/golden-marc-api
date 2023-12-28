import { Page } from "../../common/interface/Page";
import { TicketModel } from "../models/Ticket.model";

export interface TicketPage extends Page {
    tickets: TicketModel[];
}