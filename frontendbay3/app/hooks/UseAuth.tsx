"use client";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/AuthService";

// Login Hook
export const UseLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || // الرسالة من API
        error?.response?.data ||          // في حالة API رجع نص مباشر
        "البريد الإلكتروني أو كلمة المرور غير صحيحة";

      console.error("❌ Login failed:", message);
      alert(message);
    },
  });
};
// Register Hook
export const UseRegister = () => {
  return useMutation({
    mutationFn: ({ username, email, password, confirmPassword, phone }: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      phone: string;
    }) =>
      register(username, email, password, confirmPassword, phone),
    onError: (error: any) => {
      console.error("❌ Register failed:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "فشل التسجيل. تأكد من البيانات وحاول مرة أخرى.");
    },
  });
};
