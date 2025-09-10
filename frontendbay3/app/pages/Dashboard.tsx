"use client";
import React, { useState } from "react";
import { useGetNewAds } from "@/app/hooks/UseNewAds";
import { BiSolidShow } from "react-icons/bi";

type Ad = {
    id: string;
    title: string;
    description?: string;
    price?: number;
    category?: string;
    location?: string;
    phone?: string;
    images?: string[];
    status: "new" | "pending" | "rejected" | string;
    user?: { id?: number | string; email?: string };
    email?: string;
    createdAt: string;
};

const Dashboard = () => {
    const { newads: ads, isLoading, isError, error } = useGetNewAds();
    const [activeTab, setActiveTab] = useState<"all" | "new" | "pending" | "rejected">("all");

    const tabs: Array<"all" | "new" | "pending" | "rejected"> = ["all", "new", "pending", "rejected"];

    const filteredAds: Ad[] =
        activeTab === "all"
            ? Array.isArray(ads) ? ads : []
            : Array.isArray(ads)
                ? ads.filter((ad) => ad.status === activeTab)
                : [];

    return (
        <section className="min-h-screen w-full flex flex-col gap-4 items-center bg-[var(--dashboard-color)] !py-10 !px-4 md:!px-6">
            <div className="w-full bg-[var(--dashboard2-color)] !mt-14 rounded-2xl">
                <div className="!p-6 w-full">
                    <h1 className="text-2xl text-white font-medium !mb-4">Products</h1>

                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-3 !mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`!px-4 !py-2 rounded ${activeTab === tab ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-200"
                                    }`}
                            >
                                {tab === "all"
                                    ? "All Ads"
                                    : tab === "new"
                                        ? "New Ads"
                                        : tab === "pending"
                                            ? "Pending Ads"
                                            : "Rejected Ads"}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="w-full">
                        <table className="w-full flex flex-col items-center justify-between table-auto bg-transparent border-collapse">
                            <thead className="w-full">
                                <tr className="text-left border-b text-white w-full flex items-center justify-between">
                                    <th className="!px-3 !py-2">Title</th>
                                    <th className="!px-3 !py-2">User</th>
                                    <th className="!px-3 !py-2">Date</th>
                                    <th className="!px-3 !py-2">Status</th>
                                    <th className="!px-3 !py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {isLoading && (
                                    <tr>
                                        <td colSpan={5} className="!p-6 text-center text-gray-400">
                                            Loading ads...
                                        </td>
                                    </tr>
                                )}

                                {isError && (
                                    <tr>
                                        <td colSpan={5} className="!p-6 text-center text-red-400">
                                            {error?.message || "Failed to load ads."}
                                        </td>
                                    </tr>
                                )}

                                {!isLoading && !isError && filteredAds.length > 0 ? (
                                    filteredAds.map((ad) => (
                                        <tr
                                            key={ad.id}
                                            className="text-left border-b text-white w-full hover:bg-gray-800 flex items-center justify-between "
                                        >
                                            <td className="!px-3 !py-2">{ad.title}</td>
                                            <td className="!px-3 !py-2">{ad.email || ad.user?.email || "—"}</td>
                                            <td className="!px-3 !py-2">
                                                {new Date(ad.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="!px-3 !py-2 capitalize">{ad.status}</td>
                                            <td className="!px-3 !py-2">
                                                <BiSolidShow
                                                    className="cursor-pointer text-white hover:text-indigo-400"
                                                    size={20}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    !isLoading &&
                                    !isError && (
                                        <tr>
                                            <td colSpan={5} className="!p-6 text-center text-gray-400">
                                                No ads yet
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
