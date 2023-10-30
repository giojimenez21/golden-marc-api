import { Page } from "../../common/interface/Page";
import { OfficeModel } from "../models/Office.model";

export interface OfficePage extends Page {
    offices: OfficeModel[];
}