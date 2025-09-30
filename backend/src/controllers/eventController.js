import { db } from "../config/pool.js";
import express from "express";
import { search_value } from "../config/db_actions.js";
import { createClient } from "redis";

// const app = express();
// app.use(express.json());

const client = createClient();
export const all_events = async (req, res) => {
  console.log("heyyy??----?");
  const all_event = `SELECT * from olo_post 
    WHERE account_name  LIKE '%'|| $1 ||'%'  
    AND TO_CHAR(event_start_time, 'yyyy-mm-dd') LIKE '%' || $2 || '%'
    AND event_title LIKE '%' || $3 || '%' 
    AND event_desc LIKE '%' || $4 || '%'
    AND location LIKE '%' || $5 || '%' `;
  const conditions = [
    req.body.account_name ? req.body.account_name : "",
    req.body.event_start_date ? req.body.event_start_date : "",
    req.body.event_title ? req.body.event_title : "",
    req.body.event_desc ? req.body.event_desc : "",
    req.body.location ? req.body.location : "",
  ]; //req.body.event_start_time,
  console.log(req.body);
  db.query(all_event, conditions, (err, dbRes) => {
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

// app.get("/test_events", all_events);

// app.listen(6000, () => {
//   console.log("runo on 6000");
// });
