import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";

export interface OfficeModel {
    id?: number;
    key_office: string;
    name: string;
}

interface OfficeCreationAttributes extends Optional<OfficeModel, "id"> {}

export const Office = db.define<Model<OfficeModel, OfficeCreationAttributes>>(
    "office",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        key_office: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true
    }
);
