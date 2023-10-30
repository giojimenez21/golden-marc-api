import { calculateOffset, calculatePagination } from "../common/helpers/calculatePagination";
import { ErrorAndCode } from "../common/utilities/ErrorAndCode";
import { IManagmentService } from "./interface/IManagmentService";
import { OfficePage } from "./interface/OfficePage";
import { Office, OfficeModel } from "./models/Office.model";
import { PlaceModel } from "./models/Place.model";

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
                where: { name }
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

    createPlace(place: PlaceModel): Promise<PlaceModel> {
        throw new Error("Method not implemented.");
    }

    findAllPlaces(): Promise<PlaceModel[]> {
        throw new Error("Method not implemented.");
    }
    findPlace(id: number, name: string): Promise<OfficeModel> {
        throw new Error("Method not implemented.");
    }
}
