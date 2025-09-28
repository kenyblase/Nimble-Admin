import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,

      setAdmin: (data) => set({ admin: data }),
      clearAdmin: () => set({ admin: null }),

      loginSuccess: (adminData) =>
        set({ admin: adminData, isAuthenticated: true }),

      logout: () =>
        set({ admin: null, isAuthenticated: false }),
    }),
    { name: "admin-store" }
  )
);