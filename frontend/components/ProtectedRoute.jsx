"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/authStore";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();

  const {
    hydrate,
    isAuthenticated,
  } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="p-10 flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return children;
}