import express from "express";
import { createTrip, getTrips, getTripById ,deleteTrip} from "../controllers/tripController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/",authMiddleware,getTrips);
router.get("/:id",authMiddleware,getTripById);
router.delete("/:id",authMiddleware,deleteTrip);
export default router;