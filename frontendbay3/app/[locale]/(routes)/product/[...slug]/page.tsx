import Homeslug from "@/app/pages/Homeslug";

export default async function Page({ params }: { params: { slug: string } }) {
  return <Homeslug slug={params.slug} />;
}
