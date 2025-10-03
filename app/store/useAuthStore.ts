"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  UserRank: string;
  token?: string | null;
};

type AuthState = AuthUser & {
  isLoggedIn: boolean;
  hydrated: boolean;
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
      UserRank: "",
      token: null,
      isLoggedIn: false,
      hydrated: false,
      login: (data) =>
        set(() => ({
          ...data,
          isLoggedIn: true,
        })),

      logout: () =>
        set(() => ({
          id: 0,
          username: "",
          email: "",
          UserRank: "",
          token: null,
          isLoggedIn: false,
        })),

      resetAuth: () =>
        set(() => ({
          id: 0,
          username: "",
          email: "",
          UserRank: "",
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
        UserRank: state.UserRank,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
      },
    }
  )
);
