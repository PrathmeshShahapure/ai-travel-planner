import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: Array,
      default: [],
    },

    budgetEstimate: {
      type: Object,
      default: {},
    },

    hotels: {
      type: Array,
      default: [],
    },
    mustDo: {
        type: [String],
        default: [],
      },
      
      travelTips: {
        type: [String],
        default: [],
      },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;