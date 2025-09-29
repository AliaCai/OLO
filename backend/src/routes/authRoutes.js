import express from "express";
import {
  all_users,
  email_verify,
  register,
  refresh,
  logout,
  login,
  user,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// app.use(cors({ origin: "http://localhost:3000", credentials: true })); //credentials for cookies -> remove for pord &&&

router.get("/all_users", all_users);
router.post("/email_verify", email_verify);
router.post("/register", register);
router.post("/refresh", refresh);
router.delete("/logout", logout);
router.post("/login", login);
router.use("/auth", authenticateToken);
router.get("/auth/user", user); //authenticate singler user

export default router;

