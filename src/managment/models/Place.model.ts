import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";
import { Travel } from "./Travel.model";

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
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

Travel.belongsTo(Place, {
    foreignKey: "places_start_id",
    as: "places_start",
});

Travel.belongsTo(Place, {
    foreignKey: "places_end_id",
    as: "places_end",
});

Place.hasMany(Travel, {
    foreignKey: "places_start_id",
    as: "travels_start",
});

Place.hasMany(Travel, {
    foreignKey: "places_end_id",
    as: "travels_end",
});
