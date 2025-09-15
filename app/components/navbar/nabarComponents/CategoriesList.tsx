"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import Link from "next/link";
import Loading from "../../Loading";
import { useTranslations } from "next-intl";
const CategoriesList = () => {
  const { products: data, isLoading } = useProducts();
  const t = useTranslations();
  if (isLoading) return <Loading />;

  type Product = {
    category: string | null;
  };

  const products: Product[] = data?.data || [];

  const categories = products.map((p) => p.category).filter(Boolean) as string[];

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className="CategoriesList lg:absolute top-16 left-0 w-auto bg-white lg:shadow-lg !p-4 rounded-lg z-50 ">
      <ul>
        <Link href="/" className="hover:text-[var(--primary-color)]">
          <h3>{t("navbar.Cathover")}</h3>
        </Link>
        {uniqueCategories.map((category, index) => (
          <li key={index} className="!py-2">
            <Link
              className="hover:text-[var(--primary-color)] capitalize"
              href={`/category/${category}`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
