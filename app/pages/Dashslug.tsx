'use client';
import { useNewAdsBySlug } from "../hooks/UseNewAds";

export default function DashSlug({ slug }: { slug: string }) {
    const { product, isLoading, isError } = useNewAdsBySlug(slug);
    if (isLoading) return <p className="!py-26">Loading...</p>;
    if (isError || !product) return <p className="!py-26">Error or Not Found</p>;
    const { title, description } = product;
    return (
        <section className="container !mx-auto !py-26 md:!py-30 md:!px-6 !px-4 flex flex-col md:flex-row gap-4 items-center">
            <h1>{title}</h1>
        </section>
    );
}
