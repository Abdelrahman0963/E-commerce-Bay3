"use client";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/AuthService";
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
      const user = data.user;
      const jwt = data.jwt;

      if (!user || !jwt) {
        toast.error("بيانات تسجيل الدخول غير صالحة");
        return;
      }

      loginToStore({
        id: user.id,
        username: user.username,
        email: user.email,
        UserRank: user.UserRank, // ← سترينج مباشر زي "admin"
        token: jwt,
      });


      toast.success("✅ تم تسجيل الدخول بنجاح");
      router.push("/");
    },
    onError: (error: any) => {
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
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => register(username, email, password),
    onSuccess: () => {
      toast.success("🎉 تم إنشاء الحساب بنجاح");
      router.push("/login");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "❌ فشل التسجيل. تأكد من البيانات وحاول مرة أخرى.";
      toast.error(String(message));
    },
  });
};
