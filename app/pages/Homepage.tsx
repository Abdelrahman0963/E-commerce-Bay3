"use client";
import React from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GiCutDiamond } from "react-icons/gi";
import SkeletonLoader from "../components/Loading";
import Notfound from "../components/Notfound";

const Homepage = () => {
  const { products: data, isLoading, isError } = useProducts();
  const t = useTranslations();
  type Product = {
    id: string;
    title: string;
    description?: string;
    price?: number;
    category?: string;
    location?: string;
    phone?: string;
    images?: { url: string }[];
    slug: string;
  }
  if (isLoading) return <SkeletonLoader />
    ;
  if (isError || !data) return <Notfound />;

  return (
    <section className="container !mx-auto !py-26 md:!py-30 md:!px-6 !px-4">
      <div>
        <h1 className="text-2xl font-medium !mb-6">{t("homepage.header")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            data?.data.map((product: Product) => (
              <div
                className="border border-gray-300 !p-4 rounded-md"
                key={product.id}
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="w-full h-48 flex items-center justify-center overflow-hidden relative !mb-2">
                    <Image
                      src={
                        product.images?.[0]?.url
                          ? `http://localhost:1337${product.images?.[0]?.url}`
                          : "/fallback.png"
                      }
                      alt={product.title}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="object-contain w-full h-full"
                    />
                    <GiCutDiamond className="absolute text-3xl top-2 left-2 text-[var(--primary-color)]" />
                  </div>
                  <p className="text-[var(--primary-color)] font-semibold  !mb-2">
                    {product.price} {t("homepage.price")}
                  </p>
                  <h2>{product.title}</h2>
                  <p className="">{product.description}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
