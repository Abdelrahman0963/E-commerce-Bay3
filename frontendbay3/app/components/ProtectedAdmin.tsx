"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
    const { hydrated, isLoggedIn, UserRank } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!hydrated) return;

        if (!isLoggedIn) {
            router.replace("/login");
        } else if (UserRank !== "admin") {
            router.replace("/");
        }
    }, [hydrated, isLoggedIn, UserRank]);

    if (!hydrated || !isLoggedIn || UserRank !== "admin") return null;

    return <>{children}</>;
};

export default ProtectedAdmin;
