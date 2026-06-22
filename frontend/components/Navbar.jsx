"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "../stores/authStore";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className=" mb-10 flex justify-between items-center border-b pb-4 border-gray-300">
      <div >
        <Link href="/dashboard">
          <h1 className="text-3xl font-bold">AI Travel Planner</h1>
        </Link>

        <p className="text-gray-500">Plan smarter. Travel safer.</p>
      </div>
    
      <button
        onClick={handleLogout}
        className=" rounded-xl  border px-4 py-2 hover:bg-gray-100 transition
          hover:cursor-pointer
        "
      >
        Logout
      </button>
  
    </div>
  );
}
