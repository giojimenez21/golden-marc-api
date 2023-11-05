import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";

export interface TravelModel {
    id?: number;
    places_start_id: number;
    places_end_id: number;
    number_seats: number;
    price_ticket: number;
    date: Date;
}

interface TravelCreationAttributes extends Optional<TravelModel, "id"> {}

export const Travel = db.define<Model<TravelModel, TravelCreationAttributes>>(
    "travels",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        places_start_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        places_end_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_seats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price_ticket: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }
);
