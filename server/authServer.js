//express, bcrypt, jwt

/*
bcrypt: hash, compare (async)
jwt: sign, verify


*/
require("dotenv").config();
const db = require("./db/pool");
const { search_value } = require("./db/db_actions");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
let register_users = {};

app.use(express.json());
//cors
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true })); //credentials for cookies -> remove for pord &&&

const users = [];
let refreshTokens = [];
//user:name, password

//get users
app.get("/users", (req, res) => {
  res.json({ users });
});
//send verfication code ==================================================
app.post("/email_verify", async (req, res) => {
  const users = await search_value("olo_user", "user_email", req.body.email);
  if (users.length >= 1)
    return res
      .status(500)
      .json({ message: `${req.body.email} is registered already` });

  let verification_code =
    Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  register_users[req.body.email] = { verification_code: verification_code };

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
    if (err)
      return res
        .status(500)
        .json({ message: "email is not sent successfully" });
    res.status(200).json({ message: "email is sent already!" });
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

    const users1 = await search_value("olo_user", "user_name", req.body.name);
    const users2 = await search_value("olo_user", "user_email", req.body.email);

    if (users1.length >= 1) {
      return res.status(500).json({ message: `user name exist already` });
    }

    if (users2.length >= 1) {
      return res.status(500).json({ message: `user email exist already` });
    }

    if (
      register_users[req.body.email] &&
      register_users[req.body.email]["verification_code"] ==
        req.body.verification_code
    ) {
      delete register_users[req.body.email];

      //add to db
      const add_user =
        "INSERT INTO olo_user(user_name, user_email, user_password, create_by, update_by) VALUES ($1,$2,$3,$4,$5)";
      db.query(
        add_user,
        [
          req.body.name,
          req.body.email,
          hashedPassowrd,

          req.body.name,

          req.body.name,
        ],
        (err, res) => {
          if (!err) {
            console.log("add successfullt", res);
          } else {
            console.log("err happens between", err);
          }
        }
      );
      // console.log("\n after removal", register_users);
      res.status(200).json({ message: "sign up user successfully" });
    } else {
      res.status(500).json({ message: "verification code is incorrect!" });
    }
  } catch {
    res.status(500).json({ message: "sign up error" });
  }
});

//TOKEN  => take referesh token , generate 1 accessToken
//refresh token ==================================================
app.post("/refresh", (req, res) => {
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
  res.status(200).json({ message: "user logs out" });
});

//LOGIN.  identify user in users => create 2 accessTokens
//user log in ==================================================
app.post("/login", async (req, res) => {
  const users = await search_value("olo_user", "user_name", req.body.name);
  const user = users && users.length == 1 ? users[0] : null;
  console.log("users are", user);

  try {
    if (await bcrypt.compare(req.body.password, user.user_password)) {
      const accessToken = generateToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      // console.log("hey", accessToken, refreshToken);
      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000, //15min
        path: "/",
        httpOnly: false, //true,
        secure: false, //true,
        sameSite: "none", //"strict",
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        path: "/refresh",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({
        message:
          "accessToken and refreshToken are generated and added to cookies",
      });

      // res.clearCookie("accessToken");
    } else {
      res
        .status(500)
        .json({ message: "User does not exist or incorrect password" });
    }
  } catch {
    res
      .status(500)
      .json({ message: "User does not exist or incorrect password" });
  }
});

//function: generate Token ==================================================
function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15h",
  });
}

app.listen(4000);
