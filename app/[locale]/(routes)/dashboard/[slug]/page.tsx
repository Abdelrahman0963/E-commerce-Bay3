import ProtectedAdmin from "@/app/components/ProtectedAdmin";
import DashSlug from "@/app/components/DashSlug";
export default function page({ params }: { params: { slug: string } }) {
    return (
        <ProtectedAdmin>
            <DashSlug slug={params.slug} />;
        </ProtectedAdmin>
    )
}