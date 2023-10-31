import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";

export interface PlaceModel {
    id?: number;
    name: string;
}

interface PlaceCreationAttributes extends Optional<PlaceModel, "id"> {}

export const Place = db.define<Model<PlaceModel, PlaceCreationAttributes>>(
    "places",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);
