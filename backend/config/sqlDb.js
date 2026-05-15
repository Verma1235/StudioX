import mysql from "mysql2";


// create connection 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "studiox"
});

db.connect((err) => {
    if (err) {
        console.log("database connection faild:", err);
        return;
    }
    console.log("connected to MYSQL");
});

export default db;