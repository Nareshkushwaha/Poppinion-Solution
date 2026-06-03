import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthed: boolean;
  email: string;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthed: false,
      email: "",
      login: (email) => set({ isAuthed: true, email }),
      logout: () => set({ isAuthed: false, email: "" }),
    }),
    { name: "poppinion-auth" }
  )
);
