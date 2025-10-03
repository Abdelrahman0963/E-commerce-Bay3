"use client";
import React from 'react'

const DashSkeleton = () => {
    return (
        <div className="animate-pulse w-full bg-[var(--dashboard2-color)] !mt-14 rounded-2xl">
            <div className="!p-6">
                <h1 className="text-2xl text-white font-medium !mb-4">Products</h1>
                <div className="flex items-center justify-center gap-3 !mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-gray-700 rounded"></div>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {["Title", "User", "Category", "Date", "Status", "Actions"].map((header, i) => (
                                    <th key={i} className="!px-6 !py-3">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="bg-[var(--dashboard-color)] odd:bg-[var(--dashboard2-color)] border-b border-gray-700">
                                    {[...Array(6)].map((_, j) => (
                                        <td key={j} className="!px-6 !py-4">
                                            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashSkeleton
