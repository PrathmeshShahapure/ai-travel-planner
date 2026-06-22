"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/axios";

export default function TripDetailsPage() {
  const params = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(
          `/trips/${params.id}`
        );

        setTrip(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10">
        Trip not found
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {trip.destination}
        </h1>

        <p className="mt-2 text-gray-500">
          {trip.days} Days • {trip.budgetType} Budget
        </p>
      </div>

      {/* Budget */}
      {trip.budgetEstimate && (
        <section className="mb-8 rounded-3xl border p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Budget Estimate
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <p>
              Flights: ₹
              {trip.budgetEstimate.flights}
            </p>

            <p>
              Accommodation: ₹
              {
                trip.budgetEstimate
                  .accommodation
              }
            </p>

            <p>
              Food: ₹
              {trip.budgetEstimate.food}
            </p>

            <p>
              Activities: ₹
              {
                trip.budgetEstimate
                  .activities
              }
            </p>

            <p className="font-bold">
              Total: ₹
              {trip.budgetEstimate.total}
            </p>
          </div>
        </section>
      )}

      {/* Hotels */}
      <section className="mb-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Recommended Hotels
        </h2>

        {trip.hotels?.length ? (
          <ul className="space-y-2">
            {trip.hotels.map(
              (hotel, index) => (
                <li key={index}>
                  • {hotel.name} (
                  {hotel.type})
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No hotels available.</p>
        )}
      </section>

      {/* Must Do */}
      <section className="mb-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Must Do Experiences
        </h2>

        {trip.mustDo?.length ? (
          <ul className="space-y-2">
            {trip.mustDo.map(
              (item, index) => (
                <li key={index}>
                  • {item}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No recommendations.</p>
        )}
      </section>

      {/* Travel Tips */}
      <section className="mb-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Travel Tips
        </h2>

        {trip.travelTips?.length ? (
          <ul className="space-y-2">
            {trip.travelTips.map(
              (tip, index) => (
                <li key={index}>
                  • {tip}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No travel tips.</p>
        )}
      </section>

      {/* Itinerary */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Itinerary
        </h2>

        <div className="space-y-6">
          {trip.itinerary?.map((day) => (
            <div
              key={day.day}
              className="rounded-3xl border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Day {day.day}
                </h3>

                <button
                  className="
                    rounded-xl
                    bg-black
                    px-4
                    py-2
                    text-white
                    text-sm
                  "
                >
                  Regenerate Day
                </button>
              </div>

              <ul className="space-y-2">
                {day.activities.map(
                  (
                    activity,
                    activityIndex
                  ) => (
                    <li
                      key={activityIndex}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        p-3
                      "
                    >
                      <span>
                        {activity}
                      </span>

                      <button
                        className="
                          text-red-500
                          text-sm
                        "
                      >
                        Remove
                      </button>
                    </li>
                  )
                )}
              </ul>

              <button
                className="
                  mt-4
                  rounded-xl
                  border
                  px-4
                  py-2
                  text-sm
                "
              >
                + Add Activity
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}