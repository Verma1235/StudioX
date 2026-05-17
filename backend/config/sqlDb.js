import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "studiox",

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,

    ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
    },
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("Connected to MYSQL");

    connection.release();
});

db.on("error", (err) => {
    console.error("MySQL Pool Error:", err);
});

export default db;