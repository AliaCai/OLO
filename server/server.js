require("dotenv").config();
//express jwt
const express = require("express");
const crypto = require("crypto-js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { instagram } = require("instagram-scraper-api");
require("./igQuery");

const app = express();
app.use(express.json());
app.use(cookieParser());

const posts = [
  { name: "alia", moreInfo: "123456Chy!" },
  { name: "murphy", moreInfo: "passworddd" },
];
//get posts
app.get("/user", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.name === req.user_name));
});

//function authenticateToken
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const encrypted_token = authHeader && authHeader.split(" ")[1];
  const token = crypto.AES.decrypt(
    encrypted_token,
    process.env.CRYPTO_TOKEN_KEY
  ).toString(crypto.enc.Utf8);

  if (token == null) return res.status(401).send("accessToken is not recieved");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("user", user);
    if (err) return res.status(403).send("unmatched accessToken");
    req.user_name = user.user_name; //req.user
    next();
  });
}

instagram
  .user("willsmith")
  .then((user) => console.log(user))
  .catch((err) => console.error(err));

console.log("hey");
//whatever, let me try it out first

app.listen(5000, () => {
  console.log("run");
});
