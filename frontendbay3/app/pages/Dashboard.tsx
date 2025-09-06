"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAdsStore } from "../store/useAdsStore";

const Dashboard = () => {
    const pathname = usePathname();
    const ads = useAdsStore((s) => s.ads);
    const updateStatus = useAdsStore((s) => s.updateAdStatus);
    const [tab, setTab] = useState<"all" | "new" | "pending" | "rejected">("all");

    const filtered = tab === "all" ? ads : ads.filter((a) => a.status === tab);
    type Ad = {
        id: string;
        title: string;
        description?: string;
        price?: number;
        category?: string;
        location?: string;
        phone?: string;
        status: string;
        user?: { id?: number | string; username?: string };
        username?: string;
        createdAt: string;
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            const element = document.getElementById("header");
            const footer = document.getElementById("footer");
            if (pathname.endsWith("/dashboard") && element && footer) {
                element.style.display = "none";
                footer.style.display = "none";
            } else if (element && footer) {
                element.style.display = "flex";
                footer.style.display = "flex";
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <section className="h-screen w-full  flex flex-col gap-4 items-center bg-[var(--dashboard-color)] !py-26 md:!py-30 md:!px-6 !px-4">
            <div className="w-full bg-[var(--dashboard2-color)] !mt-14 rounded-2xl">
                <div className="!p-6 w-full">
                    <h1 className="text-2xl text-white font-medium !mb-4">Products</h1>

                    <div className="flex items-center justify-center gap-3 !mb-6">
                        {(["all", "new", "pending", "rejected"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`!px-4 !py-2 rounded ${tab === t ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-200"}`}
                            >
                                {t === "all" ? "All Ads" : t === "new" ? "New Ads" : t === "pending" ? "Pending Ads" : "Rejected Ads"}
                            </button>
                        ))}
                    </div>

                    <table className="w-full table-auto bg-transparent flex flex-col ">
                        <thead>
                            <tr className="text-left border-b w-full flex items-center text-white justify-between">
                                <th className="!px-3 !py-2">Title</th>
                                <th className="!px-3 !py-2">User</th>
                                <th className="!px-3 !py-2">Date</th>
                                <th className="!px-3 !py-2">Status</th>
                                <th className="!px-3 !py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((ad: Ad) => (
                                <tr key={ad.id} className="border-b w-full text-white !py-2 flex items-center justify-between ">
                                    <td className="!px-3 !py-2">{ad.title}</td>
                                    <td className="!px-3 !py-2">{ad.user?.username ?? "—"}</td>
                                    <td className="!px-3 !py-2">{new Date(ad.createdAt).toLocaleString()}</td>
                                    <td className="!px-3 !py-2">{ad.status}</td>
                                    <td className="!px-3 !py-2">
                                        {/* أزرار تغيير الحالة */}
                                        <button onClick={() => updateStatus(ad.id, "pending")} className="!mr-2 btn">Pending</button>
                                        <button onClick={() => updateStatus(ad.id, "rejected")} className="!mr-2 btn">Reject</button>
                                        <button onClick={() => updateStatus(ad.id, "active")} className="btn">Approve</button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={5} className="!p-6 text-center text-gray-400">No ads yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    );
};

export default Dashboard;
