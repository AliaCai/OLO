require("dotenv").config({ path: "../.env" });

const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "postgres",
});

client.connect();
client.query("SELECT * FROM olo_user", (err, res) => {
  if (!err) {
    console.log("response", res.rows);
  } else {
    console.log("error", err.message);
  }

  client.end;
});
