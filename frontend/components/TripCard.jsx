"use client";

import { useRouter } from "next/navigation";
import { MapPin, Calendar, Wallet } from "lucide-react";

export default function TripCard({ trip }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/trips/${trip._id}`)}
      className=" rounded-xl border border-white/10
  bg-white p-6  shadow-[0_20px_50px_rgba(8,_15,_52,_0.08)] transition-all
  hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(8,_15,_52,_0.12)] hover:border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={18} />
        <h2 className="text-xl font-semibold">{trip.destination}</h2>
      </div>

      <div className="space-y-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{trip.days} Days</span>
        </div>

        <div className="flex items-center gap-2">
          <Wallet size={16} />
          <span>{trip.budgetType} Budget</span>
        </div>

        <div>Planned Days: {trip.itinerary?.length || 0}</div>
      </div>

      <button className="mt-6 w-full cursor-pointer rounded-xl bg-black py-3 text-white font-medium">
        View Trip →
      </button>
    </div>
  );
}
