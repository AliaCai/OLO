require("dotenv").config();
//express jwt
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const posts = [
  { name: "aicai", moreInfo: "123456Chy!" },
  { name: "murphy", moreInfo: "passworddd" },
];
//get posts
app.get("/user", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.name === req.user_name));
});

//function authenticateToken
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("accessToken is not recieved");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("user", user);
    if (err) return res.status(403).send("unmatched accessToken");
    req.user_name = user.name; //req.user
    next();
  });
}

app.listen(3000);
