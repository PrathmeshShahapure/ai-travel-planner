import Trip from "../models/Trip.js";
import { generateTravelPlan } from "../services/groqService.js";

export const generateTrip = async (req, res) => {
  try {
    const {
      destination,
      days,
      budgetType,
      interests,
    } = req.body;

    const aiResponse = await generateTravelPlan(
      destination,
      days,
      budgetType,
      interests
    );

    const trip = await Trip.create({
      userId: req.user.id,

      destination,
      days,
      budgetType,
      interests,

      itinerary: aiResponse.itinerary,
      budgetEstimate: aiResponse.budgetEstimate,
      hotels: aiResponse.hotels,
      mustDo: aiResponse.mustDo,
      travelTips: aiResponse.travelTips,
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};