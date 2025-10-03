"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const hideHeaderFooter = pathname.includes("/dashboard");

    return (
        <html lang="en">
            <body>
                {!hideHeaderFooter && <Navbar />}
                <main>{children}</main>
                {!hideHeaderFooter && <Footer />}
            </body>
        </html>
    );
}
