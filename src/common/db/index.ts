import { Sequelize } from "sequelize";

export const db = new Sequelize(
    process.env.DB!,
    process.env.USER_DB!,
    process.env.PASSWORD_DB!,
    {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB as number | undefined,
        dialect: "mysql",
        define: {
            timestamps: true
        },
        logging: true
    }
);