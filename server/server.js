//express, bcrypt
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];
const posts = [
  { name: "alia", password: "123456Chy!" },
  { name: "murphy", password: "passworddd" },
];

//get users
app.get("/users", (req, res) => {
  res.json({ users });
});

//post users <-name and password given
app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const password = req.body.password;
    const hashedPassowrd = await bcrypt.hash(password, salt);
    const user = { name: req.body.name, password: hashedPassowrd };
    users.push(user);
    res.status(201).send("sign up user successfully");
  } catch {
    res.status(500).send("sign up error");
  }
});
//identify user in users => create 2 accessTokens
app.post("/users/login", async (req, res) => {
  const user = users.find((user) => req.body.name === users.name);
  if (user == null) return res.status(400).send("cannot find the username");
  //has such username
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send("login successfully");
    } else {
      res.status(400).send("incorrect password");
    }
  } catch {
    res.status(500);
  }
});

app.listen(3000);
