import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../common";

interface UserAttributes {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role: string;
    key_office: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export const User = db.define<Model<UserAttributes, UserCreationAttributes>>(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        key_office: {
            type: DataTypes.STRING,
        },
    }
);
