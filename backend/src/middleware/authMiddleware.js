//function authenticateToken

import crypto from "crypto-js";
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const encrypted_token = authHeader && authHeader.split(" ")[1];
    const token = crypto.AES.decrypt(
      encrypted_token,
      process.env.CRYPTO_TOKEN_KEY
    ).toString(crypto.enc.Utf8);

    // console.log("token is", authHeader, encrypted_token, "and", token);
    if (token == null)
      return res.status(401).send("accessToken is not recieved");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log("user", user);
      if (err) return res.status(403).send(`unmatched accessToken ${err}`);
      req.user_name = user.user_name; //req.user
      next();
    });
  } catch {
    res.status(500).json({ message: "Authentication Error!" });
  }
};

//auth/uer accept muplitple accessToken
