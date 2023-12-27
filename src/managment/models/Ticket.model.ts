import { v4 as uuidv4 } from "uuid";
import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";
import { Office } from "./Office.model";
import { Travel } from "./Travel.model";

export interface TicketModel {
    id?: number;
    key_ticket: string;
    price: number;
    key_office: string;
    name_client: string;
    number_seat: number;
    travels_id: number;
}

interface TicketCreationAttributes extends Optional<TicketModel, "id"> {}

export const Ticket = db.define<Model<TicketModel, TicketCreationAttributes>>(
    "tickets",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        key_ticket: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4()
        },
        price: {
            type: DataTypes.FLOAT,
        },
        key_office: {
            type: DataTypes.STRING
        },
        name_client: {
            type: DataTypes.STRING
        },
        number_seat: {
            type: DataTypes.NUMBER
        },
        travels_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true
    }
);

Office.hasMany(Ticket, { foreignKey: "key_office" });
Ticket.belongsTo(Office, { foreignKey: "key_office" });

Travel.hasMany(Ticket, { foreignKey: "travels_id" });
Ticket.belongsTo(Travel, { foreignKey: "travels_id" });