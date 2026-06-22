"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../lib/axios";

export default function CreateTripSheet({
  isOpen,
  onClose,
  onTripCreated,
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: "",
      days: 1,
      budgetType: "Medium",
      interests: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        destination: data.destination,
        days: Number(data.days),
        budgetType: data.budgetType,
        interests: data.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await api.post(
        "/ai/generate",
        payload
      );

      onTripCreated(response.data);

      reset();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Bottom Sheet */}
      <div
        className="
         mx-auto
         max-w-4xl
          fixed
          bottom-0
          left-0
          right-0
          z-50
          h-[70vh]
          rounded-t-3xl
          bg-white
          border-t
          shadow-2xl
          overflow-hidden
          p-6
        "
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">
            ✈ Plan New Trip
          </h2>

          <p className="text-gray-500 mb-6">
            Let AI create your travel itinerary.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Destination */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Destination
              </label>

              <input
                type="text"
                placeholder="Goa"
                {...register("destination", {
                  required: "Destination is required",
                })}
                className="w-full rounded-xl border p-3 outline-none"
              />

              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.destination.message}
                </p>
              )}
            </div>

            {/* Days */}
            <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium">
                Number of Days
              </label>

              <input
                type="number"
                min="1"
                max="8"
                {...register("days", {
                  required: "Days are required",
                  min: {
                    value: 1,
                    message: "Minimum 1 day",
                  },
                  max: {
                    value: 8,
                    message: "Maximum 8 days",
                  },
                })}
                className="w-full rounded-xl border p-3 outline-none"
              />

              {errors.days && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.days.message}
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium">
                Budget Type
              </label>

              <select
                {...register("budgetType")}
                className="w-full rounded-xl border p-3"
              >
                <option value="Low">Low</option>
                <option value="Medium">
                  Medium
                </option>
                <option value="High">High</option>
              </select>
            </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Interests
              </label>

              <input
                type="text"
                placeholder="Food, Culture, Adventure"
                {...register("interests", {
                  required: "Interests are required",
                })}
                className="w-full rounded-xl border p-3 outline-none"
              />

              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interests.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-black
                py-3
                text-white
                font-medium
                disabled:opacity-50
              "
            >
              {loading
                ? "Generating Trip..."
                : "Generate Trip"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}