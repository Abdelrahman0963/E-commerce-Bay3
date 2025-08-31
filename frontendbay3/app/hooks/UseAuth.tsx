"use client";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/AuthService";
import toast from "react-hot-toast";

// Login Hook
export const UseLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      toast.success("✅ Login successful!");
      // هنا ممكن تعمل redirect بعد النجاح
      window.location.href = "/";
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة";

      console.error("❌ Login failed:", message);
      toast.error(message); // 👈 بدل alert
    },
  });
};

// Register Hook
export const UseRegister = () => {
  return useMutation({
    mutationFn: ({ username, email, password }: {
      username: string;
      email: string;
      password: string;
    }) =>
      register(username, email, password),
    onSuccess: () => {
      toast.success("🎉 Account created successfully!");
      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error("❌ Register failed:", error?.response?.data || error.message);
      toast.error(
        error?.response?.data?.message ||
        "❌ فشل التسجيل. تأكد من البيانات وحاول مرة أخرى."
      );
    },
  });
};
