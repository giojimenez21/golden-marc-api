import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import yaml from "yamljs";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import swaggerUI from "swagger-ui-express";

import { db, logger } from "./common";
import { authRouter } from "./auth/auth.route";
import { managmentRoute } from "./managment/managment.route";
import { SocketWithUser, verifyTokenSocket } from "./auth/middleware/verifyTokenSocket";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4000;
const swaggerFilePath = path.join(__dirname, '../docs.yaml');
const swaggerDocument = yaml.load(swaggerFilePath);

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/managment", managmentRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

db.authenticate()
    .then(() => logger.info("DB online"))
    .catch((e) => logger.error(`DB error: ${e.message}`));

io.use((socket, next) => verifyTokenSocket(socket, next));

io.on("connection", (socket: SocketWithUser) => {
    logger.debug(`User connected: ${socket.user?.username}`);
});

server.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
