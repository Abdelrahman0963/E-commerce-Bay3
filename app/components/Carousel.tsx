"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type ImageType = {
    url: string;
};

type CarouselProps = {
    images: ImageType[];
};

export default function Carousel({ images }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative w-full mx-auto border border-gray-300 !p-4 rounded-lg">
            <div className="h-96 overflow-hidden rounded-lg relative">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={`http://localhost:1337${image.url}`}
                        alt="product image"
                        width={600}
                        height={600}
                        className={`object-contain w-full h-full transition-opacity duration-500 ${index === current ? "opacity-100" : "opacity-0 absolute top-0 left-0"}`}
                    />
                ))}
            </div>
            {images.length > 1 && <button
                onClick={prev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white !px-2 !py-1 rounded-full cursor-pointer"
            >
                <IoIosArrowBack />
            </button>}
            {images.length > 1 && <button
                onClick={next}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white !px-2 !py-1 rounded-full cursor-pointer"
            >
                <IoIosArrowForward />
            </button>}

        </div>
    );
}
