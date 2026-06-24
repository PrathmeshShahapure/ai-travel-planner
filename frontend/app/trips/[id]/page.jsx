"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/axios";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Loader2, Trash2 } from "lucide-react";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newActivity, setNewActivity] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAddActivity = async (dayNumber) => {
    if (!newActivity.trim()) return;

    try {
      await api.patch(`/trips/${trip._id}/add-activity`, {
        day: dayNumber,
        activity: newActivity,
      });

      setTrip((prev) => ({
        ...prev,
        itinerary: prev.itinerary.map((day) =>
          day.day === dayNumber
            ? {
                ...day,
                activities: [...day.activities, newActivity],
              }
            : day,
        ),
      }));

      setNewActivity("");
      setSelectedDay(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveActivity = async (dayNumber, activity) => {
    try {
      await api.delete(`/trips/${trip._id}/remove-activity`, {
        data: {
          day: dayNumber,
          activity,
        },
      });

      setTrip((prev) => ({
        ...prev,
        itinerary: prev.itinerary.map((day) =>
          day.day === dayNumber
            ? {
                ...day,
                activities: day.activities.filter((item) => item !== activity),
              }
            : day,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegenerateDay = async (dayNumber) => {
    try {
      const response = await api.patch(`/trips/${trip._id}/regenerate-day`, {
        day: dayNumber,
      });

      const regeneratedDay = response.data;

      setTrip((prev) => ({
        ...prev,
        itinerary: prev.itinerary.map((day) =>
          day.day === dayNumber ? regeneratedDay : day,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTrip = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/trips/${trip._id}`);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${params.id}`);

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
      <div className="p-10 min-h-screen flex items-center justify-center">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10 min-h-screen flex items-center justify-center">
        Trip not found
      </div>
    );
  }

  return (
    <main className="mx-auto px-4 py-10">
      <Navbar />
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{trip.destination}</h1>

        <p className="mt-2 text-gray-500">
          {trip.days} Days • {trip.budgetType} Budget
        </p>
      </div>

      {/* Itinerary */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Itinerary</h2>

        <div className="space-y-6">
          {trip.itinerary?.map((day, index) => (
            <div key={`${day.day}-${index}`} className="rounded-3xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Day {day.day}</h3>

                <button
                  onClick={() => handleRegenerateDay(day.day)}
                  className=" rounded-xl bg-black px-4  py-2  text-white  text-sm  hover:cursor-pointer"
                >
                  Regenerate Day
                </button>
              </div>

              <ul className="space-y-2">
                {day.activities?.map((activity, activityIndex) => (
                  <li
                    key={activityIndex}
                    className="   flex   items-center  justify-between
                        rounded-xl  border p-3
                      "
                  >
                    <span>{activity}</span>

                    <button
                      onClick={() => handleRemoveActivity(day.day, activity)}
                      className=" text-red-500  text-sm cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                {selectedDay === day.day ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="New Activity"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      className="  flex-1  rounded-xl    border  p-2  "
                    />

                    <button
                      onClick={() => handleAddActivity(day.day)}
                      className=" rounded-xl   bg-black  px-4  text-white "
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedDay(day.day)}
                    className=" rounded-xl border px-4py-2  text-sm  hover:cursor-pointer"
                  >
                    + Add Activity
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section className="my-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">Recommended Hotels</h2>

        {trip.hotels?.length ? (
          <ul className="space-y-2">
            {trip.hotels.map((hotel, index) => (
              <li key={index}>
                • {hotel.name} ({hotel.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels available.</p>
        )}
      </section>

      {/* Must Do */}
      <section className="mb-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">Must Do Experiences</h2>

        {trip.mustDo?.length ? (
          <ul className="space-y-2">
            {trip.mustDo.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations.</p>
        )}
      </section>

      {/* Travel Tips */}
      <section className="mb-8 rounded-3xl border p-6">
        <h2 className="text-2xl font-semibold mb-4">Travel Tips</h2>

        {trip.travelTips?.length ? (
          <ul className="space-y-2">
            {trip.travelTips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        ) : (
          <p>No travel tips.</p>
        )}
      </section>

      {/* Budget */}
      {trip.budgetEstimate && (
        <section className="mb-8 rounded-3xl border p-6">
          <h2 className="text-2xl font-semibold mb-4">Budget Estimate</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <p>Flights: ₹{trip.budgetEstimate.flights}</p>

            <p>Accommodation: ₹{trip.budgetEstimate.accommodation}</p>

            <p>Food: ₹{trip.budgetEstimate.food}</p>

            <p>Activities: ₹{trip.budgetEstimate.activities}</p>

            <p className="font-bold">Total: ₹{trip.budgetEstimate.total}</p>
          </div>
        </section>
      )}

      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={handleDeleteTrip}
          className=" rounded-xl bg-black px-4  py-2  text-white  hover:cursor-pointer
    "> Delete Trip
        </button>
      
      </div>
    </main>
  );
}
