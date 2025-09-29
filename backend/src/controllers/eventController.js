import { db } from "../config/pool.js";
import express from "express";
import { search_value } from "../config/db_actions.js";
import { createClient } from "redis";

const client = createClient();
export const all_events = async (req, res) => {
  console.log("heyyy???");
  const all_event = "SELECT * from olo_post";
  db.query(all_event, (err, dbRes) => {
    if (err) {
      res.status(500).json({ message: `query events error : ${err}` });
    } else {
      console.log(dbRes.rows, dbRes.rowCount);
      res.status(200).json({
        msg: "Success",
        code: 200,
        total: dbRes.rowCount,
        rows: dbRes.rows,
      });
    }
  });
};

//tests:
const app = express();
app.get("/test_events", all_events);

app.listen(6000, () => {
  console.log("runo on 6000");
});

//conditions:
//1. start date
//2. organization name
//3. event name
//4. description
