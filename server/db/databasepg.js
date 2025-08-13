require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "postgres",
});

module.exports = pool;
