import DashSlug from "@/app/pages/DashSlug";
export default function Page({ params }: { params: { slug: string } }) {
    return <DashSlug slug={params.slug} />;
}