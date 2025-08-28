import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseLogin } from "../hooks/UseAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLocale, setIsLocale] = useState("rtl");

  useEffect(() => {
    setIsLocale(document.documentElement.dir);
  }, []); // إضافة مصفوفة الاعتماديات هنا

  const t = useTranslations();
  type FormData = {
    email: string;
    password: string;
  };

  const { mutate: login } = UseLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setServerError(null); // نمسح أي Error قديم
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          console.log("Login successful");
        },
        onError: (error: any) => {
          // لو Strapi رجع خطأ بنعرضه للمستخدم
          if (error?.response?.data?.error?.message) {
            setServerError(error.response.data.error.message);
          } else {
            setServerError("Invalid email or password");
          }
          console.log("Login error:", error);
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-96 w-96 bg-white relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-6 gap-4"
      >
        <div className="flex flex-col gap-2 w-72">
          <label htmlFor="email">{t("login.email")}</label>
          <input
            className="text-black border border-gray-300 w-full"
            type="text"
            placeholder="example@ex.com"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message?.toString()}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 w-72">
          <label htmlFor="password">{t("login.password")}</label>
          <nav className="flex items-center relative">
            <input
              className="text-black border border-gray-300 w-full"
              type={showPassword ? "text" : "password"}
              placeholder={t("login.password")}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {showPassword ? (
              <FiEye className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`} onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <FiEyeOff className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`} onClick={() => setShowPassword(!showPassword)} />
            )}
          </nav>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>

        {/* Server error message */}
        {serverError && (
          <div className="text-red-500 text-sm">{serverError}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-[var(--primary-color)] text-white cursor-pointer !py-2 !px-4 rounded-lg"
        >
          Login
        </button>
        <nav className="flex justify-between items-center">
          <span className="text-sm cursor-pointer text-blue-600 hover:text-[var(--primary-color)]">{t("login.forgot")}</span>
          <span className="text-sm font-bold border-b-2 cursor-pointer hover:text-[var(--primary-color)]">{t("login.signup")}</span>
        </nav>
      </form>
    </div>
  );
};

export default Login;
