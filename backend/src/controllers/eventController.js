import { db } from "../config/pool.js";
import { search_value } from "../config/db_actions.js";
import { createClient } from "redis";

const client = createClient();

export const all_events = async (req, res) => {
  const all_event =
    "SELECT * from olo_post where account_name='uwaterlooalumni'";
  db.query(all_event, (err, res) => {
    if (err) {
      return res.status(500).json({ message: `query events error : ${err}` });
    } else {
      //   console.log(res.rows);
      return res.rows;
    }
  });
};
all_events();
