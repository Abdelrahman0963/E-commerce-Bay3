"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  token?: string | null;
};

type AuthState = AuthUser & {
  isLoggedIn: boolean;
  hydrated: boolean; // flag for rehydrate
};

type AuthActions = {
  login: (data: AuthUser) => void;
  logout: () => void;
  resetAuth: () => void;
  _setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      id: 0,
      username: "",
      email: "",
      token: null,
      isLoggedIn: false,
      hydrated: false,

      login: (data) =>
        set((s) => ({
          ...s,
          ...data,
          isLoggedIn: true,
        })),

      logout: () =>
        set(() => ({
          id: 0,
          username: "",
          email: "",
          token: null,
          isLoggedIn: false,
        })),

      resetAuth: () =>
        set(() => ({
          id: 0,
          username: "",
          email: "",
          token: null,
          isLoggedIn: false,
        })),

      _setHydrated: (v: boolean) => set(() => ({ hydrated: v })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        id: state.id,
        username: state.username,
        email: state.email,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        // called when rehydrate finishes
        state?._setHydrated(true);
      },
    }
  )
);
