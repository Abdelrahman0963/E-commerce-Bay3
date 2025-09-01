"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = () => {
    const router = useRouter();
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    return token;
};
