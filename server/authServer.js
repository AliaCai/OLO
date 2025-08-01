//express, bcrypt, jwt

/*
bcrypt: hash, compare (async)
jwt: sign, verify


*/
require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
let register_users = {};

app.use(express.json());

const users = [];
let refreshTokens = [];
//user:name, password

//get users
app.get("/users", (req, res) => {
  res.json({ users });
});

//send verfication code ==================================================
app.post("/email_verify", (req, res) => {
  // console.log("email verify", Object.keys(users));
  if (users.find((user) => user.email == req.body.email))
    return res.status(200).send(`${req.body.email} is registered already`);
  let verification_code =
    Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  register_users[req.body.email] = { verification_code: verification_code };
  // console.log("--------register_users", register_users);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.body.email,
    subject: "OLO EMAIL VERIFICATION!",
    text: `This is a reminder for your OLO email verification!\n Your verfication code is :  ${verification_code}.\n\n - OLO`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).send("email is not sent successfully");
    res.status(200).send("email is sent already!");
  });
});

//post users <-name and password given
//sign in ==================================================
app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const password = req.body.password;
    const hashedPassowrd = await bcrypt.hash(password, salt);
    // console.log(hashedPassowrd, " ", salt);

    // console.log(
    //   "-------register - register_users",
    //   register_users,
    //   register_users[req.body.email]
    // );

    if (await users.find((user) => req.body.email == user.email)) {
      return res.status(500).send(`${req.body.email} exist already`);
    }

    if (
      register_users[req.body.email] &&
      register_users[req.body.email]["verification_code"] ==
        req.body.verification_code
    ) {
      const user = {
        name: req.body.name,
        password: hashedPassowrd,
        email: req.body.email,
      };
      users.push(user);
      delete register_users[req.body.email];

      // console.log("\n after removal", register_users);
      res.status(201).send("sign up user successfully");
    } else {
      res.status(500).send("verification code is incorrect!");
    }
  } catch {
    res.status(500).send("sign up error");
  }
});

//TOKEN  => take referesh token , generate 1 accessToken
//refresh token ==================================================
app.post("/refresh_token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) res.status(401).send("no refresh token");
  // console.log("---refreshTokens", refreshTokens);
  if (!refreshTokens.includes(refreshToken)) res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) res.status(403).send("refreshToken isn't matched");
    const accessToken = generateToken(user);
    res.status(200).json({ accessToken: accessToken });
  });
});

//LOGOUT => take refresh token, remove it
//user logs out ==================================================
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  res.status(200).send("user logs out");
});

//LOGIN.  identify user in users => create 2 accessTokens
//user log in ==================================================
app.post("/login", async (req, res) => {
  const user = users.find((user) => req.body.name === user.name);
  if (user == null) return res.status(400).send("cannot find the username");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      // console.log("hey", accessToken, refreshToken);
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).send("incorrect password");
    }
  } catch {
    res.status(500).send("Interal Service Error");
  }
});

//function: generate Token ==================================================
function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15h",
  });
}

app.listen(4000);
