"use client"
import Image from 'next/image'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { UseRegister } from "../hooks/UseAuth";
import { HiArrowTrendingDown } from 'react-icons/hi2'
import { useTranslations } from 'next-intl'
import 'react-phone-number-input/style.css'

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { mutate: registerUser } = UseRegister();
    const t = useTranslations();
    const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        registerUser({ username: data.username, email: data.email, password: data.password });
    };

    return (
        <section className="container w-full h-full flex items-center justify-center md:justify-between  !mx-auto !py-26 md:!py-30 md:!px-0 !px-10">
            <div className="login-logo md:block hidden relative">
                <HiArrowTrendingDown size={50} className="absolute top-[2rem] left-[20rem] text-[var(--primary-color)] z-10" />
                <h3 className="text-2xl font-bold !mb-4">{t("signup.welcome2")}</h3>
                <Image src="/logo.png" alt="logo" loading="lazy" width={400} height={400} />
                <h4 className="text-2xl font-bold !mb-4">{t("signup.welcome3")}</h4>
            </div>

            <div className="form !p-6 rounded-lg border-2 border-gray-500 shadow-2xs">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <nav className="flex gap-4">
                        <nav className='flex flex-col'>
                            <label>{t("signup.username")}</label>
                            <input
                                type="text"
                                className="text-black border rounded-md !p-2 border-gray-300 w-full"
                                placeholder={t("signup.username")}
                                {...register("username", {
                                    required: t("signup.required"),
                                    minLength: {
                                        value: 4,
                                        message: t("signup.min"),
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)[a-zA-Z0-9_]{4,15}$/,
                                        message: t("signup.include"),
                                    },

                                })}
                            />
                            {errors.username?.message && (
                                <span className="text-red-500">{String(errors.username.message)}</span>
                            )}
                        </nav>
                        <nav className='flex flex-col'>
                            {/* Email */}
                            <label>{t("signup.email")}</label>
                            <input
                                type="email"
                                className="text-black border rounded-md !p-2 border-gray-300 w-full"
                                placeholder="example@domain.com"
                                {...register("email", {
                                    required: t("signup.Email-required"),
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: t("signup.Email-invalid"),
                                    },
                                })}
                            />
                            {errors.email?.message && (
                                <span className="text-red-500">{String(errors.email.message)}</span>
                            )}
                        </nav>
                    </nav>
                    {/* Password */}
                    <label>{t("signup.password")}</label>
                    <input
                        type="password"
                        className="text-black border rounded-md !p-2 border-gray-300 w-full"
                        placeholder={t("signup.password")}
                        {...register("password", {
                            required: t("signup.Password-required"),
                            minLength: {
                                value: 8,
                                message: t("signup.Password-min"),
                            },
                        })}
                    />
                    {errors.password?.message && (
                        <span className="text-red-500">{String(errors.password.message)}</span>
                    )}
                    {/* Confirm Password */}
                    <label>{t("signup.confirmPassword")}</label>
                    <input
                        type="password"
                        className="text-black border rounded-md !p-2 border-gray-300 w-full"
                        placeholder={t("signup.confirmPassword")}
                        {...register("confirmPassword", {
                            required: t("signup.ConfirmPassword-required"),
                            validate: (value) =>
                                value === watch("password") || t("signup.ConfirmPassword-match"),
                        })}
                    />
                    {errors.confirmPassword?.message && (
                        <span className="text-red-500">{String(errors.confirmPassword.message)}</span>
                    )}
                    {/* Submit */}
                    <button className="bg-[var(--secondary-color)] text-white cursor-pointer !py-2 !px-4 rounded-lg">
                        {t("signup.submit")}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default SignUp
