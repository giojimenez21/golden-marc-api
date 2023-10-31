import { OfficeModel } from "../models/Office.model";
import { PlaceModel } from "../models/Place.model";
import { OfficePage } from "./OfficePage";
import { PlacePage } from "./PlacePage";

export interface IManagmentService {
    createOffice(office: OfficeModel): Promise<OfficeModel>;
    createPlace(place: PlaceModel): Promise<PlaceModel>;
    findAllOffice(pageNumber: number, pageSize: number): Promise<OfficePage>;
    findOffice(id: number, keyOffice: string, name: string): Promise<OfficeModel>;
    findAllPlaces(pageNumber: number, pageSize: number): Promise<PlacePage>;
    findPlace(id: number, name: string): Promise<PlaceModel>;
}