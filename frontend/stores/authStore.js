import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,

  login: (token) => {
    localStorage.setItem("token", token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");

    if (token) {
      set({
        token,
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuthStore;