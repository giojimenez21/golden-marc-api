import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import { db, logger } from "./common";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

db.authenticate()
    .then(() => logger.info("DB online"))
    .catch((e) => logger.error(`DB error: ${e.message}`));

io.on("connection", (socket) => {
    logger.debug("Socket connected");
});

server.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
