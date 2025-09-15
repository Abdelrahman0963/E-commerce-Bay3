"use client";
import React, { useState } from "react";
import { useGetNewAds } from "@/app/hooks/UseNewAds";
import { LiaEdit } from "react-icons/lia";
const Dashboard = () => {
    const { newads: ads, isLoading, isError } = useGetNewAds();
    const [activeTab, setActiveTab] = useState<"all" | "new" | "pending" | "rejected">("all");
    const tabs: Array<"all" | "new" | "pending" | "rejected"> = ["all", "new", "pending", "rejected"];
    type Ad = {
        id: string;
        title: string;
        description?: string;
        price?: number;
        category?: string;
        location?: string;
        phone?: string;
        images?: string[];
        status: "new" | "pending" | "rejected" | "accepted" | string;
        user?: {
            id?: number;
            username: string;
            email: string;
        };
        createdAt: string;
    };

    const filteredAds: Ad[] =
        activeTab === "all"
            ? Array.isArray(ads) ? ads.filter(ad => ad.user !== null) : []
            : Array.isArray(ads)
                ? ads.filter((ad) => ad.status === activeTab && ad.user !== null)
                : [];
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading ads.</div>;
    }
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
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="!px-6 !py-3">Title</th>
                                    <th scope="col" className="!px-6 !py-3">User</th>
                                    <th scope="col" className="!px-6 !py-3">Category</th>
                                    <th scope="col" className="!px-6 !py-3">Date</th>
                                    <th scope="col" className="!px-6 !py-3">Status</th>
                                    <th scope="col" className="!px-6 !py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAds.length > 0 ? filteredAds.map((ad: Ad) => (
                                    <tr key={ad.id} className="bg-[var(--dashboard-color)] odd:bg-[var(--dashboard2-color)] border-b dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="!px-6 !py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ad.title}</th>
                                        <td className="!px-6 !py-4">
                                            {ad.user ? ad.user.username : "Unknown"}
                                        </td>
                                        <td className="!px-6 !py-4">{ad.category || "N/A"}</td>
                                        <td className="!px-6 !py-4">{new Date(ad.createdAt).toLocaleDateString()}</td>
                                        <td className="!px-6 !py-4">{ad.status}</td>
                                        <td className="!px-6 !py-4">
                                            <LiaEdit className="text-2xl cursor-pointer text-[var(--dashboard3-color)]" />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr className="text-center text-white">
                                        <td colSpan={5} className="!py-4">No ads found</td>
                                    </tr>
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
