// require("dotenv").config({ path: "../.env" });
const db = require("./pool");

function search_value(table_name, column_name, value) {
  // console.log("here", process.env.DB_PASSWORD);
  const search_query = `SELECT * from ${table_name} WHERE ${column_name}=$1`;
  // console.log("db is :", db);
  return new Promise((resolve, reject) => {
    db.query(search_query, [value], (err, res) => {
      console.log("search db values");
      if (!err) {
        return resolve(res.rows);
      } else {
        console.log(`error  ${column_name}=${value} in ${table_name} ${err}`);
        return reject(err);
      }
    });
  });
}

module.exports = { search_value };
