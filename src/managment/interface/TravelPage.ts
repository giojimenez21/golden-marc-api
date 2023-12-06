import { Page } from "../../common/interface/Page";
import { TravelModel } from "../models/Travel.model";

export interface TravelPage extends Page {
    travels: TravelModel[];
}