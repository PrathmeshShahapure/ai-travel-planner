"use client";

import { useEffect, useState } from "react";
import api from "../../lib/axios";
import TripCard from "../../components/TripCard";
import CreateTripSheet from "../../components/CreateTripSheet";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips");

        setTrips(response.data.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <ProtectedRoute>
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          AI Travel Planner
        </h1>

        <p className="mt-2 text-gray-500">
          Plan smarter. Travel safer.
        </p>
      </div>

      {/* Trips Section */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold">
          My Trips
        </h2>

        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center">
            No trips found.
          </div>
        ) : (
          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Create Button */}
      <button
        className="w-[60vw] fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black px-6
          py-4 text-white shadow-xl font-medium hover:cursor-pointer 
        "
        onClick={() => setIsOpen(true)}
      >
        ✈ Plan New Trip
      </button>
      <CreateTripSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
   onTripCreated={(newTrip) =>
    setTrips((prev) => [newTrip, ...prev])
  }
/>
    </main>
    </ProtectedRoute>
  );
}