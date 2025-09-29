import express from "express";
import { all_events } from "../controllers/eventController.js";

const router = express.Router();
router.get("/list", all_events);

export default router;
