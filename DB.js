// backend/db.js
import mysql from "mysql2";

// สร้าง connection
const db = mysql.createConnection({
  host: "localhost",  // ถ้า Node.js รันใน container -> ใช้ "mysql"
  port: 3307,         // port ที่ map ใน docker-compose
  user: "user",
  password: "numerja",
  database: "numer"
});

// เช็ค connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected!");
  }
});

export default db;
