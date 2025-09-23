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
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    return <>{children}</>;
};

export default ProtectedAdmin;
