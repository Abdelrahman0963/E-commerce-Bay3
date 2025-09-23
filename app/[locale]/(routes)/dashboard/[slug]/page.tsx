import ProtectedAdmin from "@/app/components/ProtectedAdmin";
import DashSlug from "@/app/pages/DashSlug";
export default function Page({ params }: { params: { slug: string } }) {
    return (
        <ProtectedAdmin>
            <DashSlug slug={params.slug} />;
        </ProtectedAdmin>
    )
}