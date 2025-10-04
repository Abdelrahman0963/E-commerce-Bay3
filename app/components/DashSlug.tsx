'use client';
import React from "react";
import CarouselDashboard from "./CarouselDashboard";
import { useNewAdsBySlug, usePutNewAds } from "../hooks/UseNewAds";
import { usePostProduct } from "../hooks/UseProducts";
import { ProductSkeleton } from "./Loading";
import Notfound from "./Notfound";

export default function DashSlug({ slug }: { slug: string; }) {
    const { product, isLoading, isError } = useNewAdsBySlug(slug);
    const { mutateAsync: putAsync } = usePutNewAds();
    const { mutateAsync: postAsync } = usePostProduct();
    const statu = product?.statu;
    const [status, setStatus] = React.useState<string>(statu || "new");
    const [open, setOpen] = React.useState(false);

    const options = [
        { value: "new", label: "New", color: "bg-blue-500" },
        { value: "pending", label: "Pending", color: "bg-yellow-500", active: "Send" },
        { value: "rejected", label: "Rejected", color: "bg-red-500", active: "Delete" },
        { value: "accepted", label: "Accepted", color: "bg-green-500", active: "Push" },
    ];
    React.useEffect(() => {
        if (product?.statu) {
            setStatus(product.statu);
        }
    }, [product?.statu]);
    const handleStatusChange = async (newStatus: string) => {
        try {
            await putAsync({
                documentId: product.documentId,
                data: { statu: newStatus },
            });

            if (newStatus === "accepted") {
                await postAsync(product);
            }
            setStatus(newStatus);
            setOpen(false);
        } catch (e) {
            console.error("Error updating status:", e);
        }
    };


    if (isLoading) return <ProductSkeleton />;
    if (isError || !product) return <Notfound />;

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
                <div className="relative w-full max-w-xs !mt-4 text-black">
                    <nav className="flex items-center w-full gap-4">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-between gap-2 w-40 !p-2 rounded bg-white text-black"
                        >
                            <span
                                className={`w-3 h-3 rounded-full ${options.find((o) => o.value === status)?.color
                                    }`}
                            ></span>
                            {options.find((o) => o.value === status)?.label}
                        </button>
                    </nav>

                    {open && (
                        <div className="absolute !mt-2 w-40 bg-white shadow rounded z-10">
                            {options.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => handleStatusChange(opt.value)}
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
