//express, bcrypt, jwt

/*
bcrypt: hash, compare (async)
jwt: sign, verify
*/

import bcrypt from "bcrypt";
import crypto from "crypto-js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "../config/pool.js";
import { search_value } from "../config/db_actions.js";
import { generateToken } from "../services/authService.js";
// const cors = require("cors");
let register_users = {};

//cors
// app.use(cors({ origin: "http://localhost:3000", credentials: true })); //credentials for cookies -> remove for pord &&&

const users = [];
let refreshTokens = []; //store the encrypted refreshToken
//user:name, password

export const all_users = (req, res) => {
  res.json({ users });
};

//send verfication code ==================================================
export const email_verify = async (req, res) => {
  const users = await search_value("olo_user", "user_email", req.body.email);
  if (users.length >= 1)
    return res
      .status(500)
      .json({ message: `${req.body.email} is registered already` });

  let verification_code =
    Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  register_users[req.body.email] = { verification_code: verification_code };
  //   console.log("hey---");

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
};

//post users <-name and password given
//sign in ==================================================
export const register = async (req, res) => {
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
};

//TOKEN  => take referesh token , generate 1 accessToken
//refresh token ==================================================
export const refresh = (req, res) => {
  try {
    const encrypted_refreshToken = req.body.refreshToken;

    console.log(encrypted_refreshToken);
    const refreshToken = crypto.AES.decrypt(
      encrypted_refreshToken,
      process.env.CRYPTO_TOKEN_KEY
    ).toString(crypto.enc.Utf8);

    // console.log("before decryption token", encrypted_refreshToken);
    // console.log("decrypted refreshtoken is", refreshToken);

    if (refreshToken == null) res.status(401).send("no refresh token");
    // console.log("---refreshTokens", refreshTokens);
    if (!refreshTokens.includes(refreshToken)) res.status(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) res.status(403).send("refreshToken isn't matched");
      const accessToken = generateToken(user);

      const encrypted_at = crypto.AES.encrypt(
        accessToken,
        process.env.CRYPTO_TOKEN_KEY
      ).toString();

      res.clearCookie("accessToken", {
        maxAge: 15 * 60 * 1000, //15min
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.cookie("accessToken", encrypted_at, {
        maxAge: 15 * 60 * 1000, //15min
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      console.log("---encrypted_at", res.cookie("accessToken"));

      res.status(200).json({ accessToken: encrypted_at });
    });
  } catch (err) {
    res.status(500).json({ message: `Refresh Error! ${err}` });
  }
};

//LOGOUT => take refresh token, remove it
//user logs out ==================================================
export const logout = (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  res.status(200).json({ message: "user logs out" });
};

//LOGIN.  identify user in users => create 2 accessTokens
//user log in ==================================================
export const login = async (req, res) => {
  const users = await search_value("olo_user", "user_name", req.body.name);
  const user = users && users.length == 1 ? users[0] : null;
  console.log("users are", user);

  try {
    if (await bcrypt.compare(req.body.password, user.user_password)) {
      const accessToken = generateToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const encrypted_at = crypto.AES.encrypt(
        accessToken,
        process.env.CRYPTO_TOKEN_KEY
      ).toString();

      const encrypted_rf = crypto.AES.encrypt(
        refreshToken,
        process.env.CRYPTO_TOKEN_KEY
      ).toString();
      refreshTokens.push(encrypted_rf);

      res.cookie("accessToken", encrypted_at, {
        maxAge: 15 * 60 * 1000, //15min
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.cookie("refreshToken", encrypted_rf, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        path: "/refresh",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      console.log("encrypted_at----", encrypted_at);
      console.log("encrypted_rf----", encrypted_rf);

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
};

//authenticate single user---------------------------
const posts = [
  { name: "alia", moreInfo: "123456Chy!" },
  { name: "murphy", moreInfo: "passworddd" },
];
//get posts
export const user = (req, res) => {
  res.json(posts.filter((post) => post.name === req.user_name));
};
