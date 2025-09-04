import Homecat from "@/app/pages/Homecat";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    console.log("🚀 Server Category param:", category);

    return <Homecat category={category} />;
}
