"use client";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/AuthService"; // ✅ هنا صح
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export const UseLogin = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      console.log("LOGIN SUCCESS DATA:", data);
      const user = data.user;
      const jwt = data.jwt;

      if (!user || !jwt) {
        toast.error("Invalid login response");
        return;
      }

      loginToStore({
        id: user.id,
        username: user.username,
        email: user.email,
        token: jwt,
      });

      toast.success("✅ Login successful!");
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة";
      toast.error(String(message));
    },
  });
};

export const UseRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ username, email, password }: {
      username: string;
      email: string;
      password: string;
    }) =>
      register(username, email, password),
    onSuccess: () => {
      toast.success("🎉 Account created successfully!");
      router.push("/login");
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
