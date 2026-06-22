import Trip from "../models/Trip.js";
import { regenerateDayPlan } from "../services/groqService.js";
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

export const getTripById = async (req, res) => {
    try {
      const trip = await Trip.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!trip) {
        return res.status(404).json({
          message: "Trip not found",
        });
      }
  
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteTrip = async (req, res) => {
    try {
      const trip = await Trip.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!trip) {
        return res.status(404).json({
          message: "Trip not found",
        });
      }
  
      res.status(200).json({
        message: "Trip deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const addActivity = async (req, res) => {
    try {
      const { day, activity } = req.body;
  
      const trip = await Trip.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!trip) {
        return res.status(404).json({
          message: "Trip not found",
        });
      }
  
      const dayPlan = trip.itinerary.find(
        (item) => item.day === day
      );
  
      if (!dayPlan) {
        return res.status(404).json({
          message: "Day not found",
        });
      }
  
      dayPlan.activities.push(activity);
      trip.markModified("itinerary");
      await trip.save();
  
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
export const removeActivity = async (req, res) => {
    try {
      const { day, activity } = req.body;
  
      const trip = await Trip.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!trip) {
        return res.status(404).json({
          message: "Trip not found",
        });
      }
  
      const dayPlan = trip.itinerary.find(
        (item) => item.day === day
      );
  
      if (!dayPlan) {
        return res.status(404).json({
          message: "Day not found",
        });
      }
  
      dayPlan.activities = dayPlan.activities.filter(
        item => item !== activity
      );
      trip.markModified("itinerary");
      await trip.save();
  
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
export const regenerateDay = async (req, res) => {
    try {
      const { day, instruction } = req.body;
  
      const trip = await Trip.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      const dayPlan = trip.itinerary.find(
        item => item.day === day
      );
  
      const aiResponse = await regenerateDayPlan(
        trip.destination,
        day,
        instruction
      );
  
      dayPlan.activities = aiResponse.activities;
  
      trip.markModified("itinerary");
   console.log(dayPlan);
      await trip.save();
  
      res.status(200).json(trip);
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };