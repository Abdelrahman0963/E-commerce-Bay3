import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { UseRegister } from '../hooks/UseAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLocale, setIsLocale] = useState("rtl");
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        setIsLocale(document.documentElement.dir);
    }, []);

    const t = useTranslations();

    type FormData = {
        username: string;
        email: string;
        password: string;
        phone: string;
    };

    const { mutate: register, isPending, isError } = UseRegister();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setServerError(null);
        register(
            {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.password,
                phone: data.phone,
            },
            {
                onSuccess: () => {
                    console.log("Registration successful");
                },
                onError: (error: any) => {
                    if (error?.response?.data?.error?.message) {
                        setServerError(error.response.data.error.message);
                    } else {
                        setServerError("حدث خطأ أثناء التسجيل");
                    }
                    console.log("Registration error:", error);
                },
            }
        );
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-6 gap-4"
            >
                {/* Username */}
                <div className="flex flex-col gap-2 w-72">
                    <label htmlFor="username">{t("signup.username")}</label>
                    <input
                        className="text-black border border-gray-300 w-full"
                        type="text"
                        placeholder={t("signup.username")}
                        {...formRegister("username", {
                            required: "اسم المستخدم مطلوب",
                        })}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message?.toString()}
                        </span>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 w-72">
                    <label htmlFor="email">{t("signup.email")}</label>
                    <input
                        className="text-black border border-gray-300 w-full"
                        type="text"
                        placeholder="example@ex.com"
                        {...formRegister("email", {
                            required: "البريد الإلكتروني مطلوب",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "صيغة البريد غير صحيحة",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message?.toString()}
                        </span>
                    )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2 w-72">
                    <label htmlFor="phone">{t("signup.phone")}</label>
                    <input
                        className="text-black border border-gray-300 w-full"
                        type="text"
                        placeholder="01012345678"
                        {...formRegister("phone", {
                            required: "رقم الهاتف مطلوب",
                            pattern: {
                                value: /^[0-9]{10,11}$/,
                                message: "رقم الهاتف غير صالح",
                            },
                        })}
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm">
                            {errors.phone.message?.toString()}
                        </span>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2 w-72">
                    <label htmlFor="password">{t("signup.password")}</label>
                    <nav className="flex items-center relative">
                        <input
                            className="text-black border border-gray-300 w-full"
                            type={showPassword ? "text" : "password"}
                            placeholder={t("signup.password")}
                            {...formRegister("password", {
                                required: "كلمة المرور مطلوبة",
                                minLength: {
                                    value: 6,
                                    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
                                },
                            })}
                        />
                        {showPassword ? (
                            <FiEye
                                className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FiEyeOff
                                className={`absolute cursor-pointer ${isLocale === "rtl" ? "left-2" : "right-2"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </nav>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message?.toString()}
                        </span>
                    )}
                </div>

                {/* Server error */}
                {serverError && (
                    <div className="text-red-500 text-sm">{serverError}</div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-[var(--primary-color)] text-white cursor-pointer !py-2 !px-4 rounded-lg"
                >
                    {t("signup.submit")}
                </button>

                <nav className="flex justify-between items-center">
                    <span className="text-sm cursor-pointer text-blue-600 hover:text-[var(--primary-color)]">
                        {t("signup.login")}
                    </span>
                    <span className="text-sm font-bold border-b-2 cursor-pointer hover:text-[var(--primary-color)]">
                        {t("signup.signup")}
                    </span>
                </nav>
            </form>
        </div>
    );
};

export default SignUp;
