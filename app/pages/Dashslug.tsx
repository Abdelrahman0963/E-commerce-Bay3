'use client';
import React from "react";
import CarouselDashboard from "../components/CarouselDashboard";
import { useNewAdsBySlug } from "../hooks/UseNewAds";

export default function DashSlug({ slug }: { slug: string }) {
    const { product, isLoading, isError } = useNewAdsBySlug(slug);
    const statu = product?.statu;
    const [status, setStatus] = React.useState<string>(statu || "new");
    const [open, setOpen] = React.useState(false);
    const options = [
        { value: "new", label: "New", color: "bg-blue-500" },
        { value: "pending", label: "Pending", color: "bg-yellow-500" },
        { value: "rejected", label: "Rejected", color: "bg-red-500" },
        { value: "accepted", label: "Accepted", color: "bg-green-500" },
    ];
    if (isLoading) return <p className="!py-26">Loading...</p>;
    if (isError || !product) return <p className="!py-26">Error or Not Found</p>;
    const { title, description, price, company, location, images } = product;

    return (
        <section className="min-h-screen w-full flex justify-between items-center bg-[var(--dashboard-color)] !py-10 !px-8">
            <CarouselDashboard images={images} />
            <div className="w-full text-white leading-10">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
                <p className="mt-2 font-semibold">{price}</p>
                <p>{company}</p>
                <p>{location}</p>
                <div className="relative w-40">
                    <nav className="flex justify-between items-center">
                        <button onClick={() => setOpen(!open)} className="flex items-center jastify-between gap-2 w-full !p-2 rounded bg-white text-black">
                            <span className={`w-3 h-3 rounded-full ${options.find((o) => o.value === status)?.color
                                }`}></span>
                            {status}
                        </button>
                    </nav>
                    {open && (
                        <div onClick={() => setOpen(false)} className="absolute !mt-2 w-full bg-white shadow rounded">
                            {options.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => setStatus(opt.value)}
                                    className="flex items-center gap-2 !px-2 !py-1 text-black hover:bg-gray-100 cursor-pointer"
                                >
                                    <span className={`w-3 h-3 rounded-full ${opt.color}`}></span>
                                    {opt.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
