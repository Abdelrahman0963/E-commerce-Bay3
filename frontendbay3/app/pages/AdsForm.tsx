"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";


const AdsForm = () => {
    const { register, handleSubmit } = useForm();
    const t = useTranslations();
    const [images, setImages] = useState<string[]>([]);

    const onSubmit = (data: any) => {
        console.log(data);
        console.log("Uploaded images:", images);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        if (files.length + images.length > 5) {
            toast.error(t("adsform.imagelimit"));
            return;
        }

        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...newImages]);
    };

    const handleDeleteImage = (index: number) => {
        URL.revokeObjectURL(images[index]);
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    return (
        <section className="container !mx-auto !py-10">
            <div className="form w-full !p-6">
                <h2 className="text-3xl font-bold mb-4">{t("adsform.title")}</h2>
                <form
                    className="flex flex-col gap-4 !py-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Product Name & Description */}
                    <nav className="flex gap-4 flex-col md:flex-row items-center  w-full">
                        <nav className="flex flex-col gap-2 w-full">
                            <label>{t("adsform.ProductName")}</label>
                            <input
                                type="text"
                                placeholder={t("adsform.ProductName")}
                                {...register("productName", {
                                    required: t("adsform.required"),
                                    minLength: {
                                        value: 4,
                                        message: t("adsform.min"),
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: t("adsform.max"),
                                    },
                                })}
                                className="text-black !p-2 rounded-md border border-gray-300 w-full"
                            />
                        </nav>
                        <nav className="flex flex-col gap-2 w-full">
                            <label>{t("adsform.description")}</label>
                            <input
                                type="text"
                                placeholder={t("adsform.description")}
                                {...register("description", {
                                    required: t("adsform.required"),
                                    minLength: {
                                        value: 20,
                                        message: t("adsform.descmin"),
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: t("adsform.descmax"),
                                    },
                                })}
                                className="text-black !p-2 rounded-md border border-gray-300"
                            />
                        </nav>
                    </nav>
                    {/* Category */}
                    <nav className="flex flex-col gap-2">
                        <label>{t("adsform.category")}</label>
                        <select
                            className="!p-2 rounded-md border border-gray-300 w-full"
                            {...register("category", { required: t("adsform.catrequired") })}
                        >
                            <option>{t("adsform.category1")}</option>
                            <option value="1">{t("adsform.category2")}</option>
                            <option value="2">{t("adsform.category3")}</option>
                            <option value="3">{t("adsform.category4")}</option>
                            <option value="4">{t("adsform.category5")}</option>
                        </select>

                        {/* Upload Image */}
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or
                                        drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Preview images */}
                        {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((src, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={src}
                                            alt={`preview-${index}`}
                                            className="w-full h-32 object-cover rounded-lg border"
                                        />
                                        <FaDeleteLeft onClick={() => handleDeleteImage(index)} className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                        )}

                    </nav>
                    <div className="flex gap-4">
                        <nav className="flex flex-col gap-2 w-full">
                            <label>{t("adsform.price")}</label>
                            <input
                                type="text"
                                placeholder={t("adsform.price")}
                                {...register("price", {
                                    required: t("adsform.required"),
                                    min: {
                                        value: 0,
                                        message: t("adsform.price"),
                                    },
                                })}
                                className="text-black !p-2 rounded-md border border-gray-300 w-full"
                            />
                        </nav>
                        <nav className="flex flex-col gap-2 w-full">
                            <label>{t("adsform.location")}</label>
                            <input
                                type="text"
                                placeholder={t("adsform.location")}
                                {...register("location", {
                                    required: t("adsform.required"),
                                })}
                                className="text-black !p-2 rounded-md border border-gray-300 w-full"
                            />
                        </nav>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <label>{t("adsform.phone")}</label>
                        <input
                            type="text"
                            placeholder={t("adsform.phone")}
                            {...register("phone", {
                                required: t("adsform.required"),
                            })}
                            className="text-black !p-2 rounded-md border border-gray-300 w-full"
                        />
                    </nav>
                    <button
                        type="submit"
                        className="!mt-4 bg-blue-600 text-white !px-4 !py-2 rounded"
                    >
                        {t("adsform.submit")}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AdsForm;
