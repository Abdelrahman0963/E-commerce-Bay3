"use client";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/AuthService";

// Login Hook
export const UseLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onError: (error: any) => {
      console.error("❌ Login failed:", error);
    },
  });
};

// Register Hook
export const UseRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      register(email, password),
    onError: (error: any) => {
      console.error("❌ Register failed:", error);
    },
  });
};
