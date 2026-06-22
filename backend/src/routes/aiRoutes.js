import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateTrip } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate",authMiddleware,generateTrip);

export default router;