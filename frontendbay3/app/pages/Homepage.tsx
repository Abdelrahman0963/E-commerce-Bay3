"use client";
import React from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GiCutDiamond } from "react-icons/gi";
import SkeletonLoader from "../components/Loading";

const Homepage = () => {
  const { products: data, isLoading } = useProducts();

  const t = useTranslations();
  return (
    <section className="container !mx-auto !py-10 ">
      <div>
        <h1 className="text-2xl font-medium">{t("homepage.header")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            data?.data.map((product: any) => (
              <div
                className="border border-gray-300 !p-4 rounded-md"
                key={product.id}
              >
                <Link href={`/product/${product.title}`}>
                  <picture className=" w-full h-48 flex items-center justify-center  overflow-hidden relative mb-2">
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
                    />
                    <GiCutDiamond className="absolute text-3xl top-2 left-2 text-[var(--primary-color)]" />
                  </picture>
                  <p className="text-[var(--primary-color)] font-semibold  !mb-2">
                    {product.price} {t("homepage.price")}
                  </p>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
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
