import jwt from "jsonwebtoken";

//function: generate Token ==================================================
export const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15h",
  });
};
