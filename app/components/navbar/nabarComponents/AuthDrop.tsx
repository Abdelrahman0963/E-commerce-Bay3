import Link from 'next/link'
import React from 'react'
import { useAuthStore } from '@/app/store/useAuthStore'
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const AuthDrop = () => {
    const logout = useAuthStore((state) => state.logout);
    const username = useAuthStore((state) => state.username);
    const UserRank = useAuthStore((state) => state.UserRank);
    const [isMobile, setIsMobile] = React.useState(false);

    const router = useRouter();
    const t = useTranslations();
    const handelLogout = () => {
        logout();
        router.push("/");
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1023);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const initials = username
        ? username
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";

    return (
        <div className="flex flex-col w-full md:w-auto items-center justify-center bg-white md:drop-shadow-xl rounded-lg !p-4 md:absolute md:top-20  z-50">
            <nav className={`md:flex items-center justify-end gap-1 cursor-pointer !pb-5 ${isMobile ? "hidden" : ""}`}>
                <strong className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--user-color)] text-[var(--primary-color)] border-2 flex-none border-gray-500 text-[1.8rem]">
                    {initials}
                </strong>
                <nav className="flex flex-col items-start justify-end">
                    <span className="text-black">{t("login.hiUser")}</span>
                    <h3 className="text-black">{username || "Guest"}</h3>
                </nav>
            </nav>
            <nav className="flex flex-col items-start justify-end gap-4 w-full border-t-2 border-gray-300 !pt-6">
                {UserRank === "admin" && (<Link href="/dashboard" className="text-black flex items-center gap-1 hover:text-[var(--primary-color)]">Dashboard</Link>)}
                <button
                    onClick={handelLogout}
                    className="text-black cursor-pointer hover:text-[var(--primary-color)]"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default AuthDrop;
