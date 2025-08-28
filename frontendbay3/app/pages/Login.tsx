import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseLogin } from "../hooks/UseAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslations } from "next-intl";
import SignUp from "../components/SignUp";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLocale, setIsLocale] = useState("rtl");
  const [serverError, setServerError] = useState<string | null>(null);

  const t = useTranslations();

  useEffect(() => {
    setIsLocale(document.documentElement.dir);
  }, []);

  const toggleSignUp = () => setIsOpen((prev) => !prev);

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
    <div className="flex justify-center items-center h-96 w-96 bg-white relative">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2 w-72">
          <label htmlFor="email">{t("login.email")}</label>
          <input
            className="text-black border border-gray-300 w-full"
            type="text"
            placeholder="example@ex.com"
            {...register("email", {
              required: t("login.email_required"),
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
        <div className="flex flex-col gap-2 w-72">
          <label htmlFor="password">{t("login.password")}</label>
          <nav className="flex items-center relative">
            <input
              className="text-black border border-gray-300 w-full"
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
            {showPassword ? (
              <FiEye
                className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`}
                onClick={() => setShowPassword(true)}
              />
            )}
          </nav>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Server error */}
        {serverError && <div className="text-red-500 text-sm">{serverError}</div>}

        {/* Submit */}
        <button
          type="submit"
          className="bg-[var(--primary-color)] text-white cursor-pointer !py-2 !px-4 rounded-lg"
        >
          {t("login.login")}
        </button>

        {/* Navigation */}
        <nav className="flex justify-between items-center">
          <span
            onClick={toggleSignUp}
            className="text-sm cursor-pointer text-blue-600 hover:text-[var(--primary-color)]"
          >
            {t("login.forgot")}
          </span>
          <span
            onClick={toggleSignUp}
            className="text-sm font-bold border-b-2 cursor-pointer hover:text-[var(--primary-color)]"
          >
            {t("login.signup")}
          </span>
        </nav>
      </form>

      {isOpen && (
        <div className="absolute z-30 top-[350%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default Login;
