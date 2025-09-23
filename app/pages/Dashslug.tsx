'use client';
import CarouselDashboard from "../components/CarouselDashboard";
import { useNewAdsBySlug } from "../hooks/UseNewAds";

export default function DashSlug({ slug }: { slug: string }) {
    const { product, isLoading, isError } = useNewAdsBySlug(slug);
    if (isLoading) return <p className="!py-26">Loading...</p>;
    if (isError || !product) return <p className="!py-26">Error or Not Found</p>;
    const { title, description, price, company, location, images } = product;
    return (
        <section className="min-h-screen w-full flex justify-between items-center bg-[var(--dashboard-color)] !py-10 !px-16">
            <CarouselDashboard images={images} />
            <div className="">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-gray-600">{description}</p>
                <p className="mt-2 font-semibold">{price}</p>
                <p>{company}</p>
                <p>{location}</p>
            </div>
        </section>
    );
}
