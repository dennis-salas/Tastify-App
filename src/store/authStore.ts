import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  auth: boolean;
  email: string;
  password: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: false,
      email: "",
      password: "",

      login: (email, password) => {
        set({ auth: true, email, password });
      },

      logout: () => {
        set({ auth: false, email: "", password: "" });
      },
    }),
    {
      name: "authenticate-storage",
    }
  )
);
