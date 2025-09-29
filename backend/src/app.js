import dotenv from "../src/services/dotenvLoad.js"; //not use regular ones bc need to load it first
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventroutes from "./routes/eventRoutes.js";
import "./services/igQuery.js";

const app = express();
app.use(express.json());
app.use(cookieParser()); //for authController.js

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/test", (req, res) => {
  console.log("hey...");
  res.json("test basic backend");
});

app.use("/api", authRoutes);
app.use("/api/event", eventroutes);

app.listen(4000, () => {
  console.log("run on port 4000");
});
