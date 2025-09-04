"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = () => {
    const router = useRouter();
    const { token, hydrated } = useAuthStore();

    useEffect(() => {
        if (!hydrated) return;

        if (!token) {
            router.push("/login");
        }
    }, [token, hydrated, router]);

    return hydrated ? token : null;
};
