import express from "express";
import { createTrip, getTrips, getTripById,deleteTrip,
 addActivity, removeActivity  } from "../controllers/tripController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/",authMiddleware,getTrips);
router.get("/:id",authMiddleware,getTripById);
router.delete("/:id",authMiddleware,deleteTrip);
router.patch("/:id/add-activity",authMiddleware,addActivity);
router.delete("/:id/remove-activity",authMiddleware,removeActivity);
export default router;