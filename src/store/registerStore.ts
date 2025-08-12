import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterState = {
  name: string;
  firstName: string;
  email: string;
  password1: string;
  password2: string;
  terms: boolean;
  sendRegister: (
    name: string,
    firstName: string,
    email: string,
    password1: string,
    password2: string,
    terms: boolean
  ) => void;
};

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      name: "",
      firstName: "",
      email: "",
      password1: "",
      password2: "",
      terms: false,

      sendRegister: (name, firstName, email, password1, password2, terms) => {
        set({ name, firstName, email, password1, password2, terms });
      },
    }),
    {
      name: "register-storage", // clave para localStorage
    }
  )
);
