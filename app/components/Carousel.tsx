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
        <div className="relative w-full max-w-lg mx-auto">
            <div className="h-96 overflow-hidden rounded-lg relative">
                <Image
                    src={`http://localhost:1337${images[current].url}`}
                    alt="product image"
                    width={600}
                    height={600}
                    className="object-contain w-full h-full"
                />
            </div>
            <button
                onClick={prev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white !px-2 !py-1 rounded-full cursor-pointer"
            >
                <IoIosArrowBack />
            </button>
            <button
                onClick={next}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white !px-2 !py-1 rounded-full cursor-pointer"
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
}
