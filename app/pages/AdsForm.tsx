"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FaDeleteLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import { usePostNewAds } from "@/app/hooks/UseNewAds";
import { useAuthStore } from "../store/useAuthStore";
import { uploadImages } from "@/app/services/mediaService";

type AdFormData = {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  phone: string;
  images?: File[];
  statu?: "new" | "pending" | "rejected" | "accepted";
};

const AdsForm = () => {
  const { register, handleSubmit } = useForm<AdFormData>();
  const { mutate } = usePostNewAds();
  const userId = useAuthStore((s) => s.id);
  const t = useTranslations();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onSubmit = async (data: AdFormData) => {
    try {
      let imageIds: number[] = [];
      if (imageFiles.length > 0) {
        imageIds = await uploadImages(imageFiles);
      }

      const newAd = {
        ...data,
        user: userId, // بس كدا 👌
        images: imageIds,
      };

      mutate(newAd);
    } catch (err: any) {
      toast.error(err.message || "❌ حصل خطأ أثناء رفع الصور أو الإعلان.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      toast.error(t("adsform.imagelimit"));
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteImage = (index: number) => {
    URL.revokeObjectURL(images[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="container !mx-auto !py-16 md:!py-30 md:!px-6 !px-4">
      <div className="form w-full !p-6">
        <h2 className="text-3xl font-bold mb-4">{t("adsform.title")}</h2>

        <form
          className="flex flex-col gap-4 !py-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Product Name & Description */}
          <nav className="flex gap-4 flex-col md:flex-row items-center w-full">
            <nav className="flex flex-col gap-2 w-full">
              <label>{t("adsform.ProductName")}</label>
              <input
                type="text"
                placeholder={t("adsform.ProductName")}
                {...register("title", {
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
              <option value="phone">{t("adsform.category2")}</option>
              <option value="tablet">{t("adsform.category3")}</option>
              <option value="laptop">{t("adsform.category4")}</option>
              <option value="accessories">{t("adsform.category5")}</option>
            </select>

            {/* Upload Image */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
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
                    <FaDeleteLeft
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </nav>

          {/* Price & Location */}
          <div className="flex gap-4">
            <nav className="flex flex-col gap-2 w-full">
              <label>{t("adsform.price")}</label>
              <input
                type="number"
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
                {...register("location", { required: t("adsform.required") })}
                className="text-black !p-2 rounded-md border border-gray-300 w-full"
              />
            </nav>
          </div>

          {/* Phone */}
          <nav className="flex flex-col gap-2">
            <label>{t("adsform.phone")}</label>
            <input
              type="text"
              placeholder={t("adsform.phone")}
              {...register("phone", { required: t("adsform.required") })}
              className="text-black !p-2 rounded-md border border-gray-300 w-full"
            />
          </nav>

          <button
            type="submit"
            className="!mt-4 bg-blue-600 text-white !px-4 cursor-pointer !py-2 rounded"
          >
            {t("adsform.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdsForm;
