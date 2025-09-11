"use client";
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaDeleteLeft } from 'react-icons/fa6';
import { usePostNewImages } from '@/app/hooks/UseNewAds';
const FormImage = (image: any) => {
    const [images, setImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const { mutate } = usePostNewImages();
    const t = useTranslations();
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
        <>
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
        </>
    )
}

export default FormImage
