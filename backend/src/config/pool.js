import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "postgres",
});
// console.log("password is", process.env.DB_PASSWORD);
// module.exports = db;
