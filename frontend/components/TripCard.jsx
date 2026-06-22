"use client";

import { useRouter } from "next/navigation";
import { MapPin, Calendar, Wallet } from "lucide-react";

export default function TripCard({ trip }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/trips/${trip._id}`)}
      className="cursor-pointer rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={18} />
        <h2 className="text-xl font-semibold">
          {trip.destination}
        </h2>
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

        <div>
          Planned Days: {trip.itinerary?.length || 0}
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-black py-3 text-white font-medium">
        View Trip →
      </button>
    </div>
  );
}