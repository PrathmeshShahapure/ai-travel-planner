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
    isAuthenticated, hasHydrated,
  } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (
      hasHydrated &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }
  }, [
    hasHydrated,
    isAuthenticated,
    router,
  ]);

  if (!hasHydrated) {
    return (
      <div className="p-10 flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return children;
}