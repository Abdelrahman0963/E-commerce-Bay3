"use client";
import React, { useEffect } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GiCutDiamond } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";
import SkeletonLoader from "../components/Loading";
import Notfound from "../components/Notfound";

const Homepage = () => {
  const { products: data, isLoading, isError } = useProducts();
  const [activeProductId, setActiveProductId] = React.useState<string[]>([]);
  const t = useTranslations();
  const displayDescription = (text: string = "", limit: number) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };
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
  useEffect(() => {
    const stored = localStorage.getItem("activeProductId");
    if (stored) {
      setActiveProductId(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (activeProductId && activeProductId.length > 0) {
      localStorage.setItem("activeProductId", JSON.stringify(activeProductId));
    }
  }, [activeProductId]);

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
                <div className="w-full h-48 flex items-center justify-center overflow-hidden relative !mb-2">
                  <Link href={`/product/${product.slug}`}>
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
                      className="object-cover"
                    />
                  </Link>
                  <GiCutDiamond className="absolute text-3xl top-2 left-2 text-[var(--primary-color)]" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[var(--primary-color)] font-semibold  !mb-2">
                    {product.price} {t("homepage.price")}
                  </p>
                  <nav onClick={() => setActiveProductId(activeProductId.includes(product.id) ? activeProductId.filter((id) => id !== product.id) : [...activeProductId, product.id])} aria-label="Add to cart" className={`flex items-center justify-center rounded-md  text-white cursor-pointer hover:bg-[var(--primary-color)] !p-2 !ml-3.5 ${activeProductId.includes(product.id) ? "bg-[var(--primary-color)]" : "bg-black"}`}>
                    <MdAddShoppingCart className="text-[1.2rem]" />
                  </nav>
                </div>
                <h2>{product.title}</h2>
                <p>{displayDescription(product.description, 70)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
