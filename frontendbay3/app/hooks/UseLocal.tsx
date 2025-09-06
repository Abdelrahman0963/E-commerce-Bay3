// hook/useLocalAds.tsx
"use client";
import { useEffect, useState } from "react";

type Ad = {
    title: string;
    description: string;
    price: number;
};

export function useLocal() {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("ads");
        if (saved) setAds(JSON.parse(saved));
    }, []);

    const addAd = (ad: Ad) => {
        const newAds = [...ads, ad];
        setAds(newAds);
        localStorage.setItem("ads", JSON.stringify(newAds));
    };

    return { ads, addAd };
}
