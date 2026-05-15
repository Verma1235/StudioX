import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import genRouter from "./routes/generalRoutes.js";
import apiRouter from "./routes/apiRoutes.js";
import authRouter from "./routes/authRoutes.js";
import db from "./config/sqlDb.js";
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config();

/* ================= PATH ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");

/* ================= EXPRESS ================= */
const app = express();
// app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*", credentials: true }));

// Middleware & routes

app.use("/", genRouter);

app.use(authMiddleware);
app.use("/auth", authRouter);
app.use("/api", apiRouter);


/* ================= HTTP + SOCKET.IO ================= */
const httpServer = createServer(app);
const fronted_origin = `${process.env.FRONTED_URL}` || 'http://localhost:5173';
console.log(fronted_origin)
const io = new Server(httpServer, {
    cors: {
        origin: fronted_origin,
        methods: ["GET", "POST"],
    },
});







httpServer.listen(process.env.PORT, () => {
    console.log(`Studiox backend running at  http://localhost:${process.env.PORT}`)
});

export { io };