// server.js

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/index.js";
import NewSocketConnection from "./socket/socketconnection.js";

dotenv.config();

const app = express();

// =========================
// EXPRESS MIDDLEWARE
// =========================

app.use(
  cors({
    origin:
      process.env.FRONTED_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// ROUTES
// =========================

app.use(router);

// =========================
// HTTP SERVER
// =========================

const server = http.createServer(app);

// =========================
// SOCKET CONNECTION
// =========================

const socketConnection =
  new NewSocketConnection(server);

socketConnection.setupSocket();

// =========================
// SERVER START
// =========================

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
======================================
🚀 StudioX Server Running
🌐 http://localhost:${PORT}
======================================
  `);
});