import express from "express";
import { createTrip, getTrips, getTripById } from "../controllers/tripController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/",authMiddleware,getTrips);
router.get("/:id",authMiddleware,getTripById);

export default router;