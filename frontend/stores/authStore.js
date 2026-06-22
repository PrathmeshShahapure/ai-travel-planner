import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  hasHydrated: false,

  login: (token) => {
    localStorage.setItem("token", token);

    set({
      token,
      isAuthenticated: true,
      hasHydrated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      isAuthenticated: false,
      hasHydrated: true,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");

    set({
      token,
      isAuthenticated: !!token,
      hasHydrated: true,
    });
  },
}));

export default useAuthStore;