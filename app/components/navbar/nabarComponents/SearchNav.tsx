"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

type Product = {
  title: string;
  slug: string;
};

const SearchNav = () => {
  const [dirction, setDirction] = useState<"ltr" | "rtl">("ltr");
  const { products: data, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const products: Product[] = data?.data || [];

  // فلترة مباشرة على المنتجات
  const filteredProducts = products.filter(
    (p) =>
      p.title &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  const focasInput = () => searchRef.current?.focus();

  useEffect(() => {
    setDirction(document.documentElement.dir as "ltr" | "rtl");
  }, []);

  const t = useTranslations();

  return (
    <div className="SearchNav flex items-center justify-center  w-96 md:w-3xl  h-10">
      <div className="h-10 w-96 items-center  justify-between rounded-lg relative">
        <input
          ref={searchRef}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={t("navbar.searchbar")}
          className="h-full w-full bg-white rounded-lg px-2 text-black focus:outline-[var(--primary-color)]  border border-gray-300"
        />
        <div className="searchicon flex items-center justify-center h-full">
          <MdOutlineSearch
            onClick={focasInput}
            className={`text-2xl text-[var(--primary-color)] cursor-pointer absolute top-2 ${dirction === "ltr" ? "right-2" : "left-2"
              }`}
          />
        </div>
      </div>

      {search.trim() !== "" && (
        <div className="SearchList absolute top-16 left-0 w-full bg-white shadow-lg !p-4 rounded-lg z-50 transition-all duration-300">
          <ul>
            {isLoading ? (
              <li className="text-center">Loading...</li>
            ) : (
              filteredProducts.map((item, index) => (
                <li key={index} className="!py-2 hover:bg-gray-100 px-2">
                  <Link
                    className="hover:text-[var(--primary-color)] capitalize"
                    href={`/product/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchNav;
