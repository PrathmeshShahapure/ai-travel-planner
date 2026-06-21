import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const {
      destination,
      days,
      budgetType,
      interests,
    } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      days,
      budgetType,
      interests,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTrips = async (req, res) => {
    try {
      const trips = await Trip.find({
        userId: req.user.id,
      });
  
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };