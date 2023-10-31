import { Page } from "../../common/interface/Page";
import { PlaceModel } from "../models/Place.model";

export interface PlacePage extends Page {
    places: PlaceModel[]
}