"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import Link from "next/link";
import Loading from "../../Loading";
import { useTranslations } from "next-intl";
const CategoriesList = () => {
  const { data, isLoading } = useProducts();
  const t = useTranslations();
  if (isLoading) return <Loading />;

  const products = data?.data || [];

  const categories = products.map((p: any) => p.category).filter(Boolean); // نشيل null/falsy

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className="CategoriesList md:absolute top-16 left-0 w-full bg-white md:shadow-lg !p-4 rounded-lg z-50 ">
      <ul>
        <h3>{t("navbar.Cathover")}</h3>
        {uniqueCategories.map((category: any, index) => (
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
