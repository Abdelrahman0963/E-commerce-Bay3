import Homecat from "@/app/pages/Homecat";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    return <Homecat category={category} />;
}
