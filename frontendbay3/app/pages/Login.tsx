"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseLogin } from "../hooks/UseAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiArrowTrendingDown } from "react-icons/hi2";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLocale, setIsLocale] = useState("rtl");
  const [serverError, setServerError] = useState<string | null>(null);

  const t = useTranslations();

  useEffect(() => {
    setIsLocale(document.documentElement.dir);
  }, []);

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setServerError(null);
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          console.log("Login successful");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.error?.message || "Invalid email or password";
          setServerError(message);
          console.log("Login error:", error);
        },
      }
    );
  };

  return (
    <section className="container w-full h-full flex items-center justify-between !mx-auto !py-16 !px-10">
      <div className="login-logo md:block hidden relative">
        <HiArrowTrendingDown size={50} className="absolute top-[2rem] right-[8rem] z-10" />
        <h3 className="text-2xl font-bold !mb-4">{t("login.welcome")}</h3>
        <Image src="/logo.png" alt="logo" loading="lazy" width={400} height={400} />
      </div>
      <div className="form  !p-6 rounded-lg  border-2 border-gray-500 shadow-2xs">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2 ">
            <label htmlFor="email">{t("login.email")}</label>
            <input
              className="text-black border rounded-md !p-2 border-gray-300 w-full"
              type="text"
              placeholder="example@ex.com"
              {...register("email", {
                required: t("login.email"),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t("login.email_invalid"),
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password">{t("login.password")}</label>
            <nav className="flex  items-center relative">
              <input
                className="text-black !p-2 rounded-md border border-gray-300 w-full"
                type={showPassword ? "text" : "password"}
                placeholder={t("login.password")}
                {...register("password", {
                  required: t("login.password_required"),
                  minLength: {
                    value: 6,
                    message: t("login.password_min"),
                  },
                })}
              />
            </nav>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Server error */}
          {serverError && <div className="text-red-500 text-sm">{serverError}</div>}

          <button
            type="submit"
            className="bg-[var(--secondary-color)] text-white cursor-pointer !py-2 !px-4 rounded-lg"
          >
            {t("login.login")}
          </button>

          {/* Navigation */}
          <nav className="flex flex-col justify-between items-center">
            <span
              className="text-sm cursor-pointer text-[var(--secondary-color)] hover:text-[var(--primary-color)]"
            >
              {t("login.forgot")}
            </span>
            <Link className="cursor-pointer !p-2 border-t border-gray-300" href="/signup">
              <span
                className="text-[1rem] font-bold text-[var(--secondary-color)] cursor-pointer hover:text-[var(--primary-color)]"
              >
                {t("login.signup")}
              </span>
            </Link>
          </nav>
        </form>
      </div>
    </section>
  );
};

export default Login;
